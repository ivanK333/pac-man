import { Position } from '../types';

export function drawPacMan(
  ctx: CanvasRenderingContext2D,
  pos: Position,
  sizeUnscaled: number,
) {
  const { x, y } = pos;
  const scale = 0.6;
  const size = sizeUnscaled * scale;
  const x0 = x + sizeUnscaled / 2;
  const y0 = y - sizeUnscaled;

  ctx.beginPath();
  ctx.arc(x0, y0, size, 0.2 * Math.PI, 1.8 * Math.PI);
  ctx.lineTo(x0, y0);
  ctx.closePath();
  ctx.fillStyle = 'yellow';
  ctx.fill();
}
