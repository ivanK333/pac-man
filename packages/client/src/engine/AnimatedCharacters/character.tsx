import { Direction, Restrictions } from '../GameCanvas';

export type CharacterProps = {
  size: number;
  speed: number;
  startPosition: [number, number];
  startDirection: Direction;
};
export class Character {
  ctx: CanvasRenderingContext2D | null;
  speed: number;
  size: number;
  currentSpeed: number;
  x: number;
  y: number;
  startDirection: Direction = Direction.Stop;
  direction: Direction;
  nextDirection: Direction;
  restricted: Restrictions;

  constructor(props: CharacterProps) {
    this.ctx = null;
    this.speed = props.speed;
    this.size = props.size;
    this.speed = props.speed;
    this.currentSpeed = props.speed;
    this.x = props.startPosition[1] * props.size;
    this.y = props.startPosition[0] * props.size;
    this.direction = props.startDirection;
    this.nextDirection = props.startDirection;
    this.restricted = {
      up: true,
      right: true,
      down: true,
      left: true,
      stop: false,
    };
  }

  get currentBlock() {
    const y = this.y + this.size / 2;
    const x = this.x + this.size / 2;
    const size = this.size;
    return [Math.floor(y / size), Math.floor(x / size)];
  }

  get atBlockCenter(): boolean {
    return (
      Number.isInteger(this.x / this.size) &&
      Number.isInteger(this.y / this.size)
    );
  }

  get switchDirection(): boolean {
    return (
      (this.direction === Direction.Right &&
        this.nextDirection === Direction.Left) ||
      (this.direction === Direction.Left &&
        this.nextDirection === Direction.Right) ||
      (this.direction === Direction.Up &&
        this.nextDirection === Direction.Down) ||
      (this.direction === Direction.Down && this.nextDirection === Direction.Up)
    );
  }

  /** флаг для определения можно ли повернуть или продолжить движение */
  get canTurn(): boolean {
    return this.restricted[this.nextDirection];
  }

  setRestrictions(restricted: Restrictions) {
    this.restricted = restricted;
  }

  setContext(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  setDirection(direction: Direction) {
    this.direction = direction;
  }

  setNextDirection(direction: Direction) {
    this.nextDirection = direction;
  }

  setSpeed(speed: number) {
    this.currentSpeed = speed;
  }

  moveRight() {
    this.x = this.x + this.currentSpeed;
  }

  moveLeft() {
    this.x = this.x - this.currentSpeed;
  }

  moveUp() {
    this.y = this.y - this.currentSpeed;
  }

  moveDown() {
    this.y = this.y + this.currentSpeed;
  }

  stop() {
    this.currentSpeed = 0;
  }

  start() {
    this.currentSpeed = this.speed;
  }

  /** основной метод для контроля поведения пакмана */
  controlDirection() {
    /** развороты и рестарты после стопа */
    if (this.switchDirection || this.speed === 0) {
      this.setDirection(this.nextDirection);
      this.start();
    }

    /** не разрешать повороты не из центра блока */
    if (!this.atBlockCenter) return;

    /** если проходит центр блока но не может повернуть или идти дальше */
    if (!this.canTurn) {
      /** возвращает свое направление нужно что бы кнопки поворота
       * не могли поменять направление сильно заранее */
      if (this.direction !== this.nextDirection) {
        this.setNextDirection(this.direction);
      } else {
        /** остановить  */
        this.stop();
      }
    }

    /** повороты  */
    if (this.canTurn) {
      this.setDirection(this.nextDirection);
      this.setNextDirection(this.direction);
      this.start();
    }
  }

  move() {
    this.controlDirection();

    switch (this.direction) {
      case Direction.Right:
        this.moveRight();
        break;
      case Direction.Left:
        this.moveLeft();
        break;
      case Direction.Up:
        this.moveUp();
        break;
      case Direction.Down:
        this.moveDown();
        break;
      default:
        this.stop();
        break;
    }
  }
}
