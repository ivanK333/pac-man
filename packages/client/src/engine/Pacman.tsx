import { map } from './map';
import { Direction, MapProperties } from './variables';

type TPacmanProps = {
  pacmanState: Record<string, number>;
  setPacmanState: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  direction: string;
  setDirection: React.Dispatch<React.SetStateAction<string>>;
  nextDirection: string;
};

class Pacman {
  private pacman: Record<string, number>;
  private setPacman: React.Dispatch<
    React.SetStateAction<Record<string, number>>
  >;
  private direction: string;
  private setDirection: React.Dispatch<React.SetStateAction<string>>;
  private nextDirection: string;

  constructor(props: TPacmanProps) {
    this.pacman = props.pacmanState;
    this.setPacman = props.setPacmanState;
    this.direction = props.direction;
    this.setDirection = props.setDirection;
    this.nextDirection = props.nextDirection;
  }

  public moveProcess = (): void => {
    this.changeDirectionIfPossible();

    this.moveForward();

    if (this.checkCollision(this.direction)) {
      this.moveBackward(this.direction);
      return;
    }
  };

  private moveForward = () => {
    switch (this.direction) {
      case Direction.right:
        this.setPacman((pacman: Record<string, number>) => ({
          ...pacman,
          x: pacman.x + pacman.speed,
        }));
        break;
      case Direction.left:
        this.setPacman((pacman: Record<string, number>) => ({
          ...pacman,
          x: pacman.x - pacman.speed,
        }));
        break;
      case Direction.up:
        this.setPacman((pacman: Record<string, number>) => ({
          ...pacman,
          y: pacman.y - pacman.speed,
        }));
        break;
      case Direction.down:
        this.setPacman((pacman: Record<string, number>) => ({
          ...pacman,
          y: pacman.y + pacman.speed,
        }));
        break;
      default:
        break;
    }
  };

  private moveBackward = (moveDirection: string) => {
    switch (moveDirection) {
      case Direction.right:
        this.setPacman((pacman: Record<string, number>) => ({
          ...pacman,
          x: pacman.x - pacman.speed,
        }));
        break;
      case Direction.left:
        this.setPacman((pacman: Record<string, number>) => ({
          ...pacman,
          x: pacman.x + pacman.speed,
        }));
        break;
      case Direction.up:
        this.setPacman((pacman: Record<string, number>) => ({
          ...pacman,
          y: pacman.y + pacman.speed,
        }));
        break;
      case Direction.down:
        this.setPacman((pacman: Record<string, number>) => ({
          ...pacman,
          y: pacman.y - pacman.speed,
        }));
        break;
      default:
        break;
    }
  };

  private getPacmansSideCoords = () => {
    const pacmanCoords = {
      leftCoord: this.pacman.x / MapProperties.blockSize,
      rightCoord: this.pacman.x / MapProperties.blockSize + 1,
      upCoord: this.pacman.y / MapProperties.blockSize,
      downCoord: this.pacman.y / MapProperties.blockSize + 1,
    };
    return pacmanCoords;
  };

  private checkCollision = (moveDirection: string) => {
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

  private changeDirectionIfPossible = () => {
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
