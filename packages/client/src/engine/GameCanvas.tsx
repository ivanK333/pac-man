import { FC, useState, useEffect, useRef } from 'react';

import { blockSize, MapElements, speed } from './config';
import { map as layer } from './Layers/layer_001';
import { countOccurrences } from './utils';
import { drawFood } from './Map/Food';
import { drawWalls } from './Map/Walls';
import { Pacman } from './AnimatedCharacters/pacman';
import { Sprite, SpriteNames } from './AnimatedCharacters/sprite';
import { drawBackground } from './Primitives/drawBackground';

export enum Direction {
  Right = 'right',
  Left = 'left',
  Up = 'up',
  Down = 'down',
  Stop = 'stop',
}

const PositionsOnTheMap = {
  StartPositions: {
    Pacman: [10, 0],
    Blinky: [8, 10],
    Inky: [8, 12],
    Pinky: [8, 11],
    Clyde: [8, 12],
  },
  TargetPositions: {
    Blinky: [0, 19],
    Inky: [0, 1],
    Pinky: [22, 1],
    Clyde: [22, 19],
  },
};

export type Restrictions = {
  up: boolean;
  right: boolean;
  down: boolean;
  left: boolean;
  stop: false;
};

const map = layer;
export const dimentions = [layer[0].length, layer.length];

const foodAmount = countOccurrences(layer, MapElements.FOOD);
const cherriesAmount = countOccurrences(layer, MapElements.CHERRY);

const pacman = new Pacman({
  size: blockSize,
  speed,
  startPosition: PositionsOnTheMap.StartPositions.Pacman,
  startDirection: Direction.Stop,
});

const sprites = {
  blinky: new Sprite(
    {
      size: blockSize,
      speed,
      startPosition: PositionsOnTheMap.StartPositions.Blinky,
      startDirection: Direction.Right,
      targetBlock: PositionsOnTheMap.TargetPositions.Blinky,
    },
    SpriteNames.blinky,
  ),
  inky: new Sprite(
    {
      size: blockSize,
      speed,
      startPosition: PositionsOnTheMap.StartPositions.Inky,
      startDirection: Direction.Up,
      targetBlock: PositionsOnTheMap.TargetPositions.Inky,
    },
    SpriteNames.inky,
  ),
  pinky: new Sprite(
    {
      size: blockSize,
      speed,
      startPosition: PositionsOnTheMap.StartPositions.Pinky,
      startDirection: Direction.Down,
      targetBlock: PositionsOnTheMap.TargetPositions.Pinky,
    },
    SpriteNames.pinky,
  ),
  clyde: new Sprite(
    {
      size: blockSize,
      speed,
      startPosition: PositionsOnTheMap.StartPositions.Clyde,
      startDirection: Direction.Right,
      targetBlock: PositionsOnTheMap.TargetPositions.Clyde,
    },
    SpriteNames.clyde,
  ),
};

const updateMap = (i: number, j: number, value: MapElements) => {
  map[i][j] = value;
};
interface CanvasProps {
  updateScore: (value: number) => void;
  updateLives: (value: number) => void;
}

const getObstacles = (i: number, j: number): Restrictions => ({
  up: map[i - 1][j] !== MapElements.WALL && map[i - 1][j] !== MapElements.SPAWN,
  right:
    map[i][j + 1] !== MapElements.WALL && map[i][j + 1] !== MapElements.SPAWN,
  down:
    map[i + 1][j] !== MapElements.WALL && map[i + 1][j] !== MapElements.SPAWN,
  left:
    map[i][j - 1] !== MapElements.WALL && map[i][j - 1] !== MapElements.SPAWN,
  stop: false,
});

const limitToTheMap = (j: number, char: Pacman | Sprite) => {
  if (j < 0) {
    alert('STOP BEFORE HE RAN AWAY!!!!');
    char.setDirection(Direction.Right);
    char.setNextDirection(Direction.Right);
  }
  if (j >= dimentions[1] - 3) {
    alert('STOP BEFORE HE RAN AWAY!!!!');
    char.setDirection(Direction.Left);
    char.setNextDirection(Direction.Left);
  }
};

const GameCanvas: FC<CanvasProps> = (props: CanvasProps) => {
  const { updateScore, updateLives } = props;
  const [time, setTime] = useState<number | null>(null);
  const [context, setContext] = useState<
    CanvasRenderingContext2D | null | undefined
  >(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  /** create canvas and draw map */
  useEffect(() => {
    const context = canvasRef.current?.getContext('2d');
    if (!context) return;
    setContext(context);

    // make pacman contextaware
    pacman.setContext(context);
    Object.values(sprites).forEach((sprite) => {
      sprite.setContext(context);
    });

    drawBackground(context);
    drawWalls(context, map);
    drawFood(context, map);

    /** start animation */
    loop();
  }, []);

  const loop = () => {
    function animation(now: number) {
      setTime(() => now);
      window.requestAnimationFrame(animation);
    }
    animation(performance.now());
  };

  /** keyboard handler */
  useEffect(() => {
    const keyboardHandler = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'ArrowRight':
          pacman.setNextDirection(Direction.Right);
          break;
        case 'ArrowLeft':
          pacman.setNextDirection(Direction.Left);
          break;
        case 'ArrowUp':
          pacman.setNextDirection(Direction.Up);
          break;
        case 'ArrowDown':
          pacman.setNextDirection(Direction.Down);
          break;

        case 'Space':
          pacman.die(updateLives);
          break;

        case 'KeyS':
          sprites.blinky.setNextDirection(Direction.Right);
          break;
        case 'KeyA':
          sprites.blinky.setNextDirection(Direction.Left);
          break;
        case 'KeyW':
          sprites.blinky.setNextDirection(Direction.Up);
          break;
        case 'KeyZ':
          sprites.blinky.setNextDirection(Direction.Down);
          break;

        default:
          break;
      }
    };
    window.addEventListener('keydown', keyboardHandler);
    return () => window.removeEventListener('keydown', keyboardHandler);
  }, []);

  /** game runner */
  useEffect(() => {
    animatePacman();
    animateSprite();

    if (!context) return;
    redraw();
  }, [time]);

  const redraw = () => {
    pacman.render(time);
    Object.values(sprites).forEach((sprite) => {
      sprite.render(time);
    });
  };

  const animatePacman = () => {
    const [i, j] = pacman.currentBlock;
    limitToTheMap(j, pacman);

    /** update score state */
    updateMap(i, j, MapElements.NONE);
    const score =
      foodAmount -
      countOccurrences(map, MapElements.FOOD) +
      (cherriesAmount - countOccurrences(map, MapElements.CHERRY)) * 10;
    updateScore(score);

    /** находит все стены вокруг ячейки */
    pacman.setRestrictions(getObstacles(i, j));
    pacman.move();
  };

  const animateSprite = () => {
    Object.values(sprites).forEach((sprite) => {
      const [i, j] = sprite.currentBlock;
      limitToTheMap(j, sprite);

      sprite.setRestrictions(getObstacles(i, j));
      /** определяет какую ячейку переисовать после спрайта */
      sprite.setPatchRedraw(map[i][j]);
      sprite.move();
    });
  };

  return (
    <canvas
      ref={canvasRef}
      id="canvas"
      width={`${dimentions[0] * blockSize}`}
      height={`${dimentions[1] * blockSize}`}
    ></canvas>
  );
};

export default GameCanvas;
