import { map } from './map';
import { Direction, MapProperties } from './variables';

class Pacman {
  pacmanState: any;
  setPacmanState: any;
  direction: any;
  setDirection: any;
  nextDirection: any;

  constructor(props: any) {
    this.pacmanState = props.pacmanState;
    this.setPacmanState = props.setPacmanState;
    this.direction = props.direction;
    this.setDirection = props.setDirection;
    this.nextDirection = props.nextDirection;
  }

  moveProcess = (): void => {
    this.changeDirectionIfPossible();

    this.moveForward();

    if (this.checkCollision(this.direction)) {
      this.moveBackward(this.direction);
      return;
    }
  };

  moveForward = () => {
    switch (this.direction) {
      case Direction.right:
        this.setPacmanState((pacman: Record<string, number>) => ({
          ...pacman,
          x: pacman.x + pacman.speed,
        }));
        break;
      case Direction.left:
        this.setPacmanState((pacman: Record<string, number>) => ({
          ...pacman,
          x: pacman.x - pacman.speed,
        }));
        break;
      case Direction.up:
        this.setPacmanState((pacman: Record<string, number>) => ({
          ...pacman,
          y: pacman.y - pacman.speed,
        }));
        break;
      case Direction.down:
        this.setPacmanState((pacman: Record<string, number>) => ({
          ...pacman,
          y: pacman.y + pacman.speed,
        }));
        break;
      default:
        break;
    }
  };

  moveBackward = (moveDirection: string) => {
    switch (moveDirection) {
      case Direction.right:
        this.setPacmanState((pacman: Record<string, number>) => ({
          ...pacman,
          x: pacman.x - pacman.speed,
        }));
        break;
      case Direction.left:
        this.setPacmanState((pacman: Record<string, number>) => ({
          ...pacman,
          x: pacman.x + pacman.speed,
        }));
        break;
      case Direction.up:
        this.setPacmanState((pacman: Record<string, number>) => ({
          ...pacman,
          y: pacman.y + pacman.speed,
        }));
        break;
      case Direction.down:
        this.setPacmanState((pacman: Record<string, number>) => ({
          ...pacman,
          y: pacman.y - pacman.speed,
        }));
        break;
      default:
        break;
    }
  };

  getPacmansSideCoords = () => {
    const pacmanCoords = {
      leftCoord: this.pacmanState.x / MapProperties.blockSize,
      rightCoord: this.pacmanState.x / MapProperties.blockSize + 1,
      upCoord: this.pacmanState.y / MapProperties.blockSize,
      downCoord: this.pacmanState.y / MapProperties.blockSize + 1,
    };
    return pacmanCoords;
  };

  checkCollision = (moveDirection: string) => {
    const { leftCoord, rightCoord, upCoord, downCoord } =
      this.getPacmansSideCoords();

    if (
      !Number.isInteger(rightCoord) ||
      !Number.isInteger(downCoord) ||
      !Number.isInteger(leftCoord) ||
      !Number.isInteger(upCoord)
    ) {
      return;
    }

    const collision = {
      rightBlock: map[upCoord][rightCoord] === 1,
      downBlock: map[downCoord][leftCoord] === 1,
      leftBlock: map[upCoord][leftCoord - 1] === 1,
      upBlock: map[upCoord - 1][leftCoord] === 1,
    };

    switch (moveDirection) {
      case Direction.right:
        return collision.rightBlock ? true : false;
      case Direction.down:
        return collision.downBlock ? true : false;
      case Direction.left:
        return collision.leftBlock ? true : false;
      case Direction.up:
        return collision.upBlock ? true : false;
      default:
        break;
    }
  };

  changeDirectionIfPossible = () => {
    const { rightCoord, downCoord, leftCoord, upCoord } =
      this.getPacmansSideCoords();

    if (this.direction === this.nextDirection) return;

    if (
      !Number.isInteger(rightCoord) ||
      !Number.isInteger(downCoord) ||
      !Number.isInteger(leftCoord) ||
      !Number.isInteger(upCoord)
    ) {
      return;
    }

    if (
      !this.checkCollision(this.direction) &&
      this.direction !== this.nextDirection &&
      !this.checkCollision(this.nextDirection)
    ) {
      this.moveBackward(this.direction);
    }

    if (!this.checkCollision(this.nextDirection)) {
      this.setDirection(() => this.nextDirection);
    }
  };
}

export default Pacman;
