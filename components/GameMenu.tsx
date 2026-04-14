'use client';

import { DEPARTMENT_CONFIG } from '@/lib/gameData';
import { audioManager } from '@/lib/audioUtils';

interface GameMenuProps {
  onStartGame: (level: number) => void;
}

export default function GameMenu({ onStartGame }: GameMenuProps) {
  return (
    <div
      className="ov"
      style={{
        background: 'linear-gradient(155deg,#EDF5FF,#E8F8F0)',
      }}
    >
      <div style={{ maxWidth: 390, width: '100%', textAlign: 'center' }}>
        <div
          style={{
            fontSize: 9,
            letterSpacing: '.2em',
            color: '#6080A0',
            marginBottom: 6,
          }}
        >
          BEACON HOPE MEDICAL CENTER
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: '#1B3A5C',
            marginBottom: 2,
          }}
        >
          Code Blue
        </div>
        <div
          style={{
            fontSize: 11,
            color: '#5080A0',
            marginBottom: 16,
            letterSpacing: '.1em',
            fontWeight: 700,
          }}
        >
          TRIAGE COMMAND
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 6,
            marginBottom: 14,
          }}
        >
          {Object.entries(DEPARTMENT_CONFIG).map(([key, dept]) => (
            <div
              key={key}
              style={{
                background: dept.background,
                borderRadius: 9,
                padding: '8px 8px',
                border: `1.5px solid ${dept.color}35`,
                textAlign: 'center',
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: dept.icon }} />
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: dept.color,
                  marginTop: 3,
                }}
              >
                {key}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: dept.textColor,
                }}
              >
                {dept.description}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            fontSize: 12,
            color: '#7090A8',
            marginBottom: 12,
          }}
        >
          3 shifts · assign patients · keep efficiency above 0%
        </div>
        <button
          className="btn"
          onClick={() => {
            audioManager.playSFX('/audio/click.mp3'); // <-- ADD AUDIO
            onStartGame(1);
          }}
          style={{
            background: '#1B3A5C',
            fontSize:20,
            color: '#E8F4FF',
          }}
        >
          START SHIFT →
        </button>
      </div>
    </div>
  );
}
