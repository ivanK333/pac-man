export const soundPaths = {
  eatGhost: '../../src/assets/sounds/pacman_eatghost.wav',
  beginning: '../../src/assets/sounds/pacman_beginning.wav',
  chomp: '../../src/assets/sounds/pacman_chomp.wav',
  death: '../../src/assets/sounds/pacman_death.wav',
  eatFruit: '../../src/assets/sounds/pacman_eatfruit.wav',
  extraPacman: '../../src/assets/sounds/pacman_extrapac.wav',
  intermission: '../../src/assets/sounds/pacman_intermission.wav',
};

export enum Sounds {
  eatGhost = 'pacman_eatghost.wav',
  beginning = 'pacman_beginning.wav',
  chomp = 'pacman_chomp.wav',
  death = 'pacman_death.wav',
  eatFruit = 'pacman_eatfruit.wav',
  extraPacman = 'pacman_extrapac.wav',
  intermission = 'pacman_intermission.wav',
}

// Load the sound effect
export const loadSoundEffect = async (
  audioContext: AudioContext,
  url: string,
): Promise<AudioBuffer> => {
  console.log('loading...');
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  return await audioContext.decodeAudioData(buffer);
};

// Play the sound effect when Pac-Man eats a pellet
export const playSound = (
  audioContext: AudioContext,
  soundBuffer: AudioBuffer | null,
) => {
  console.log('playing...');
  if (!soundBuffer) {
    return;
  }

  const source = audioContext.createBufferSource();
  source.buffer = soundBuffer;
  source.connect(audioContext.destination);
  source.start();
};

// loadSoundEffect(audioContext, soundPaths.beginning)
//   .then((buffer) => {
//     console.log('----');
//     playSound(audioContext, buffer);
//   })
//   .catch((error) => {
//     console.error('Error loading sound effect:', error);
//   });
