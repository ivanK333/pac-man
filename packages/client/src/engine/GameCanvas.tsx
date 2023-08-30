import { useState, useEffect, useRef } from 'react';

import {
  map,
  blockSize,
  wallCollor,
  wallSpaceWidth,
  wallOffset,
  wallInnerColor,
  foodCollor,
  size,
} from './map';
import { PackmanProps, drawPacMan2 } from './AnimatedCharacters/pacman';

const GameCanvas = () => {
  const [time, setTime] = useState<number | null>(null);
  const [context, setContext] = useState<
    CanvasRenderingContext2D | null | undefined
  >(null);
  const [direction, setDirection] = useState<string>('stop');
  const [nextDirection, setNextDirection] = useState<string>('stop');
  const [pacman, setPacman] = useState<Omit<PackmanProps, 'ctx' | 'time'>>({
    x: 1 * blockSize,
    y: 1 * blockSize,
    radius: blockSize / 2,
    width: blockSize / 2,
    height: blockSize / 2,
    speed: 2,
    direction: 'right',
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d');
    if (!context) return;
    setContext(context);
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
  }, [time]);

  // DRAW
  useEffect(() => {
    if (!context) return;
    redraw(context);
  }, [time]);

  const createRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
  ) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  };

  const drawBackground = (ctx: CanvasRenderingContext2D) => {
    createRect(ctx, 0, 0, ctx.canvas.width, ctx.canvas.height, '#000');
  };

  const drawPacman = (ctx: CanvasRenderingContext2D) => {
    // do not go beyond the screen (right)
    if (pacman.x > canvasRef.current!.width) {
      setPacman((pacman) => ({ ...pacman, x: -20 }));
    }
    // do not go beyond the screen (left)
    if (pacman.x < -21) {
      setPacman((pacman) => ({ ...pacman, x: canvasRef.current!.width }));
    }

    createRect(ctx, pacman.x, pacman.y, blockSize, blockSize, 'yellow');
  };

  const drawMap = (ctx: CanvasRenderingContext2D) => {
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[0].length; j++) {
        if (map[i][j] === 1) {
          createRect(
            ctx,
            j * blockSize,
            i * blockSize,
            blockSize,
            blockSize,
            wallCollor,
          );
        }
        if (j > 0 && map[i][j - 1] === 1) {
          createRect(
            ctx,
            j * blockSize,
            i * blockSize + wallOffset,
            wallSpaceWidth + wallOffset,
            wallSpaceWidth,
            wallInnerColor,
          );
        }
        if (j < map[0].length - 1 && map[i][j + 1] === 1) {
          createRect(
            ctx,
            j * blockSize + wallOffset,
            i * blockSize + wallOffset,
            wallSpaceWidth + wallOffset,
            wallSpaceWidth,
            wallInnerColor,
          );
        }
        if (i < map.length - 1 && map[i + 1][j] === 1) {
          createRect(
            ctx,
            j * blockSize + wallOffset,
            i * blockSize + wallOffset,
            wallSpaceWidth,
            wallSpaceWidth + wallOffset,
            wallInnerColor,
          );
        }
        if (i > 0 && map[i - 1][j] === 1) {
          createRect(
            ctx,
            j * blockSize + wallOffset,
            i * blockSize,
            wallSpaceWidth,
            wallSpaceWidth + wallOffset,
            wallInnerColor,
          );
        }
      }
    }
  };

  const drawFood = (ctx: CanvasRenderingContext2D) => {
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[0].length; j++) {
        if (map[i][j] === 2) {
          createRect(
            ctx,
            j * blockSize + 8,
            i * blockSize + 8,
            blockSize / 5,
            blockSize / 5,
            foodCollor,
          );
        }
      }
    }
  };

  // redraw
  const redraw = (ctx: CanvasRenderingContext2D) => {
    drawBackground(ctx);
    drawMap(ctx);
    drawFood(ctx);
    // drawPacman(ctx);
    drawPacMan2({ ctx, time, ...pacman });
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

export default GameCanvas;
