import { Direction } from '../GameCanvas';

type PacmanProps = {
  size: number;
  speed: number;
  startPosition: [number, number];
};
interface PacmanState {
  x: number;
  y: number;
  radius: number;
  size: number;
  speed: number;
  direction: Direction;
  nextDirection: Direction /** направление на след блоке */;
  mouthOpen: boolean;
  obstacles: {
    up: boolean;
    right: boolean;
    down: boolean;
    left: boolean;
  };
}

export class Pacman {
  private ctx: CanvasRenderingContext2D | null;
  speed: number;
  state: PacmanState;

  constructor(props: PacmanProps) {
    this.ctx = null;
    this.speed = props.speed;

    /** начальное состояние */
    this.state = {
      size: props.size,
      speed: props.speed,
      x: props.startPosition[1] * props.size,
      y: props.startPosition[0] * props.size,
      radius: props.size / 2,
      direction: Direction.Right,
      nextDirection: Direction.Right,
      obstacles: {
        up: true,
        right: true,
        down: true,
        left: true,
      },
      mouthOpen: true,
    };
  }

  private setState(newState: Partial<PacmanState>) {
    const oldState = { ...this.state };
    this.state = {
      ...oldState,
      ...newState,
    };
  }

  setRestrictions(obstacles: {
    up: boolean;
    right: boolean;
    down: boolean;
    left: boolean;
  }) {
    this.setState({ obstacles });
  }

  setContext(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  getState(): PacmanState {
    return this.state;
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

  get position(): [number, number] {
    return [this.state.x / this.state.size, this.state.y / this.state.size];
  }

  get direction(): Direction {
    return this.state.direction;
  }

  get thisBlock() {
    const y = this.state.y;
    const x = this.state.x;
    const size = this.state.size;
    return [Math.floor(y / size), Math.floor(x / size)];
  }

  get atBlockCenter(): boolean {
    return (
      Number.isInteger(this.state.x / this.state.size) &&
      Number.isInteger(this.state.y / this.state.size)
    );
  }

  get atNextBlock(): boolean {
    return (
      this.state.x === this.state.nextTurnBlock[1] * this.state.size &&
      this.state.y === this.state.nextTurnBlock[0] * this.state.size
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

  get canTurn(): boolean {
    return this.state.obstacles[this.state.nextDirection];
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
    // this.setState({ moving: true });
    // console.log(' ====> move()');
    // console.log('dir ', this.state.direction);
    // console.log('nextDir ', this.state.nextDirection);

    // console.log('at center ', this.atBlockCenter);
    // console.log('can turn ', this.canTurn);
    // if (this.atBlockCenter) {
    //   console.log('block: ', this.blockPosition);
    //   console.log(this.state.obstacles);
    // }

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

  private drawPatch() {
    if (!this.ctx) return;
    /** делаю черный круг, который прячет изменения пакмана, на пиксель меньше, что бы не стирать стены */
    const patchR = this.state.radius;

    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.beginPath();
    this.ctx.arc(
      this.state.x + this.state.radius,
      this.state.y + this.state.radius,
      patchR,
      0,
      Math.PI * 2,
    );
    this.ctx.closePath();
    this.ctx.fillStyle = 'black';
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
    const pacmanR = this.state.radius - 4;
    const centerX = this.state.x + this.state.radius;
    const centerY = this.state.y + this.state.radius;
    const [startAngle, endAngle] = angles(
      this.state.direction,
      this.state.mouthOpen,
    );

    this.ctx.beginPath();
    this.ctx.arc(
      this.state.x + this.state.radius,
      this.state.y + this.state.radius,
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

    this.setState({ mouthOpen });

    this.drawPatch();

    this.drawPacmanItself();
  }
}
