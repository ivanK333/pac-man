import { blockSize, foodSize, foodCollor, cherrySize } from '../config';
import { drawRectangle } from './drawRectangle';

export const drawCherry = (
  ctx: CanvasRenderingContext2D,
  i: number,
  j: number,
) => {
  const x = j * blockSize + blockSize / 2;
  const y = i * blockSize + blockSize / 2;
  // Cherry body
  ctx.beginPath();
  ctx.arc(x, y + cherrySize / 3, cherrySize / 2, 0, Math.PI * 2); // Outer circle
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.closePath();

  // Stem
  ctx.beginPath();
  ctx.moveTo(x, y - cherrySize / 2 + cherrySize / 3);
  ctx.lineTo(x + cherrySize / 6, y - cherrySize / 2);
  ctx.strokeStyle = 'green';
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.closePath();
};
