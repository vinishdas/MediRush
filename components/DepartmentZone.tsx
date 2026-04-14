'use client';

import { useEffect, useState } from 'react';
import { DepartmentKey } from '@/lib/gameData';

interface DepartmentConfig {
  label: string;
  description: string;
  color: string;
  background: string;
  textColor: string;
  icon: string;
}

interface DepartmentZoneProps {
  departmentKey: DepartmentKey;
  department: DepartmentConfig;
  isActive: boolean;
  isTarget: boolean;
  onAssign: () => void;
}

// Helper type for the floating score animation
interface FeedbackAnimation {
  id: number;
  text: string;
  isCorrect: boolean;
}

export default function DepartmentZone({
  departmentKey,
  department,
  isActive,
  isTarget,
  onAssign,
}: DepartmentZoneProps) {
  const [feedbacks, setFeedbacks] = useState<FeedbackAnimation[]>([]);
  const isDraggedOver = (window as any).__draggedOverDept === departmentKey;

  // Listen for the custom feedback event from the game engine
 
  useEffect(() => {
    const handleFeedback = (e: any) => {
      if (e.detail.dept === departmentKey) {
        // FIX: Add Math.random() to guarantee a unique React key
        const id = Date.now() + Math.random(); 
        const isCorrect = e.detail.isCorrect;
        
        setFeedbacks((prev) => [...prev, {
          id,
          text: isCorrect ? '+100' : '-10%',
          isCorrect
        }]);

        // Remove the floating text after the animation finishes (1 second)
        setTimeout(() => {
          setFeedbacks((prev) => prev.filter((f) => f.id !== id));
        }, 1000);
      }
    };

    window.addEventListener('dept-feedback', handleFeedback);
    return () => window.removeEventListener('dept-feedback', handleFeedback);
  }, [departmentKey]);

  // Styling logic
  const backgroundColor = isDraggedOver ? department.color + '15' : isActive ? department.background : '#F2F7FA';
  // (Using the fix applied previously to hide the correct answer)
  const borderColor = isDraggedOver ? department.color : isActive ? department.color : '#D0DDE6';
  const borderWidth = isDraggedOver ? '2px' : '1.5px';
  const borderStyle = isDraggedOver ? 'dashed' : 'solid';
  const buttonColor = isActive ? department.color : '#90A0B0';

  return (
    <div
      className={`dz${isActive ? ' on' : ''} ${isDraggedOver ? 'drag-over' : ''}`}
      data-dept={departmentKey}
      onClick={isActive ? onAssign : undefined}
      onDragOver={(e) => {
        e.preventDefault();
        (window as any).__draggedOverDept = departmentKey;
        (window as any).setDragOver(departmentKey);
      }}
      onDragLeave={() => {
        (window as any).__draggedOverDept = null;
        (window as any).setDragOver(null);
      }}
      onDrop={(e) => {
        e.preventDefault();
        (window as any).__draggedOverDept = null;
        (window as any).setDragOver(null);
        (window as any).dropP(departmentKey);
      }}
      style={{
        background: backgroundColor,
        borderColor: borderColor,
        borderWidth: borderWidth,
        borderStyle: borderStyle,
        position: 'relative', // Ensures floating points stay inside the box
      }}
    >
      {/* Injecting CSS Keyframes for the floating animation directly here */}
      <style>{`
        @keyframes floatUpFade {
          0% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-30px) scale(1.3); }
        }
      `}</style>

      {/* Render Floating Score Feedbacks */}
      {feedbacks.map((f) => (
        <div
          key={f.id}
          style={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translateX(-50%)',
            color: f.isCorrect ? '#22c55e' : '#ef4444', // Green for correct, Red for wrong
            fontWeight: '900',
            fontSize: '18px',
            pointerEvents: 'none', // Prevents clicks from being intercepted
            animation: 'floatUpFade 1s forwards ease-out',
            textShadow: '0px 2px 4px rgba(0,0,0,0.2)',
            zIndex: 100,
          }}
        >
          {f.text}
        </div>
      ))}

      {/* Normal Zone Content */}
      <div dangerouslySetInnerHTML={{ __html: department.icon }} />
      <div
        style={{
          fontSize: 20,
          fontWeight: 800,
          color: buttonColor,
          letterSpacing: '.06em',
        }}
      >
        {departmentKey}
      </div>
      <div style={{ fontSize: 20, fontWeight: 800, color: '#2A3A4A' }}>
        {department.label}
      </div>
      <div style={{ fontSize: 15, color: '#6888A0' }}>{department.description}</div>
      {isActive && (
        <div
          style={{
            marginTop: 3,
            fontSize: 7.5,
            color: department.textColor,
            background: department.background,
            border: `1px solid ${department.color}35`,
            padding: '2px 5px',
            borderRadius: 3,
          }}
        >
          ASSIGN HERE
        </div>
      )}
    </div>
  );
}