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

enum MapElements {
  NONE = 0,
  WALL = 1,
  FOOD = 2,
  CHERRY = 3,
  SPAWN = 5,
}

export {
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
  MapElements,
};
