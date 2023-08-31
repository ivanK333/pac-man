import { blockSize, foodCollor, foodSize, MapElements } from '../config';
import { drawRectangle } from '../Primitives/drawRectangle';

export const drawFood = (ctx: CanvasRenderingContext2D, map: number[][]) => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] === MapElements.FOOD) {
        drawRectangle({
          ctx,
          x: j * blockSize + (blockSize - foodSize) / 2,
          y: i * blockSize + (blockSize - foodSize) / 2,
          width: foodSize,
          height: foodSize,
          fillColor: foodCollor,
        });
      }
    }
  }
};
