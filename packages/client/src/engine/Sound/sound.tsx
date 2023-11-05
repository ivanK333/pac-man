export enum SoundEffects {
  EatGhost = 'eatGhost',
  Beginning = 'beginning',
  Chomp = 'chomp',
  Death = 'death',
  EatFruit = 'eatFruit',
  ExtraPacman = 'extraPacman',
  Intermission = 'intermission',
}

export class Sounds {
  private audioContext: AudioContext;
  private gainNode: GainNode;
  private loadedSounds: { [key: string]: AudioBuffer } = {};

  private static soundPaths = {
    [SoundEffects.EatGhost]: '../../src/assets/sounds/pacman_eatghost.wav',
    [SoundEffects.Beginning]: '../../src/assets/sounds/pacman_beginning.wav',
    [SoundEffects.Chomp]: '../../src/assets/sounds/pacman_chomp.wav',
    [SoundEffects.Death]: '../../src/assets/sounds/pacman_death.wav',
    [SoundEffects.EatFruit]: '../../src/assets/sounds/pacman_eatfruit.wav',
    [SoundEffects.ExtraPacman]: '../../src/assets/sounds/pacman_extrapac.wav',
    [SoundEffects.Intermission]:
      '../../src/assets/sounds/pacman_intermission.wav',
  };
  constructor(audioContext: AudioContext) {
    this.audioContext = audioContext;
    this.gainNode = this.audioContext.createGain();
  }

  get volume() {
    return this.gainNode.gain.value;
  }

  async loadSounds() {
    for (const [key, path] of Object.entries(Sounds.soundPaths)) {
      try {
        const buffer = await loadSoundEffect(this.audioContext, path);
        this.loadedSounds[key] = buffer;
      } catch (error) {
        console.error(`Error loading sound ${key}:`, error);
      }
    }
    return this.loadedSounds;
  }

  setVolume(vol: number) {
    this.gainNode.gain.value = vol;
  }

  playSound(soundName: string) {
    const buffer = this.loadedSounds[soundName];
    if (!buffer) return;
    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(this.gainNode);
    this.gainNode.connect(this.audioContext.destination);
    // source.connect(this.audioContext.destination);
    source.start();
  }
}

export const loadSoundEffect = async (
  audioContext: AudioContext,
  url: string,
): Promise<AudioBuffer> => {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  return await audioContext.decodeAudioData(buffer);
};
