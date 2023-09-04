import { Direction } from '../GameCanvas';

export type CharacterProps = {
  size: number;
  speed: number;
  startPosition: [number, number];
};

export interface CharacterState {
  x: number;
  y: number;
  speed: number;
  direction: Direction;
  nextDirection: Direction /** направление на след блоке */;
  restricted: {
    up: boolean;
    right: boolean;
    down: boolean;
    left: boolean;
  };
}

export class Character {
  ctx: CanvasRenderingContext2D | null;
  speed: number;
  size: number;
  state: CharacterState;

  constructor(props: CharacterProps) {
    this.ctx = null;
    this.speed = props.speed;
    this.size = props.size;

    this.state = {
      speed: props.speed,
      x: props.startPosition[1] * props.size,
      y: props.startPosition[0] * props.size,
      direction: Direction.Right,
      nextDirection: Direction.Right,
      restricted: {
        up: true,
        right: true,
        down: true,
        left: true,
      },
    };
  }

  get currentState(): CharacterState {
    return this.state;
  }

  get direction(): Direction {
    return this.state.direction;
  }

  get currentBlock() {
    const y = this.state.y;
    const x = this.state.x;
    const size = this.size;
    return [Math.floor(y / size), Math.floor(x / size)];
  }

  get atBlockCenter(): boolean {
    return (
      Number.isInteger(this.state.x / this.size) &&
      Number.isInteger(this.state.y / this.size)
    );
  }

  get switchDirection(): boolean {
    return (
      (this.state.direction === Direction.Right &&
        this.state.nextDirection === Direction.Left) ||
      (this.state.direction === Direction.Left &&
        this.state.nextDirection === Direction.Right) ||
      (this.state.direction === Direction.Up &&
        this.state.nextDirection === Direction.Down) ||
      (this.state.direction === Direction.Down &&
        this.state.nextDirection === Direction.Up)
    );
  }

  /** флаг для определения можно ли повернуть или продолжить движение */
  get canTurn(): boolean {
    return this.state.restricted[this.state.nextDirection];
  }

  setState(newState: Record<string, any>) {
    const oldState = { ...this.state };
    this.state = {
      ...oldState,
      ...newState,
    };
  }

  setRestrictions(restricted: {
    up: boolean;
    right: boolean;
    down: boolean;
    left: boolean;
  }) {
    this.setState({ restricted });
  }

  setContext(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  setDirection(direction: Direction) {
    this.setState({ direction });
  }

  setNextDirection(direction: Direction) {
    this.setState({ nextDirection: direction });
  }

  setSpeed(speed: number) {
    this.setState({ speed });
  }

  moveRight() {
    this.setState({
      x: this.state.x + this.state.speed,
    });
  }

  moveLeft() {
    this.setState({
      x: this.state.x - this.state.speed,
    });
  }

  moveUp() {
    this.setState({
      y: this.state.y - this.state.speed,
    });
  }

  moveDown() {
    this.setState({
      y: this.state.y + this.state.speed,
    });
  }

  stop() {
    this.setState({
      speed: 0,
    });
  }

  start() {
    this.setState({
      speed: this.speed,
    });
  }

  /** основной метод для контроля поведения пакмана */
  controlDirection() {
    /** развороты и рестарты после стопа */
    if (this.switchDirection || this.state.speed === 0) {
      this.setDirection(this.state.nextDirection);
      this.setNextDirection(this.state.direction);
      this.start();
    }

    /** не разрешать повороты не из центра блока */
    if (!this.atBlockCenter) return;

    /** если проходит центр блока но не может повернуть или идти дальше */
    if (!this.canTurn) {
      /** возвращает свое направление нужно что бы кнопки поворота
       * не могли поменять направление сильно заранее */
      if (this.state.direction !== this.state.nextDirection) {
        this.setNextDirection(this.state.direction);
        this.start();
      } else {
        /** остановить  */
        this.stop();
      }
    }

    /** повороты  */
    if (this.canTurn) {
      this.setDirection(this.state.nextDirection);
      this.setNextDirection(this.state.direction);
      this.start();
    }
  }

  move() {
    this.controlDirection();

    switch (this.state.direction) {
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
