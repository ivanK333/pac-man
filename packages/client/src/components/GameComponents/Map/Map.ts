// Draw walls and passages using the matrix
import { MapMatrix } from '../types';
import { drawWalls } from '../Walls/Walls';

export const drawMap = (
  ctx: CanvasRenderingContext2D,
  matrix: MapMatrix,
  cellSize: number,
) => {
  drawWalls(ctx, matrix, cellSize, 'blue', 2);
  // draw pellets and cherries here
};
