const angles = (direction: string, mouthOpen: boolean) => {
  const baseStartAngle = mouthOpen ? 0.2 : 0.001;
  const baseEndAngle = mouthOpen ? 1.9 : 1.999;
  let shift = 0;
  switch (direction) {
    case 'down':
      shift = 0.5;
      break;
    case 'left':
      shift = 1;
      break;
    case 'top':
      shift = 1.5;
      break;
    default:
      shift = 0;
      break;
  }
  return [baseStartAngle + shift, baseEndAngle + shift];
};

const drawClearCircle = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
) => {
  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
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

export type PackmanProps = {
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
export const drawPacMan2 = (props: PackmanProps): void => {
  const { ctx, time, x, y, radius, speed, direction } = props;

  /** делаю черный круг, который прячет изменения пакмана, на пиксель меньше, что бы не стирать стены */
  const patchR = radius - 1;
  /** а пкамана еще меньше, что бы следов не оставалось */
  const pacmanR = radius - 3;
  const centerX = x + radius;
  const centerY = y + radius;

  if (!time) return;

  const mouthOpen = Math.floor((time / 250) * speed) % 2 === 0;
  const [startAngle, endAngle] = angles(direction, mouthOpen);

  drawClearCircle(ctx, centerX, centerY, patchR);

  drawPacmanItself(ctx, centerX, centerY, pacmanR, startAngle, endAngle);
};
