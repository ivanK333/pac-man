import Pacman from './pacman';
import { blockSize, speed, Direction, PositionsOnTheMap } from '../../config';

const pacman = new Pacman({
  size: blockSize,
  speed,
  startPosition: PositionsOnTheMap.StartPositions.Pacman,
  startDirection: Direction.Stop,
});

export default pacman;
