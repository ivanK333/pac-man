import { MapElements } from '../config';
import { drawCherry } from '../Primitives/drawCherry';
import { drawSimpleFood } from '../Primitives/drawSimpleFood';

export const drawFood = (ctx: CanvasRenderingContext2D, map: number[][]) => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] === MapElements.FOOD) {
        drawSimpleFood(ctx, i, j);
      }
      if (map[i][j] === MapElements.CHERRY) {
        drawCherry(ctx, i, j);
      }
    }
  }
};
