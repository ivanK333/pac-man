import { Direction } from '../GameCanvas';
import { backGroundColor } from '../config';
import { Character, CharacterProps } from './character';

export class Pacman extends Character {
  lives: number;
  radius: number;
  mouthOpen: boolean;

  constructor(props: CharacterProps) {
    super(props);

    this.lives = 3;
    this.radius = props.size / 2;
    this.mouthOpen = true;
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

  render(time: number | null) {
    if (!time) return;

    const mouthOpen = Math.floor(time / 100) % 2 === 0;

    this.mouthOpen = mouthOpen;

    this.drawPatch();

    this.drawPacmanItself();
  }
}
