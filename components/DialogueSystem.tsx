'use client';

import React, { useState, useEffect, useCallback } from 'react';
import '../styles/dialogue-system.css';

export interface DialogueMessage {
  character: string;
  icon?: string;
  content: string;
  duration?: number; // Auto-dismiss duration in ms, or null for manual
}

interface DialogueSystemProps {
  messages: DialogueMessage[];
  onComplete?: () => void;
  autoAdvance?: boolean;
}

/**
 * Modular dialogue system component
 * Manages character dialogue display with typewriter effects and animations
 * Can be used independently or integrated with game components
 */
export default function DialogueSystem({
  messages,
  onComplete,
  autoAdvance = true,
}: DialogueSystemProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTextComplete, setIsTextComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(messages.length > 0);

  const currentMessage = messages[currentIndex];

  // Typewriter effect
  useEffect(() => {
    if (!currentMessage) return;

    setDisplayedText('');
    setIsTextComplete(false);
    let charIndex = 0;

    const typewriterInterval = setInterval(() => {
      if (charIndex < currentMessage.content.length) {
        setDisplayedText(currentMessage.content.slice(0, charIndex + 1));
        charIndex++;
      } else {
        setIsTextComplete(true);
        clearInterval(typewriterInterval);
      }
    }, 40); // 40ms per character

    return () => clearInterval(typewriterInterval);
  }, [currentMessage]);

  // Auto-advance or auto-dismiss
  useEffect(() => {
    if (!isTextComplete || !currentMessage) return;

    const duration = currentMessage.duration || 3000;
    if (duration === null) return; // Manual control

    const timer = setTimeout(() => {
      handleNext();
    }, duration);

    return () => clearTimeout(timer);
  }, [isTextComplete, currentMessage]);

  const handleNext = useCallback(() => {
    if (!isTextComplete) {
      // Skip typewriter and show full text
      setDisplayedText(currentMessage.content);
      setIsTextComplete(true);
      return;
    }

    if (currentIndex < messages.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsVisible(false);
      onComplete?.();
    }
  }, [currentIndex, isTextComplete, messages.length, currentMessage, onComplete]);

  if (!isVisible || !currentMessage) return null;

  return (
    <div className="dialogue-system" onClick={handleNext}>
      <div className="dialogue-container">
        <div className="dialogue-character">
          <span className="character-icon">
            {currentMessage.icon || '👤'}
          </span>
          <span className="character-name">{currentMessage.character}</span>
        </div>

        <div className="dialogue-content">
          <p className="dialogue-text">
            {displayedText}
            {!isTextComplete && <span className="typing-cursor">▌</span>}
          </p>
        </div>

        <div className="dialogue-controls">
          <button
            className="dialogue-continue"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label={isTextComplete ? 'Continue' : 'Skip'}
          >
            {isTextComplete ? '▶ Continue' : '⏭ Skip'}
          </button>

          <span className="dialogue-progress">
            {currentIndex + 1} / {messages.length}
          </span>
        </div>
      </div>
    </div>
  );
}

export type { DialogueSystemProps };
