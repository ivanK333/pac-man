import { map } from './map';
import { Direction, MapPropertys } from './variables';

class Pacman {
  moveProcess = (
    direction: string,
    nextDirection: string,
    pacman: Record<string, number>,
    setPacman: React.Dispatch<React.SetStateAction<Record<string, number>>>,
    setDirection: React.Dispatch<React.SetStateAction<string>>,
  ): void => {
    this.changeDirectionIfPossible(
      direction,
      nextDirection,
      pacman,
      setPacman,
      setDirection,
    );

    this.moveForward(direction, setPacman);

    if (this.checkCollision(direction, pacman)) {
      this.moveBackward(direction, setPacman);
      return;
    }
  };

  moveForward = (
    direction: string,
    setPacman: React.Dispatch<React.SetStateAction<Record<string, number>>>,
  ) => {
    switch (direction) {
      case Direction.right:
        setPacman((pacman: Record<string, number>) => ({
          ...pacman,
          x: pacman.x + pacman.speed,
        }));
        break;
      case Direction.left:
        setPacman((pacman: Record<string, number>) => ({
          ...pacman,
          x: pacman.x - pacman.speed,
        }));
        break;
      case Direction.up:
        setPacman((pacman: Record<string, number>) => ({
          ...pacman,
          y: pacman.y - pacman.speed,
        }));
        break;
      case Direction.down:
        setPacman((pacman: Record<string, number>) => ({
          ...pacman,
          y: pacman.y + pacman.speed,
        }));
        break;
      default:
        break;
    }
  };

  moveBackward = (
    moveDirection: string,
    setPacman: React.Dispatch<React.SetStateAction<Record<string, number>>>,
  ) => {
    switch (moveDirection) {
      case Direction.right:
        setPacman((pacman: Record<string, number>) => ({
          ...pacman,
          x: pacman.x - pacman.speed,
        }));
        break;
      case Direction.left:
        setPacman((pacman: Record<string, number>) => ({
          ...pacman,
          x: pacman.x + pacman.speed,
        }));
        break;
      case Direction.up:
        setPacman((pacman: Record<string, number>) => ({
          ...pacman,
          y: pacman.y + pacman.speed,
        }));
        break;
      case Direction.down:
        setPacman((pacman: Record<string, number>) => ({
          ...pacman,
          y: pacman.y - pacman.speed,
        }));
        break;
      default:
        break;
    }
  };

  getPacmansSideCoords = (pacman: Record<string, number>) => {
    const pacmanCoords = {
      leftCoord: pacman.x / MapPropertys.blockSize,
      rightCoord: pacman.x / MapPropertys.blockSize + 1,
      upCoord: pacman.y / MapPropertys.blockSize,
      downCoord: pacman.y / MapPropertys.blockSize + 1,
    };
    return pacmanCoords;
  };

  checkCollision = (moveDirection: string, pacman: Record<string, number>) => {
    const { leftCoord, rightCoord, upCoord, downCoord } =
      this.getPacmansSideCoords(pacman);

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

  changeDirectionIfPossible = (
    direction: string,
    nextDirection: string,
    pacman: Record<string, number>,
    setPacman: React.Dispatch<React.SetStateAction<Record<string, number>>>,
    setDirection: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    const { rightCoord, downCoord, leftCoord, upCoord } =
      this.getPacmansSideCoords(pacman);

    if (direction === nextDirection) return;

    if (
      !Number.isInteger(rightCoord) ||
      !Number.isInteger(downCoord) ||
      !Number.isInteger(leftCoord) ||
      !Number.isInteger(upCoord)
    ) {
      return;
    }

    if (
      !this.checkCollision(direction, pacman) &&
      direction !== nextDirection &&
      !this.checkCollision(nextDirection, pacman)
    ) {
      this.moveBackward(direction, setPacman);
    }

    if (!this.checkCollision(nextDirection, pacman)) {
      setDirection(() => nextDirection);
    }
  };
}

const pacman = new Pacman();

export default pacman;
