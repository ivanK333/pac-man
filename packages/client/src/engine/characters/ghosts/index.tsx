import Ghost from './ghost';
import {
  blockSize,
  speed,
  Direction,
  PositionsOnTheMap,
  GhostNames,
} from '../../config';

const ghosts = {
  blinky: new Ghost(
    {
      size: blockSize,
      speed,
      startPosition: PositionsOnTheMap.StartPositions.Blinky,
      startDirection: Direction.Right,
      defaultTargetBlock: PositionsOnTheMap.TargetPositions.Blinky,
    },
    GhostNames.blinky,
  ),
  inky: new Ghost(
    {
      size: blockSize,
      speed,
      startPosition: PositionsOnTheMap.StartPositions.Inky,
      startDirection: Direction.Up,
      defaultTargetBlock: PositionsOnTheMap.TargetPositions.Inky,
    },
    GhostNames.inky,
  ),
  pinky: new Ghost(
    {
      size: blockSize,
      speed,
      startPosition: PositionsOnTheMap.StartPositions.Pinky,
      startDirection: Direction.Down,
      defaultTargetBlock: PositionsOnTheMap.TargetPositions.Pinky,
    },
    GhostNames.pinky,
  ),
  clyde: new Ghost(
    {
      size: blockSize,
      speed,
      startPosition: PositionsOnTheMap.StartPositions.Clyde,
      startDirection: Direction.Right,
      defaultTargetBlock: PositionsOnTheMap.TargetPositions.Clyde,
    },
    GhostNames.clyde,
  ),
};

export default ghosts;
