type Position = {
  x: number;
  y: number;
};

const drawClearCircle = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
) => {
  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.arc(x, y, radius + 2, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
  ctx.globalCompositeOperation = 'source-over';
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
  const centerX = x + radius;
  const centerY = y + radius;

  if (!time) return;

  drawClearCircle(ctx, centerX, centerY, radius);

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
  const mouthOpen = Math.floor((time / 250) * speed) % 2 === 0;
  const [startAngle, endAngle] = angles(direction, mouthOpen);

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, startAngle * Math.PI, endAngle * Math.PI);
  ctx.lineTo(centerX, centerY);
  ctx.closePath();

  ctx.fillStyle = 'yellow';
  ctx.fill();

  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  ctx.stroke();
};

// drawPacMan2({ ctx, time, ...pacman });

// const [pacman, setPacman] = useState<Omit<PackmanProps, 'ctx' | 'time'>>({
//   x: 1.5 * blockSize,
//   y: 1.5 * blockSize,
//   radius: blockSize / 2,
//   width: blockSize / 2,
//   height: blockSize / 2,
//   speed: 2,
// });

// export class PacManAnimator {
//   private ctx: CanvasRenderingContext2D;
//   private mouthIsOpen = false;
//   private position: Position;
//   private radius = 50;
//   private centerX: number;
//   private centerY: number;

//   constructor(
//     ctx: CanvasRenderingContext2D,
//     position: Position,
//     mouthIsOpen: boolean,
//   ) {
//     this.ctx = ctx;
//     this.position = position;
//     this.mouthIsOpen = mouthIsOpen;
//     this.centerX = position.x;
//     this.centerY = position.y;
//   }

//   private drawClearCircle() {
//     this.ctx.globalCompositeOperation = 'destination-out'; // Use 'destination-out' mode for clearing
//     this.ctx.beginPath();
//     this.ctx.arc(this.centerX, this.centerY, this.radius + 2, 0, Math.PI * 2);
//     this.ctx.closePath();
//     this.ctx.fill();
//     this.ctx.globalCompositeOperation = 'source-over'; //
//   }

//   private drawPacMan(mouthOpen: boolean): void {
//     console.log('drawing', mouthOpen);
//     this.drawClearCircle();

//     const startAngle = mouthOpen ? 0.2 : 0.001;
//     const endAngle = mouthOpen ? 1.9 : 1.999;

//     this.ctx.beginPath();
//     this.ctx.arc(
//       this.centerX,
//       this.centerY,
//       this.radius,
//       startAngle * Math.PI,
//       endAngle * Math.PI,
//     );
//     this.ctx.lineTo(this.centerX, this.centerY);
//     this.ctx.closePath();

//     this.ctx.fillStyle = 'yellow';
//     this.ctx.fill();

//     this.ctx.strokeStyle = 'black';
//     this.ctx.lineWidth = 2;
//     this.ctx.stroke();
//   }

//   public animate(duration: number): void {
//     const startTime = performance.now();

//     const animationFrame = (timestamp: number) => {
//       const elapsedTime = timestamp - startTime;
//       const progress = Math.min(elapsedTime / duration, 1);

//       if (progress < 1) {
//         requestAnimationFrame(animationFrame);
//       }

//       this.drawClearCircle();

//       this.ctx.save();
//       this.mouthIsOpen = progress < 0.5; // Opens for the first half of the animation
//       this.drawPacMan(this.mouthIsOpen);
//       this.ctx.restore();
//     };

//     requestAnimationFrame(animationFrame);
//   }
// }

// export const drawPacMan2 = (
//   ctx: CanvasRenderingContext2D,
//   mouthOpen: boolean,
//   position: Position,
// ): void => {
//   console.log('drawing paCkman');
//   const centerX = position.x;
//   const centerY = position.y;
//   const radius = 50;
//   const startAngle = mouthOpen ? 0.2 : 0.1;
//   const endAngle = mouthOpen ? 1.9 : 1.8;

//   ctx.save();
//   ctx.beginPath();
//   ctx.arc(centerX, centerY, radius, startAngle * Math.PI, endAngle * Math.PI);
//   ctx.lineTo(centerX, centerY);
//   ctx.closePath();

//   ctx.fillStyle = 'yellow';
//   ctx.fill();

//   ctx.strokeStyle = 'black';
//   ctx.lineWidth = 2;
//   ctx.stroke();
//   ctx.restore();
// };

// export const drawPacman2 = (
//   ctx: CanvasRenderingContext2D,
//   pos: Position,
//   sizeUnscaled: number,
// ) => {
//   ctx.save();
//   // Issue drawing commands, assuming some 0,0 center and an unrotated bug
//   // Use the current time, or some frame counter, to change how things are drawn

//   const { x, y } = pos;
//   const scale = 0.6;
//   const size = sizeUnscaled * scale;
//   const x0 = x + sizeUnscaled / 2;
//   const y0 = y - sizeUnscaled;

//   ctx.beginPath();
//   ctx.arc(x0, y0, size, 0.2 * Math.PI, 1.8 * Math.PI);
//   ctx.lineTo(x0, y0);
//   ctx.closePath();
//   ctx.fillStyle = 'yellow';
//   ctx.fill();

//   ctx.restore();
// };

// export function drawPacMan(
//     ctx: CanvasRenderingContext2D,
//     pos: Position,
//     sizeUnscaled: number,
//   ) {
//     const { x, y } = pos;
//     const scale = 0.6;
//     const size = sizeUnscaled * scale;
//     const x0 = x + sizeUnscaled / 2;
//     const y0 = y - sizeUnscaled;

//     ctx.beginPath();
//     ctx.arc(x0, y0, size, 0.2 * Math.PI, 1.8 * Math.PI);
//     ctx.lineTo(x0, y0);
//     ctx.closePath();
//     ctx.fillStyle = 'yellow';
//     ctx.fill();
//   }
