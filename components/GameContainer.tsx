'use client';

import { useEffect } from 'react';
import { useGameEngine } from '@/lib/useGameEngine';
import { NARRATION_CONTENT } from '@/lib/gameData';
import { audioManager } from '@/lib/audioUtils';
import NarrationDialog from './NarrationDialog';
import GameMenu from './GameMenu';
import GameBoard from './GameBoard';
import GameTransition from './GameTransition';
import GameOver from './GameOver';

interface GameContainerProps {
  onDialogueChange?: (content: string) => void;
}

export default function GameContainer({ onDialogueChange }: GameContainerProps) {
  const {
    gameState,
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
  } = useGameEngine();

  // Setup game loops
  useEffect(() => {
    if (gameState.state !== 'game') return;
    if (gameState.showNarration) return; // <-- FIX: Game pauses while narration is up

    const tickSpeed = gameState.level === 1 ? 1000 : gameState.level === 2 ? 800 : 600;
    const tickInterval = setInterval(tick, tickSpeed);
    const spawnInterval = setInterval(spawn, gameState.level === 1 ? 5000 : gameState.level === 2 ? 4200 : 3200);

    return () => {
      clearInterval(tickInterval);
      clearInterval(spawnInterval);
    };
  }, [gameState.state, gameState.level, gameState.showNarration, tick, spawn]);

  // Setup diagnosis loop
  // useEffect(() => {
  //   if (gameState.diagnosingId === null) return;
  //   if (gameState.showNarration) return; // <-- FIX: Diagnosis pauses while narration is up

  //   const diagnosisInterval = setInterval(updateDiagnosis, 100);

  //   return () => clearInterval(diagnosisInterval);
  // }, [gameState.diagnosingId, gameState.showNarration, updateDiagnosis]);

  useEffect(() => {
    // Handle BGM
    if (gameState.state === 'game' && !gameState.showNarration) {
      audioManager.playBGMusic(`/audio/bg-level${gameState.level}.mp3`, 0.05); // Low volume BGM
    } else if (gameState.state !== 'game') {
      audioManager.stopBGMusic(); // Stop during transitions, menu, or game over
    }

    // Handle Victory/Failure SFX
    if (gameState.state === 'over') {
      if (gameState.won) {
        audioManager.playSFX('/audio/victory.mp3', 0.8);
      } else {
        audioManager.playSFX('/audio/fail.mp3', 0.6); 
      }
    }
  }, [gameState.state, gameState.level, gameState.showNarration, gameState.won]);

  // Expose functions to window for onclick handlers
  useEffect(() => {
    (window as any).startGame = startGame;
    (window as any).selP = selectPatient;
    (window as any).startDg = startDiagnosis;
    (window as any).assignP = assignPatient;
    (window as any).startDrag = startDragPatient;
    (window as any).setDragOver = setDraggedOverDept;
    (window as any).dropP = dropPatient;
    (window as any).endDrag = () => {
      setDraggedOverDept(null);
      startDragPatient(0); // Reset
    };

    return () => {
      delete (window as any).startGame;
      delete (window as any).selP;
      delete (window as any).startDg;
      delete (window as any).assignP;
      delete (window as any).startDrag;
      delete (window as any).setDragOver;
      delete (window as any).dropP;
      delete (window as any).endDrag;
    };
  }, [startGame, selectPatient, startDiagnosis, assignPatient, startDragPatient, setDraggedOverDept, dropPatient]);

  // Handle level progression and narration
  useEffect(() => {
    if (gameState.state === 'transition') {
      const timer = setTimeout(() => {
        startGame(gameState.level);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [gameState.state, gameState.level, startGame]);

  // Get narration content for current level
  const getNarrationForLevel = () => {
    if (gameState.showNarration) {
      if (gameState.level === 1 && gameState.state === 'game') {
        return NARRATION_CONTENT.intro;
      }
      if (gameState.state === 'transition') {
        const levelNarration = NARRATION_CONTENT.levelUp[gameState.level as keyof typeof NARRATION_CONTENT.levelUp];
        return levelNarration || null;
      }
    }
    return null;
  };

  const narrationContent = getNarrationForLevel();

  return (
    <>
      {gameState.showNarration && narrationContent && (
        <NarrationDialog
          isVisible={gameState.showNarration}
          content={narrationContent}
          onComplete={hideNarration}
        />
      )}
      <div id="ct" style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', flexDirection: 'column' }}>
        {gameState.state === 'menu' && <GameMenu onStartGame={startGame} />}
        {gameState.state === 'game' && (
          <GameBoard gameState={gameState} onAssignPatient={assignPatient} />
        )}
        {gameState.state === 'transition' && <GameTransition level={gameState.level} />}
        {gameState.state === 'over' && (
          <GameOver gameState={gameState} onRestart={resetToMenu} />
        )}
      </div>
    </>
  );
}
