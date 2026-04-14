'use client';

import { GameState, NARRATION_CONTENT } from '@/lib/gameData';
import NarrationDialog from './NarrationDialog';
import { useState } from 'react';
import { audioManager } from '@/lib/audioUtils';

interface GameOverProps {
  gameState: GameState;
  onRestart: () => void;
}

export default function GameOver({ gameState, onRestart }: GameOverProps) {
  const [narrationComplete, setNarrationComplete] = useState(false);

  const bgGradient = gameState.won
    ? 'linear-gradient(155deg,#EDF9F0,#E8F8EC)'
    : 'linear-gradient(155deg,#FFF0F0,#FEE8E8)';
  const titleColor = gameState.won ? '#1A6030' : '#A02020';
  const title = gameState.won ? 'SHIFT COMPLETE' : 'CRITICAL FAILURE';
  const message = gameState.won
    ? 'All three crises stabilized. Beacon Hope stands.'
    : 'Hospital efficiency collapsed. The system is overwhelmed.';

  const narrationContent = gameState.won 
    ? (NARRATION_CONTENT.complete[gameState.level as keyof typeof NARRATION_CONTENT.complete] || NARRATION_CONTENT.complete[1])
    : (NARRATION_CONTENT.failure[gameState.level as keyof typeof NARRATION_CONTENT.failure] || NARRATION_CONTENT.failure[1]);

  return (
    <>
      {narrationContent && !narrationComplete && (
        <NarrationDialog
          isVisible={true}
          content={narrationContent}
          onComplete={() => setNarrationComplete(true)}
        />
      )}
      <div
        className="ov"
        style={{
          background: bgGradient,
        }}
      >
      <div style={{ textAlign: 'center', maxWidth: 340 }}>
        <div
          style={{
            fontSize: 26,
            fontWeight: 800,
            color: titleColor,
            marginBottom: 5,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 11,
            color: '#607080',
            marginBottom: 20,
          }}
        >
          {message}
        </div>
        <div
          style={{
            display: 'flex',
            gap: 26,
            justifyContent: 'center',
            marginBottom: 20,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: '#1B3A5C',
              }}
            >
              {gameState.score.toLocaleString()}
            </div>
            <div
              style={{
                fontSize: 8,
                color: '#7090A0',
                letterSpacing: '.1em',
                marginTop: 2,
              }}
            >
              SCORE
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: '#1B3A5C',
              }}
            >
              {gameState.diagnosisCount}
            </div>
            <div
              style={{
                fontSize: 8,
                color: '#7090A0',
                letterSpacing: '.1em',
                marginTop: 2,
              }}
            >
              ASSIGNED
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: '#1B3A5C',
              }}
            >
              L{gameState.level}
            </div>
            <div
              style={{
                fontSize: 8,
                color: '#7090A0',
                letterSpacing: '.1em',
                marginTop: 2,
              }}
            >
              REACHED
            </div>
          </div>
        </div>
        <button
          className="btn"
          onClick={() => {
            audioManager.playSFX('/audio/click.mp3'); // <-- ADD AUDIO
            onRestart();
            (window as any).startGame(1);
          }}
          style={{
            background: '#1B3A5C',
            color: '#E8F4FF',
          }}
        >
          RESTART SHIFT
        </button>
      </div>
      </div>
    </>
  );
}
