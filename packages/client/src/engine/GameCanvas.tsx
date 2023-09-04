import { FC, useState, useEffect, useRef } from 'react';

import { blockSize, backGroundColor, MapElements, speed } from './config';
import { map as layer } from './Layers/layer_001';
import { countOccurrences } from './utils';
import { drawRectangle } from './Primitives/drawRectangle';
import { drawFood } from './Map/Food';
import { drawWalls } from './Map/Walls';
import { Pacman } from './AnimatedCharacters/pacman';
import { Sprite, SpriteColors } from './AnimatedCharacters/sprite';

export enum Direction {
  Right = 'right',
  Left = 'left',
  Up = 'up',
  Down = 'down',
}

export const dimentions = [layer[0].length, layer.length];
const foodAmount = countOccurrences(layer, MapElements.FOOD);
const pacman = new Pacman({ size: blockSize, speed, startPosition: [10, 0] });
const sprite = new Sprite(
  {
    size: blockSize,
    speed,
    startPosition: [10, 9],
  },
  SpriteColors.blue,
);
const map = layer;

const drawBackground = (ctx: CanvasRenderingContext2D) => {
  drawRectangle({
    ctx,
    x: 0,
    y: 0,
    width: ctx.canvas.width,
    height: ctx.canvas.height,
    fillColor: backGroundColor,
  });
};

const updateMap = (i: number, j: number, value: MapElements) => {
  map[i][j] = value;
};
interface CanvasProps {
  updateScore: (value: number) => void;
}

const getObstacles = (i: number, j: number) => ({
  up: map[i - 1][j] !== MapElements.WALL,
  right: map[i][j + 1] !== MapElements.WALL,
  down: map[i + 1][j] !== MapElements.WALL,
  left: map[i][j - 1] !== MapElements.WALL,
});

const GameCanvas: FC<CanvasProps> = (props: CanvasProps) => {
  const { updateScore } = props;
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

    sprite.setContext(context);

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

        case 'KeyS':
          sprite.setNextDirection(Direction.Right);
          break;
        case 'KeyA':
          sprite.setNextDirection(Direction.Left);
          break;
        case 'KeyW':
          sprite.setNextDirection(Direction.Up);
          break;
        case 'KeyZ':
          sprite.setNextDirection(Direction.Down);
          break;

        default:
          // animateSprite();
          // console.log(sprite.currentBlock);
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
    sprite.render(time);
  };

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

  const animatePacman = () => {
    const [i, j] = pacman.currentBlock;
    limitToTheMap(j, pacman);

    /** update score state */
    updateMap(i, j, MapElements.NONE);
    const score = foodAmount - countOccurrences(map, MapElements.FOOD);
    updateScore(score);

    /** находит все стены на карте для ячейки */
    pacman.setRestrictions(getObstacles(i, j));
    pacman.move();
  };

  const animateSprite = () => {
    const [i, j] = sprite.currentBlock;
    limitToTheMap(j, sprite);

    sprite.setRestrictions(getObstacles(i, j));
    sprite.setPatchRedraw(map[i][j]);
    sprite.move();
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
