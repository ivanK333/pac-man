enum Direction {
  right = 'right',
  down = 'down',
  left = 'left',
  up = 'up',
}

enum KeyCode {
  right = 'ArrowRight',
  down = 'ArrowDown',
  left = 'ArrowLeft',
  up = 'ArrowUp',
}

enum MapPropertys {
  blockSize = 20,
  wallSpaceWidth = blockSize / 1.3,
  wallOffset = (blockSize - wallSpaceWidth) / 2,
  wallCollor = '#342dca',
  wallInnerColor = '#000000',
  foodCollor = '#dea185',
}

export { Direction, KeyCode, MapPropertys };
