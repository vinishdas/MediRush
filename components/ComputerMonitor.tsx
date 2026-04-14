'use client';

import React, { ReactNode } from 'react';
import '../styles/computer-monitor.css';

interface ComputerMonitorProps {
  children: ReactNode;
  dialogueContent?: string;
  dialogueCharacter?: string;
}

/**
 * SVG-based computer monitor component that serves as a container for game content
 * Provides a realistic monitor display with embedded game overlay and dialogue docker
 * @component
 */
export default function ComputerMonitor({
  children,
  dialogueContent,
  dialogueCharacter = 'Nurse Elena',
}: ComputerMonitorProps) {
  return (
    <div className="computer-monitor-wrapper"   >
      {/* SVG Monitor Frame */}
      <svg
        className="monitor-svg"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Bezel/Frame */}
        <defs>
          <linearGradient id="bezelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#404040" />
            <stop offset="50%" stopColor="#2A2A2A" />
            <stop offset="100%" stopColor="#1A1A1A" />
          </linearGradient>
          <filter id="bezelShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* Outer Monitor Frame */}
        <rect
          x="50"
          y="20"
          width="1100"
          height="700"
          rx="20"
          fill="url(#bezelGradient)"
          filter="url(#bezelShadow)"
          stroke="#505050"
          strokeWidth="2"
        />

        {/* Monitor Screen (inner border) */}
        <rect
          x="70"
          y="40"
          width="1060"
          height="660"
          rx="15"
          fill="#3A7A6A"
          stroke="#404040"
          strokeWidth="1"
        />

        {/* Screen gloss/highlight */}
        <ellipse
          cx="600"
          cy="150"
          rx="400"
          ry="200"
          fill="white"
          opacity="0.08"
        />

        {/* Stand */}
        <rect
          x="480"
          y="700"
          width="240"
          height="80"
          rx="8"
          fill="url(#bezelGradient)"
          stroke="#404040"
          strokeWidth="1"
        />

        {/* Stand base */}
        <ellipse
          cx="600"
          cy="780"
          rx="180"
          ry="30"
          fill="#1A1A1A"
          stroke="#404040"
          strokeWidth="1"
        />

        {/* Power light indicator */}
        <circle
          cx="1070"
          cy="690"
          r="8"
          fill="#4CAF50"
          opacity="0.8"
        />
        <circle
          cx="1070"
          cy="690"
          r="8"
          fill="#4CAF50"
          opacity="0.3"
          r="12"
          className="power-glow"
        />
      </svg>

      {/* Game Content Overlay */}
      <div className="monitor-content">
        <div className="game-viewport">
          {children}
        </div>

        {/* Dialogue Docker at Bottom */}
        {dialogueContent && (
          <div className="dialogue-docker">
            <div className="dialogue-character-badge">
              <span className="badge-icon">👩‍⚕️</span>
              <span className="badge-name">{dialogueCharacter}</span>
            </div>
            <div className="dialogue-message">
              {dialogueContent}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
