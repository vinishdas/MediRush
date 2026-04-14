import { useState, useCallback, useRef } from 'react';
import {
  GameState,
  DEPARTMENT_CONFIG,
  PATIENT_DATABASE,
  TARGET_GOALS,
  Patient,
  DepartmentKey,
  NARRATION_CONTENT,
} from './gameData';
import {
  calculateDecay,
  createNewPatient,
  getEfficiencyColor,
  getSeverityColor,
  getStabilityColor,
} from './gameUtils';
import { audioManager } from './audioUtils';

const INITIAL_GAME_STATE: GameState = {
  state: 'menu',
  queue: [],
  efficiency: 100,
  score: 0,
  level: 1,
  selectedPatient: null,
  diagnosisCount: 0,
  diagnosingId: null,
  diagnosisProgress: 0,
  diagnosisClicks: 0, // <-- ADD THIS
  diagnosisTarget: 0,
  tickInterval: null,
  spawnInterval: null,
  diagnosisInterval: null,
  patientIdCounter: 0,
  won: false,
  showNarration: false,
  dragState: {
    draggingPatientId: null,
    draggedOverDept: null,
  }
};

export function useGameEngine() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);
  const gameStateRef = useRef<GameState>(gameState);

  // Keep ref in sync
  gameStateRef.current = gameState;

  const updateGameState = useCallback((updater: (state: GameState) => GameState) => {
    setGameState((prev) => {
      const newState = updater(prev);
      gameStateRef.current = newState;
      return newState;
    });
  }, []);

  const tick = useCallback(() => {
    if (gameStateRef.current.state !== 'game') return;

    updateGameState((prev) => {
      let newQueue = prev.queue.map((p) => ({
        ...p,
        stability: Math.max(0, p.stability - calculateDecay(p)),
      }));

      const dead = newQueue.filter((p) => p.stability <= 0);
      newQueue = newQueue.filter((p) => p.stability > 0);

      let efficiency = prev.efficiency;
      if (dead.length) {
        efficiency = Math.max(0, prev.efficiency - dead.length * 15);
      }

      let selectedPatient = prev.selectedPatient;
      if (selectedPatient && !newQueue.find((p) => p.id === selectedPatient)) {
        selectedPatient = null;
      }

      // Contagion spread on level 3
      if (prev.level === 3) {
        const contagiousIndices = newQueue
          .map((p, i) => (p.contagious ? i : -1))
          .filter((i) => i >= 0);
        if (contagiousIndices.length) {
          newQueue = newQueue.map((p, i) => {
            if (
              !p.contagious &&
              contagiousIndices.some((c) => Math.abs(c - i) === 1) &&
              Math.random() > 0.88
            ) {
              return { ...p, contagious: true };
            }
            return p;
          });
        }
      }

      if (efficiency <= 0) {
        return { ...prev, state: 'over', efficiency: 0, queue: newQueue, won: false };
      }

      return { ...prev, efficiency, queue: newQueue, selectedPatient };
    });
  }, [updateGameState]);

  const spawn = useCallback(() => {
    if (gameStateRef.current.state !== 'game' || gameStateRef.current.queue.length >= 7) return;

    updateGameState((prev) => {
      const newPatient = createNewPatient(prev.patientIdCounter, prev.level);
      return {
        ...prev,
        queue: [...prev.queue, newPatient],
        patientIdCounter: newPatient.id,
      };
    });
  }, [updateGameState]);

  const startGame = useCallback((level: number) => {
    updateGameState((prev) => {
      // Show narration only on first level and on transitions from previous levels
      const shouldShowNarration = level === 1 || prev.level !== level;
      
      return {
        state: 'game',
        queue: [
          createNewPatient(prev.patientIdCounter, level),
          createNewPatient(prev.patientIdCounter + 1, level),
        ],
        efficiency: 100,
        score: 0,
        level,
        selectedPatient: null,
        diagnosisCount: 0,
        diagnosingId: null,
        diagnosisProgress: 0,
        diagnosisClicks: 0, // <-- ADD THIS
        diagnosisTarget: 0,
        tickInterval: null,
        spawnInterval: null,
        diagnosisInterval: null,
        patientIdCounter: prev.patientIdCounter + 2,
        won: false,
        showNarration: shouldShowNarration,
        dragState: {
          draggingPatientId: null,
          draggedOverDept: null,
        }
      };
    });
  }, [updateGameState]);

  const selectPatient = useCallback(
    (patientId: number) => {
      updateGameState((prev) => {
        const newSelected = prev.selectedPatient === patientId ? null : patientId;
        return { ...prev, selectedPatient: newSelected };
      });
    },
    [updateGameState]
  );

const startDiagnosis = useCallback((patientId: number) => {
    updateGameState((prev) => {
      // Find the patient, if already diagnosed, do nothing
      const patient = prev.queue.find((p) => p.id === patientId);
      if (!patient || patient.diagnosed) return prev;

      let clicks = prev.diagnosisClicks;
      let target = prev.diagnosisTarget;

      // If clicking a new patient to diagnose, reset clicks and pick a random target
      if (prev.diagnosingId !== patientId) {
        clicks = 1;
        target = Math.floor(Math.random() * 10) + 5; // Random between 1 and 10
      } else {
        // Clicking the same patient, increment clicks
        clicks += 1;
      }

      // Calculate progress bar percentage
      const progress = Math.min(100, (clicks / target) * 100);

      if (clicks >= target) {
        // Diagnosis is complete!
        const updatedQueue = prev.queue.map((p) =>
          p.id === patientId ? { ...p, diagnosed: true } : p
        );

        return {
          ...prev,
          queue: updatedQueue,
          diagnosingId: null,
          diagnosisProgress: 0,
          diagnosisClicks: 0,
          diagnosisTarget: 0,
          selectedPatient:
            prev.selectedPatient === patientId ? patientId : prev.selectedPatient,
        };
      }

      // Not complete yet, update progress bar
      return {
        ...prev,
        diagnosingId: patientId,
        diagnosisClicks: clicks,
        diagnosisTarget: target,
        diagnosisProgress: progress,
      };
    });
  }, [updateGameState]);

  const updateDiagnosis = useCallback(() => {
    updateGameState((prev) => {
      if (prev.diagnosingId === null) return prev;

      const newProgress = prev.diagnosisProgress + 5;

      if (newProgress >= 100) {
        const updatedQueue = prev.queue.map((p) =>
          p.id === prev.diagnosingId ? { ...p, diagnosed: true } : p
        );

        return {
          ...prev,
          queue: updatedQueue,
          diagnosingId: null,
          diagnosisProgress: 0,
          selectedPatient:
            prev.selectedPatient === prev.diagnosingId ? prev.diagnosingId : prev.selectedPatient,
        };
      }

      return { ...prev, diagnosisProgress: newProgress };
    });
  }, [updateGameState]);

  const assignPatient = useCallback((department: DepartmentKey) => {
    const currentState = gameStateRef.current;
    const patient = currentState.queue.find((p) => p.id === currentState.selectedPatient);

    if (!patient || !patient.diagnosed) return;
    const isCorrect = patient.targetDept === department;
    if (typeof window !== 'undefined') {
      audioManager.playSFX(isCorrect ? '/audio/correct.mp3' : '/audio/wrong.mp3', 0.6);
      window.dispatchEvent(new CustomEvent('dept-feedback', {
        detail: { dept: department, isCorrect }
      }));
    }

    updateGameState((prev) => {
      const updatedQueue = prev.queue.filter((p) => p.id !== prev.selectedPatient);
      const isCorrect = patient.targetDept === department;

       
      const scoreGain = isCorrect ? 100 : 0;
      const efficiencyLoss = isCorrect ? 0 : 10;
      const diagnosisCountIncrease = isCorrect ? 1 : 0;

      const newEfficiency = Math.max(0, prev.efficiency - efficiencyLoss);
      const newScore = prev.score + scoreGain;
      const newDiagnosisCount = prev.diagnosisCount + diagnosisCountIncrease;
      const targetGoal = TARGET_GOALS[prev.level as keyof typeof TARGET_GOALS] || 10;

      let newState = prev.state;
      let newLevel = prev.level;
      let newWon = prev.won;

      if (newDiagnosisCount >= targetGoal) {
        if (prev.level < 3) {
          newState = 'transition';
          newLevel = prev.level + 1;
        } else {
          newState = 'over';
          newWon = true;
        }
      } else if (newEfficiency <= 0) {
        newState = 'over';
        newWon = false;
      }

      return {
        ...prev,
        state: newState,
        queue: updatedQueue,
        score: newScore,
        efficiency: newEfficiency,
        diagnosisCount: newDiagnosisCount,
        selectedPatient: null,
        level: newLevel,
        won: newWon,
      };
    });
  }, [updateGameState]);

  const endGame = useCallback((won: boolean) => {
    updateGameState((prev) => ({
      ...prev,
      state: 'over',
      won,
    }));
  }, [updateGameState]);

  const resetToMenu = useCallback(() => {
    setGameState(INITIAL_GAME_STATE);
    gameStateRef.current = INITIAL_GAME_STATE;
  }, []);

  const startDragPatient = useCallback((patientId: number) => {
    updateGameState((prev) => ({
      ...prev,
      dragState: {
        draggingPatientId: patientId,
        draggedOverDept: null,
      }
    }));
  }, [updateGameState]);

  const setDraggedOverDept = useCallback((deptKey: DepartmentKey | null) => {
    updateGameState((prev) => ({
      ...prev,
      dragState: {
        ...prev.dragState,
        draggedOverDept: deptKey,
      }
    }));
  }, [updateGameState]);

  const dropPatient = useCallback((department: DepartmentKey) => {
    const currentState = gameStateRef.current;
    const patientId = currentState.dragState.draggingPatientId;
    if (!patientId) return;

    const patient = currentState.queue.find((p) => p.id === patientId);
    if (!patient || !patient.diagnosed) {
      updateGameState((prev) => ({
        ...prev,
        dragState: { draggingPatientId: null, draggedOverDept: null }
      }));
      return;
    }

    const isCorrect = patient.targetDept === department;
    if (typeof window !== 'undefined') {
      audioManager.playSFX(isCorrect ? '/audio/correct.mp3' : '/audio/wrong.mp3', 0.6);
      window.dispatchEvent(new CustomEvent('dept-feedback', {
        detail: { dept: department, isCorrect }
      }));
    }

    updateGameState((prev) => {
      const updatedQueue = prev.queue.filter((p) => p.id !== patientId);
      const isCorrect = patient.targetDept === department;
      const scoreGain = isCorrect ? 100 : 0;
      const efficiencyLoss = isCorrect ? 0 : 10;
      const diagnosisCountIncrease = isCorrect ? 1 : 0;

      const newEfficiency = Math.max(0, prev.efficiency - efficiencyLoss);
      const newScore = prev.score + scoreGain;
      const newDiagnosisCount = prev.diagnosisCount + diagnosisCountIncrease;
      const targetGoal = TARGET_GOALS[prev.level as keyof typeof TARGET_GOALS] || 10;

      let newState = prev.state;
      let newLevel = prev.level;
      let newWon = prev.won;

      if (newDiagnosisCount >= targetGoal) {
        if (prev.level < 3) {
          newState = 'transition';
          newLevel = prev.level + 1;
        } else {
          newState = 'over';
          newWon = true;
        }
      } else if (newEfficiency <= 0) {
        newState = 'over';
        newWon = false;
      }

      return {
        ...prev,
        state: newState,
        queue: updatedQueue,
        score: newScore,
        efficiency: newEfficiency,
        diagnosisCount: newDiagnosisCount,
        selectedPatient: null,
        level: newLevel,
        won: newWon,
        dragState: { draggingPatientId: null, draggedOverDept: null }
      };
    });
  }, [updateGameState]);

  const hideNarration = useCallback(() => {
    updateGameState((prev) => ({
      ...prev,
      showNarration: false,
    }));
  }, [updateGameState]);

  const showNarrationDialog = useCallback(() => {
    updateGameState((prev) => ({
      ...prev,
      showNarration: true,
    }));
  }, [updateGameState]);

  return {
    gameState,
    updateGameState,
    tick,
    spawn,
    startGame,
    selectPatient,
    startDiagnosis,
    assignPatient,
    endGame,
    resetToMenu,
    startDragPatient,
    setDraggedOverDept,
    dropPatient,
    hideNarration,
    showNarrationDialog,
  };
}
