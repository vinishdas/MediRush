'use client';

import { useEffect, useState } from 'react';
import ComputerMonitor from '@/components/ComputerMonitor';
import GameScene from '@/components/GameScene';
import GameContainer from '@/components/GameContainer';
import './page.css';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [currentDialogue, setCurrentDialogue] = useState<string>('');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="page-main">
      <div className="game-environment">
        <ComputerMonitor
          dialogueCharacter="Nurse Elena"
          dialogueContent={currentDialogue}
        >
          <GameScene />
          <GameContainer onDialogueChange={setCurrentDialogue} />
        </ComputerMonitor>
      </div>
    </main>
  );
}
