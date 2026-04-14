'use client';

import { useEffect, useState } from 'react';
import '../app/narration.css';
import { audioManager } from '@/lib/audioUtils';

interface NarrationDialogProps {
  isVisible: boolean;
  onComplete: () => void;
  content: {
    character: string;
    messages: string[];
  };
}

export default function NarrationDialog({ isVisible, onComplete, content }: NarrationDialogProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTextComplete, setIsTextComplete] = useState(false);

  const currentMessage = content.messages[currentMessageIndex];
  const messageCount = content.messages.length;

  // Typewriter effect
  useEffect(() => {
    if (!isVisible || !isAnimating) {
      setDisplayedText('');
      setIsTextComplete(false);
      return;
    }

    setDisplayedText('');
    setIsTextComplete(false);
    let charIndex = 0;

    const typewriterInterval = setInterval(() => {
      if (charIndex < currentMessage.length) {
        setDisplayedText(currentMessage.slice(0, charIndex + 1));
        charIndex++;
      } else {
        setIsTextComplete(true);
        clearInterval(typewriterInterval);
      }
    }, 50); // 50ms per character

    return () => clearInterval(typewriterInterval);
  }, [currentMessage, isVisible, isAnimating]);

  // Initialize animation
  useEffect(() => {
    if (!isVisible) {
      setCurrentMessageIndex(0);
      setIsAnimating(false);
      return;
    }

    setIsAnimating(true);
  }, [isVisible]);

  const handleNextMessage = () => {
    audioManager.playSFX('/audio/click.mp3');
    if (!isTextComplete) {
      // Skip typewriter effect and show full text
      setDisplayedText(currentMessage);
      setIsTextComplete(true);
      return;
    }

    if (currentMessageIndex < messageCount - 1) {
      setCurrentMessageIndex((prev) => prev + 1);
    } else {
      setIsAnimating(false);
      setTimeout(() => {
        onComplete();
      }, 500);
    }
  };

  if (!isVisible || !isAnimating) return null;

  return (
    <div className="narration-overlay">
      <div className="narration-character">
        <svg viewBox="0 0 100 140" width="80" height="112">
          {/* Head */}
          <circle cx="50" cy="30" r="16" fill="#D4A574" />
          {/* Hair */}
          <path d="M34 25 Q50 12 66 25" fill="#3D2817" />
          {/* Face */}
          <circle cx="45" cy="30" r="2" fill="#333" />
          <circle cx="55" cy="30" r="2" fill="#333" />
          <path d="M48 35 Q50 37 52 35" fill="none" stroke="#333" strokeWidth="0.5" strokeLinecap="round" />
          {/* Body */}
          <rect x="38" y="48" width="24" height="30" rx="2" fill="#4A90E2" />
          {/* Arms */}
          <rect x="20" y="52" width="18" height="6" rx="3" fill="#D4A574" />
          <rect x="62" y="52" width="18" height="6" rx="3" fill="#D4A574" />
          {/* Legs */}
          <rect x="42" y="80" width="6" height="20" fill="#2C2C2C" />
          <rect x="52" y="80" width="6" height="20" fill="#2C2C2C" />
          {/* Shoes */}
          <ellipse cx="45" cy="102" rx="4" ry="3" fill="#1A1A1A" />
          <ellipse cx="55" cy="102" rx="4" ry="3" fill="#1A1A1A" />
          {/* Cap */}
          <path d="M34 18 L66 18 Q68 16 50 14 Q32 16 34 18 Z" fill="#E85D75" />
          <rect x="32" y="18" width="36" height="4" fill="#E85D75" />
        </svg>
      </div>

      <div className="narration-dialog">
        <div className="dialog-header">{content.character}</div>
        <div className="dialog-content">
          <p className="dialog-text">
            {displayedText}
            {!isTextComplete && <span className="typewriter-cursor">▌</span>}
          </p>
        </div>
        <div className="dialog-footer">
          <button 
            className="dialog-button" 
            onClick={handleNextMessage}
            style={{ opacity: isTextComplete ? 1 : 0.6 }}
          >
            {!isTextComplete ? 'Skip' : currentMessageIndex < messageCount - 1 ? 'Next' : 'Start Game'}
          </button>
          <span className="dialog-counter">
            {currentMessageIndex + 1} / {messageCount}
          </span>
        </div>
      </div>
    </div>
  );
}
