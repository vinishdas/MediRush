'use client';

import { useState } from 'react';
import { NARRATION_CONTENT } from '@/lib/gameData';
import NarrationDialog from './NarrationDialog';

interface GameTransitionProps {
  level: number;
}

export default function GameTransition({ level }: GameTransitionProps) {
  const [narrationComplete, setNarrationComplete] = useState(false);

  const messages: Record<number, string> = {
    1: 'Shift 2: Diagnostic Delay active.',
    2: 'Shift 3: Outbreak Protocol active.',
  };

  const narrationContent = NARRATION_CONTENT.levelUp[level as keyof typeof NARRATION_CONTENT.levelUp];

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
          background: '#EDF2F8',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: 10,
              letterSpacing: '.12em',
              color: '#5080A0',
              marginBottom: 8,
            }}
          >
            SHIFT {level} COMPLETE
          </div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: '#1B3A5C',
              marginBottom: 6,
            }}
          >
            {messages[level] || ''}
          </div>
          <div style={{ fontSize: 10, color: '#7090A8' }}>Preparing next shift…</div>
        </div>
      </div>
    </>
  );
}
