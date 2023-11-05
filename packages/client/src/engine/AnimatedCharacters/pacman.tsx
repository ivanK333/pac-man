import spritePng from '../../assets/images/sprites.png';
import { Direction } from '../GameCanvas';
import { backGroundColor } from '../config';
import { Character, CharacterProps } from './character';
import { isEqual } from '../Primitives/isEqual';

const packmanDead: number[] = [456, 0, 256, 16];

export class Pacman extends Character {
  lives: number;
  radius: number;
  mouthOpen: boolean;
  dead: boolean;

  constructor(props: CharacterProps) {
    super(props);

    this.lives = 3;
    this.radius = props.size / 2;
    this.mouthOpen = true;
    this.dead = false;
  }

  /** RENDERING */
  private drawPatch() {
    if (!this.ctx) return;
    /** делаю черный круг, который прячет изменения пакмана, на пиксель меньше, что бы не стирать стены */
    const patchR = this.radius;

    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.beginPath();
    this.ctx.arc(
      this.x + this.radius,
      this.y + this.radius,
      patchR,
      0,
      Math.PI * 2,
    );
    this.ctx.closePath();
    this.ctx.fillStyle = backGroundColor;
    this.ctx.fill();
    this.ctx.globalCompositeOperation = 'source-over';
  }

  private drawPacmanItself() {
    if (!this.ctx) return;

    const angles = (direction: Direction, mouthOpen: boolean) => {
      const wide = (10 * Math.PI) / 180;
      const angle = mouthOpen ? wide : 0.001;

      let orientation = 0;

      switch (direction) {
        case Direction.Down:
          orientation = 1.5 * Math.PI - 0.2;
          break;
        case Direction.Left:
          orientation = 1 * Math.PI - 0.1;
          break;
        case Direction.Up:
          orientation = 0.5 * Math.PI - 0.1;
          break;
        default:
          orientation = 0;
          break;
      }

      return [orientation + angle, orientation - angle];
    };
    /** а пакамана еще меньше, что бы следов не оставалось */
    const pacmanR = this.radius - 4;
    const centerX = this.x + this.radius;
    const centerY = this.y + this.radius;
    const [startAngle, endAngle] = angles(this.direction, this.mouthOpen);

    this.ctx.beginPath();
    this.ctx.arc(
      this.x + this.radius,
      this.y + this.radius,
      pacmanR,
      startAngle * Math.PI,
      endAngle * Math.PI,
    );
    this.ctx.lineTo(centerX, centerY);
    this.ctx.closePath();

    this.ctx.fillStyle = 'yellow';
    this.ctx.fill();
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
  }

  private drawDead(i: number) {
    if (!this.ctx) return;
    const wallThickness = 3;
    const image = new Image();
    image.src = spritePng;

    const dx = this.x + wallThickness;
    const dy = this.y + wallThickness;
    const dw = this.size - 2 * wallThickness;
    const dh = this.size - 2 * wallThickness;

    const sx = packmanDead[0] + 16 * i;
    const sy = packmanDead[1];
    const sw = 16;
    const sh = 16;

    this.ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
  }

  intersection(positions: Record<string, number[]>) {
    for (const key in positions) {
      if (isEqual(this.currentBlock, positions[key])) {
        return true;
      }
    }
  }

  die(callback: (n: number) => void) {
    if (this.dead) return;

    this.stop();
    this.dead = true;

    const runLoopWithDelay = (i: number, max: number, delay: number) => {
      if (i <= max) {
        setTimeout(() => {
          this.drawPatch();
          this.drawDead(i);
          runLoopWithDelay(i + 1, max, delay);
        }, delay);
      }
    };

    runLoopWithDelay(0, 14, 100);

    setTimeout(() => {
      this.lives = this.lives - 1;
      callback(this.lives);

      this.dead = false;
      this.x = this.startX;
      this.y = this.startY;
      this.direction = this.startDirection;
      this.nextDirection = this.startDirection;
    }, 2000);
  }

  render(time: number | null) {
    if (!time) return;

    if (this.dead) return;

    const mouthOpen = Math.floor(time / 100) % 2 === 0;

    this.mouthOpen = mouthOpen;

    this.drawPatch();

    this.drawPacmanItself();
  }
}
