import { backGroundColor } from '../config';
import { drawRectangle } from './drawRectangle';

export const drawBackground = (ctx: CanvasRenderingContext2D) => {
  drawRectangle({
    ctx,
    x: 0,
    y: 0,
    width: ctx.canvas.width,
    height: ctx.canvas.height,
    fillColor: backGroundColor,
  });
};
