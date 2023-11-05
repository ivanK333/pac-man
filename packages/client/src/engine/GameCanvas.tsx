/* eslint-disable import/no-unresolved */
import { FC, useState, useEffect, useRef } from 'react';

import { blockSize, MapElements, speed } from './config';
import { map as layer } from './Layers/layer_001';
import { countOccurrences } from './utils';
import { drawFood } from './Map/Food';
import { drawWalls } from './Map/Walls';
import { Pacman } from './AnimatedCharacters/pacman';
import { Sprite, SpriteNames } from './AnimatedCharacters/sprite';
import { drawBackground } from './Primitives/drawBackground';
import { SoundEffects, Sounds } from './Sound/sound';

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

export const updateMap = (
  map: number[][],
  i: number,
  j: number,
  value: MapElements,
) => {
  map[i][j] = value;
};
interface CanvasProps {
  // sounds: Sounds;
  updateScore: (value: number) => void;
  updateLives: (value: number) => void;
  restart: number;
  // volume: number;
  sounds: Sounds | null;
}

export const getObstacles = (
  map: number[][],
  i: number,
  j: number,
): Restrictions => ({
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
  const { updateScore, updateLives, restart, sounds } = props;
  const [time, setTime] = useState<number>(performance.now());
  const [map, setMap] = useState<number[][]>(layer);
  const [context, setContext] = useState<
    CanvasRenderingContext2D | null | undefined
  >(null);

  // переменная необходимая только для разработки/тестирования
  // let spaceDisabled = false;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  /** create canvas and draw map */
  useEffect(() => {
    /** make a deep copy. will need it for restart */
    setMap(layer.map((innerArr) => [...innerArr]));
    /** TODO: this is temporary, whole restart should be redone */
    pacman.lives = 3;

    const context = canvasRef.current?.getContext('2d');
    if (!context) return;
    setContext(context);

    // make pacman contextaware
    pacman.setContext(context);
    Object.values(sprites).forEach((sprite) => {
      sprite.setContext(context);
    });

    drawBackground(context);
    drawWalls(context, layer);
    drawFood(context, layer);
    redraw();

    /** start animation */
    setTimeout(() => {
      loop();
    }, 4500);
  }, [restart]);

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
      if (pacman.dead) return;

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

        // блок кода необходимый только для разработки/тестирования
        // case 'Space':
        //   /** выключаю пробел пока пакман умирает */
        //   if (!spaceDisabled) {
        //     pacman.die(updateLives);
        //     spaceDisabled = true;
        //     setTimeout(() => {
        //       spaceDisabled = false;
        //     }, 2000);
        //   }

        //   break;
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

  const catchUp = () => {
    const gostsPositions: Record<string, number[]> = {};

    gostsPositions.blinky = sprites.blinky.currentBlock;
    gostsPositions.inky = sprites.inky.currentBlock;
    gostsPositions.pinky = sprites.pinky.currentBlock;
    gostsPositions.clyde = sprites.clyde.currentBlock;

    if (pacman.intersection(gostsPositions)) {
      pacman.die(updateLives);
      sounds?.playSound(SoundEffects.Death);
    }
    return;
  };

  const redraw = () => {
    catchUp();

    Object.values(sprites).forEach((sprite) => {
      sprite.render(time);
    });
    pacman.render(time);
  };

  const animatePacman = () => {
    const [i, j] = pacman.currentBlock;
    limitToTheMap(j, pacman);

    /** play eating sounds */
    if (map[i][j] === MapElements.FOOD) {
      sounds?.playSound(SoundEffects.Chomp);
    }
    if (map[i][j] === MapElements.CHERRY) {
      sounds?.playSound(SoundEffects.EatFruit);
    }

    /** update score state */
    updateMap(map, i, j, MapElements.NONE);

    const score =
      foodAmount -
      countOccurrences(map, MapElements.FOOD) +
      (cherriesAmount - countOccurrences(map, MapElements.CHERRY)) * 10;
    updateScore(score);

    /** находит все стены вокруг ячейки */
    pacman.setRestrictions(getObstacles(map, i, j));
    pacman.move();
  };

  const animateSprite = () => {
    Object.values(sprites).forEach((sprite) => {
      const [i, j] = sprite.currentBlock;
      limitToTheMap(j, sprite);

      sprite.setRestrictions(getObstacles(map, i, j));
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
