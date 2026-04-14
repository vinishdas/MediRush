class AudioManager {
  private bgMusic: HTMLAudioElement | null = null;

  playSFX(src: string, volume: number = 0.5) {
    if (typeof window !== 'undefined') {
      const audio = new Audio(src);
      audio.volume = volume;
      audio.play().catch(e => console.warn('SFX play failed (usually due to no user interaction yet):', e));
    }
  }

  playBGMusic(src: string, volume: number = 0.1) {
    if (typeof window === 'undefined') return;
    
    // If the same track is already playing, do nothing
    if (this.bgMusic && this.bgMusic.src.endsWith(src) && !this.bgMusic.paused) {
      return; 
    }

    this.stopBGMusic();
    
    this.bgMusic = new Audio(src);
    this.bgMusic.loop = true;
    this.bgMusic.volume = volume; // Keeping volume very low as requested
    this.bgMusic.play().catch(e => console.warn('BGM play failed:', e));
  }

  stopBGMusic() {
    if (this.bgMusic) {
      this.bgMusic.pause();
      this.bgMusic.currentTime = 0;
      this.bgMusic = null;
    }
  }
}

export const audioManager = new AudioManager();