import {
  blockSize,
  wallCollor,
  wallSpaceWidth,
  wallOffset,
  wallInnerColor,
  MapElements,
} from '../config';
import { drawRectangle } from '../Primitives/drawRectangle';

export const drawWalls = (ctx: CanvasRenderingContext2D, map: number[][]) => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] === MapElements.WALL) {
        drawRectangle({
          ctx,
          x: j * blockSize,
          y: i * blockSize,
          width: blockSize,
          height: blockSize,
          fillColor: wallCollor,
        });
      }
      if (j > 0 && map[i][j - 1] === MapElements.WALL) {
        drawRectangle({
          ctx,
          x: j * blockSize,
          y: i * blockSize + wallOffset,
          width: wallSpaceWidth + wallOffset,
          height: wallSpaceWidth,
          fillColor: wallInnerColor,
        });
      }
      if (j < map[0].length - 1 && map[i][j + 1] === MapElements.WALL) {
        drawRectangle({
          ctx,
          x: j * blockSize + wallOffset,
          y: i * blockSize + wallOffset,
          width: wallSpaceWidth + wallOffset,
          height: wallSpaceWidth,
          fillColor: wallInnerColor,
        });
      }
      if (i < map.length - 1 && map[i + 1][j] === MapElements.WALL) {
        drawRectangle({
          ctx,
          x: j * blockSize + wallOffset,
          y: i * blockSize + wallOffset,
          width: wallSpaceWidth,
          height: wallSpaceWidth + wallOffset,
          fillColor: wallInnerColor,
        });
      }
      if (i > 0 && map[i - 1][j] === MapElements.WALL) {
        drawRectangle({
          ctx,
          x: j * blockSize + wallOffset,
          y: i * blockSize,
          width: wallSpaceWidth,
          height: wallSpaceWidth + wallOffset,
          fillColor: wallInnerColor,
        });
      }
    }
  }
};
