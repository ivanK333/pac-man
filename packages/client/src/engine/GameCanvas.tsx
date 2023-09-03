import { FC, useState, useEffect, useRef } from 'react';

import { blockSize, backGroundColor, MapElements, speed } from './config';
import { map as layer } from './Layers/layer_001';
import { countOccurrences } from './utils';
import { drawRectangle } from './Primitives/drawRectangle';
import { drawFood } from './Map/Food';
import { drawWalls } from './Map/Walls';
import { Pacman } from './AnimatedCharacters/pacman';

export enum Direction {
  Right = 'right',
  Left = 'left',
  Up = 'up',
  Down = 'down',
}

export const size = [layer[0].length, layer.length];
const foodAmount = countOccurrences(layer, MapElements.FOOD);
const pacman = new Pacman({ size: blockSize, speed, startPosition: [10, 0] });
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
        default:
          // animatePacman();
          break;
      }
    };
    window.addEventListener('keydown', keyboardHandler);
    return () => window.removeEventListener('keydown', keyboardHandler);
  }, []);

  /** game runner */
  useEffect(() => {
    animatePacman();

    if (!context) return;
    redraw();
  }, [time]);

  const redraw = () => {
    pacman.render(time);
    // sprites here
  };

  const animatePacman = () => {
    const [i, j] = pacman.thisBlock;
    console.log(size);
    console.log(i, j);
    if (j < 0) {
      alert('STOP PACMAN BEFOR HE RAN AWAY!!!!');
      pacman.setDirection(Direction.Right);
      pacman.setNextDirection(Direction.Right);
    }
    if (j >= size[1] - 3) {
      pacman.stop();
      pacman.setRestrictions({
        up: true,
        right: true,
        down: true,
        left: true,
      });
      console.log('LEVEL DONE');
      return;
    }

    /** update score state */
    updateMap(i, j, MapElements.NONE);
    const score = foodAmount - countOccurrences(map, MapElements.FOOD);
    updateScore(score);

    /** находит все стены на карте для ячейки */
    pacman.setRestrictions({
      up: map[i - 1][j] !== MapElements.WALL,
      right: map[i][j + 1] !== MapElements.WALL,
      down: map[i + 1][j] !== MapElements.WALL,
      left: map[i][j - 1] !== MapElements.WALL,
    });
    pacman.move();
  };

  return (
    <canvas
      ref={canvasRef}
      id="canvas"
      width={`${size[0] * blockSize}`}
      height={`${size[1] * blockSize}`}
    ></canvas>
  );
};

export default GameCanvas;
