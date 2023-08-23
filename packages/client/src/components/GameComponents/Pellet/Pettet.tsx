import { Position } from '../types';

export function drawPellet(
  ctx: CanvasRenderingContext2D,
  pos: Position,
  size: number,
) {
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(pos.x, pos.y, size, 0, 2 * Math.PI);
  ctx.fill();
}
