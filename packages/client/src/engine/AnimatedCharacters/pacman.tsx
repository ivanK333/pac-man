import { drawCircle } from '../Primitives/drawCircle';
import { backGroundColor } from '../config';

const angles = (direction: string, mouthOpen: boolean) => {
  const wide = (10 * Math.PI) / 180;
  const angle = mouthOpen ? wide : 0.001;

  let orientation = 0;

  switch (direction) {
    case 'down':
      orientation = 1.5 * Math.PI - 0.2;
      break;
    case 'left':
      orientation = 1 * Math.PI - 0.1;
      break;
    case 'up':
      orientation = 0.5 * Math.PI - 0.1;
      break;
    default:
      orientation = 0;
      break;
  }

  return [orientation + angle, orientation - angle];
};

const drawPatch = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
) => {
  ctx.globalCompositeOperation = 'destination-out';
  drawCircle({
    ctx,
    x,
    y,
    radius,
    fillColor: backGroundColor,
  });
  ctx.globalCompositeOperation = 'source-over';
};

const drawPacmanItself = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number,
) => {
  ctx.beginPath();

  ctx.arc(x, y, radius, startAngle * Math.PI, endAngle * Math.PI);
  ctx.lineTo(x, y);
  ctx.closePath();

  ctx.fillStyle = 'yellow';
  ctx.fill();
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  ctx.stroke();
};

export type PacmanProps = {
  ctx: CanvasRenderingContext2D;
  time: number | null;
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
  speed: number;
  direction: string;
};

export const drawPacman = (props: PacmanProps): void => {
  const { ctx, time, x, y, radius, speed, direction } = props;

  /** делаю черный круг, который прячет изменения пакмана, на пиксель меньше, что бы не стирать стены */
  const patchR = radius - 1;
  /** а пакамана еще меньше, что бы следов не оставалось */
  const pacmanR = radius - 3;
  const centerX = x + radius;
  const centerY = y + radius;

  if (!time) return;

  const mouthOpen = Math.floor((time / 250) * speed) % 2 === 0;

  const [startAngle, endAngle] = angles(direction, mouthOpen);

  drawPatch(ctx, centerX, centerY, patchR);

  drawPacmanItself(ctx, centerX, centerY, pacmanR, startAngle, endAngle);
};
