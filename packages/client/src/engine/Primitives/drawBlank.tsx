import { blockSize, backGroundColor } from '../config';
import { drawRectangle } from './drawRectangle';

export const drawBlank = (
  ctx: CanvasRenderingContext2D,
  i: number,
  j: number,
) =>
  drawRectangle({
    ctx,
    x: j * blockSize,
    y: i * blockSize,
    width: blockSize,
    height: blockSize,
    fillColor: backGroundColor,
  });
