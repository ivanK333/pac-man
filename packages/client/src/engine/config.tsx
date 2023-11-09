import { map as layer } from './Map/levels/level_001';

const blockSize = 30;
const wallSpaceWidth = blockSize / 1.3;
const wallOffset = (blockSize - wallSpaceWidth) / 2;
const foodSize = blockSize / 6;
const speed = blockSize / 15; // пока константа, но можно и менять в зависимости от уровня
const backGroundColor = '#000';
const wallCollor = '#342dca';
const wallInnerColor = '#000000';
const foodCollor = '#dea185';
const cherrySize = blockSize / 2;
const dimentions = [layer[0].length, layer.length];

enum Direction {
  Right = 'right',
  Left = 'left',
  Up = 'up',
  Down = 'down',
  Stop = 'stop',
}

enum KeyCode {
  Right = 'ArrowRight',
  Down = 'ArrowDown',
  Left = 'ArrowLeft',
  Up = 'ArrowUp',
  Space = 'Space',
}

enum MapElements {
  NONE = 0,
  WALL = 1,
  FOOD = 2,
  CHERRY = 3,
  SPAWN = 5,
}

const PositionsOnTheMap = {
  StartPositions: {
    Pacman: [13, 11],
    Blinky: [8, 10],
    Inky: [8, 12],
    Pinky: [8, 11],
    Clyde: [8, 12],
  },
  TargetPositions: {
    Blinky: [0, 19],
    Inky: [0, 1],
    Pinky: [22, 1],
    Clyde: [22, 19],
  },
};

enum Modes {
  home = 'home',
  scatter = 'scatter',
  chase = 'chase',
  frightened = 'frightened',
  respawn = 'respawn',
}

enum GhostNames {
  blinky = 'blinky',
  pinky = 'pinky',
  inky = 'inky',
  clyde = 'clyde',
}

/** расположение изображений спрайтов на PNG */
const ghostAvatars: Record<GhostNames, [number, number, number, number]> = {
  blinky: [457, 64, 128, 16],
  pinky: [457, 80, 128, 16],
  inky: [457, 96, 128, 16],
  clyde: [457, 112, 128, 16],
};

const alternativeGhostAvatars: Record<
  string,
  [number, number, number, number]
> = {
  frightened: [600, 64, 128, 16],
  eyes: [600, 81, 128, 16],
};

/** сдвиг для каждого отдельного аватара для имитации болтания ногами */
const ghostAnimationPositions: Record<string, [number, number]> = {
  right: [0, 16],
  left: [32, 48],
  up: [64, 80],
  down: [96, 112],
};

const alternativeghostAnimationPositions: Record<string, [number, number]> = {
  right: [0, 16],
  left: [0, 16],
  up: [0, 16],
  down: [0, 16],
};

const packmanDead: number[] = [456, 0, 256, 16];

const modeTiming: Record<string, number[]> = {
  chase: [8, 35, 60, 85],
  scatter: [28, 55, 83],
};

export {
  dimentions,
  blockSize,
  wallSpaceWidth,
  wallOffset,
  foodSize,
  speed,
  backGroundColor,
  wallCollor,
  wallInnerColor,
  foodCollor,
  cherrySize,
  Direction,
  KeyCode,
  MapElements,
  PositionsOnTheMap,
  Modes,
  GhostNames,
  ghostAvatars,
  alternativeGhostAvatars,
  ghostAnimationPositions,
  alternativeghostAnimationPositions,
  packmanDead,
  modeTiming,
};
