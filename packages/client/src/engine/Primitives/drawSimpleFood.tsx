import { blockSize, foodSize, foodCollor } from '../config';
import { drawRectangle } from './drawRectangle';

export const drawSimpleFood = (
  ctx: CanvasRenderingContext2D,
  i: number,
  j: number,
) =>
  drawRectangle({
    ctx,
    x: j * blockSize + (blockSize - foodSize) / 2,
    y: i * blockSize + (blockSize - foodSize) / 2,
    width: foodSize,
    height: foodSize,
    fillColor: foodCollor,
  });
