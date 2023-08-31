import { useState, useEffect, useRef } from 'react';

import { blockSize, backGroundColor } from './config';
import { map } from './Layers/layer_001';
import { PacmanProps, drawPacman } from './AnimatedCharacters/pacman';
import { drawRectangle } from './Primitives/drawRectangle';
import { drawFood } from './Map/Food';
import { drawWalls } from './Map/Walls';

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

export const size = [map[0].length, map.length];

const GameCanvas = () => {
  const [time, setTime] = useState<number | null>(null);
  const [context, setContext] = useState<
    CanvasRenderingContext2D | null | undefined
  >(null);
  const [direction, setDirection] = useState<string>('stop');
  const [nextDirection, setNextDirection] = useState<string>('stop');
  const [pacman, setPacman] = useState<Omit<PacmanProps, 'ctx' | 'time'>>({
    x: 1 * blockSize,
    y: 1 * blockSize,
    radius: blockSize / 2,
    width: blockSize / 2,
    height: blockSize / 2,
    speed: 2,
    direction: 'right',
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  /** create canvas and draw map */
  useEffect(() => {
    const context = canvasRef.current?.getContext('2d');
    if (!context) return;
    setContext(context);

    drawBackground(context);
    drawWalls(context, map);
    drawFood(context, map);
  }, []);

  // SERVICE
  // loop start
  useEffect(() => {
    loop();
  }, []);

  const loop = () => {
    function animation(now: number) {
      setTime(() => now);
      window.requestAnimationFrame(animation);
    }
    animation(performance.now());
  };

  // keyboard handler
  useEffect(() => {
    const keyboardHandler = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'ArrowRight':
          setNextDirection(() => 'right');
          break;
        case 'ArrowLeft':
          setNextDirection(() => 'left');
          break;
        case 'ArrowUp':
          setNextDirection(() => 'up');
          break;
        case 'ArrowDown':
          setNextDirection(() => 'down');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', keyboardHandler);
    return () => window.removeEventListener('keydown', keyboardHandler);
  }, [direction]);

  // pacman direction cahnger
  useEffect(() => {
    moveProcess();

    if (!context) return;
    redraw(context);
  }, [time]);

  // redraw
  const redraw = (ctx: CanvasRenderingContext2D) => {
    drawPacman({ ctx, time, ...pacman });
    // redraw sprites
  };

  // PACMAN
  const moveProcess = () => {
    changeDirectionIfPossible();

    moveForward();

    if (checkCollision(direction)) {
      moveBackward(direction);
      return;
    }
  };

  const moveForward = () => {
    switch (direction) {
      case 'right':
        setPacman((pacman) => ({
          ...pacman,
          x: pacman.x + pacman.speed,
          direction,
        }));
        break;
      case 'left':
        setPacman((pacman) => ({
          ...pacman,
          x: pacman.x - pacman.speed,
          direction,
        }));
        break;
      case 'up':
        setPacman((pacman) => ({
          ...pacman,
          y: pacman.y - pacman.speed,
          direction,
        }));
        break;
      case 'down':
        setPacman((pacman) => ({
          ...pacman,
          y: pacman.y + pacman.speed,
          direction,
        }));
        break;
      default:
        break;
    }
  };

  const moveBackward = (dir: string) => {
    switch (dir) {
      case 'right':
        setPacman((pacman) => ({ ...pacman, x: pacman.x - pacman.speed }));
        break;
      case 'left':
        setPacman((pacman) => ({ ...pacman, x: pacman.x + pacman.speed }));
        break;
      case 'up':
        setPacman((pacman) => ({ ...pacman, y: pacman.y + pacman.speed }));
        break;
      case 'down':
        setPacman((pacman) => ({ ...pacman, y: pacman.y - pacman.speed }));
        break;
      default:
        break;
    }
  };

  const getPacmansSideCoords = () => {
    const pacmanCoords = {
      leftCoord: pacman.x / blockSize,
      rightCoord: pacman.x / blockSize + 1,
      upCoord: pacman.y / blockSize,
      downCoord: pacman.y / blockSize + 1,
    };
    return pacmanCoords;
  };

  const checkCollision = (dir: string) => {
    const { leftCoord, rightCoord, upCoord, downCoord } =
      getPacmansSideCoords();

    let isCollided = false;

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

    switch (dir) {
      case 'right':
        if (collision.rightBlock) {
          isCollided = true;
        }
        break;
      case 'down':
        if (collision.downBlock) {
          isCollided = true;
        }
        break;
      case 'left':
        if (collision.leftBlock) {
          isCollided = true;
        }
        break;
      case 'up':
        if (collision.upBlock) {
          isCollided = true;
        }
        break;
      default:
        break;
    }

    return isCollided;
  };

  const changeDirectionIfPossible = () => {
    const { rightCoord, downCoord, leftCoord, upCoord } =
      getPacmansSideCoords();

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
      !checkCollision(direction) &&
      direction !== nextDirection &&
      !checkCollision(nextDirection)
    ) {
      moveBackward(direction);
    }

    if (!checkCollision(nextDirection)) {
      setDirection(() => nextDirection);
    }
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        id="canvas"
        width={`${size[0] * blockSize}`}
        height={`${size[1] * blockSize}`}
      ></canvas>
    </>
  );
};

export { map };

export default GameCanvas;
