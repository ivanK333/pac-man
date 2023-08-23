import { Position } from '../types';

export function drawPacMan(
  ctx: CanvasRenderingContext2D,
  pos: Position,
  size: number,
) {
  ctx.beginPath();
  ctx.arc(
    pos.x + size / 2,
    pos.y + size / 2,
    size,
    0.2 * Math.PI,
    1.8 * Math.PI,
  );
  ctx.lineTo(pos.x + size / 2, pos.y + size / 2);
  ctx.closePath();
  ctx.fillStyle = 'yellow';
  ctx.fill();
}
