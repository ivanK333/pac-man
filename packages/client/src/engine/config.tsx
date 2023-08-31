const blockSize = 30;
const wallSpaceWidth = blockSize / 1.3;
const wallOffset = (blockSize - wallSpaceWidth) / 2;
const foodSize = blockSize / 6;
const backGroundColor = '#000';
const wallCollor = '#342dca';
const wallInnerColor = '#000000';
const foodCollor = '#dea185';
enum MapElements {
  WALL = 1,
  FOOD = 2,
}

export {
  blockSize,
  backGroundColor,
  wallCollor,
  wallSpaceWidth,
  wallOffset,
  wallInnerColor,
  foodSize,
  foodCollor,
  MapElements,
};
