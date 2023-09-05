import { map } from './map';
import { MapPropertys } from './variables';
import { createRect } from './helpers';

class Game {
  loop = (setTime: React.Dispatch<React.SetStateAction<number | null>>) => {
    function animation(now: number) {
      setTime(() => now);
      window.requestAnimationFrame(animation);
    }
    animation(performance.now());
  };

  drawBackground = (ctx: CanvasRenderingContext2D) => {
    createRect(ctx, 0, 0, ctx.canvas.width, ctx.canvas.height, '#000');
  };

  drawMap = (ctx: CanvasRenderingContext2D) => {
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[0].length; j++) {
        if (map[i][j] === 1) {
          createRect(
            ctx,
            j * MapPropertys.blockSize,
            i * MapPropertys.blockSize,
            MapPropertys.blockSize,
            MapPropertys.blockSize,
            MapPropertys.wallCollor,
          );
        }
        if (j > 0 && map[i][j - 1] === 1) {
          createRect(
            ctx,
            j * MapPropertys.blockSize,
            i * MapPropertys.blockSize + MapPropertys.wallOffset,
            MapPropertys.wallSpaceWidth + MapPropertys.wallOffset,
            MapPropertys.wallSpaceWidth,
            MapPropertys.wallInnerColor,
          );
        }
        if (j < map[0].length - 1 && map[i][j + 1] === 1) {
          createRect(
            ctx,
            j * MapPropertys.blockSize + MapPropertys.wallOffset,
            i * MapPropertys.blockSize + MapPropertys.wallOffset,
            MapPropertys.wallSpaceWidth + MapPropertys.wallOffset,
            MapPropertys.wallSpaceWidth,
            MapPropertys.wallInnerColor,
          );
        }
        if (i < map.length - 1 && map[i + 1][j] === 1) {
          createRect(
            ctx,
            j * MapPropertys.blockSize + MapPropertys.wallOffset,
            i * MapPropertys.blockSize + MapPropertys.wallOffset,
            MapPropertys.wallSpaceWidth,
            MapPropertys.wallSpaceWidth + MapPropertys.wallOffset,
            MapPropertys.wallInnerColor,
          );
        }
        if (i > 0 && map[i - 1][j] === 1) {
          createRect(
            ctx,
            j * MapPropertys.blockSize + MapPropertys.wallOffset,
            i * MapPropertys.blockSize,
            MapPropertys.wallSpaceWidth,
            MapPropertys.wallSpaceWidth + MapPropertys.wallOffset,
            MapPropertys.wallInnerColor,
          );
        }
      }
    }
  };

  drawFood = (ctx: CanvasRenderingContext2D) => {
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[0].length; j++) {
        if (map[i][j] === 2) {
          createRect(
            ctx,
            j * MapPropertys.blockSize + 8,
            i * MapPropertys.blockSize + 8,
            MapPropertys.blockSize / 5,
            MapPropertys.blockSize / 5,
            MapPropertys.foodCollor,
          );
        }
      }
    }
  };

  drawPacman = (
    ctx: CanvasRenderingContext2D,
    setPacman: React.Dispatch<React.SetStateAction<Record<string, number>>>,
    pacman: Record<string, number>,
    canvasRef: React.RefObject<HTMLCanvasElement>,
  ) => {
    // do not go beyond the screen (right)
    if (pacman.x > canvasRef.current!.width) {
      setPacman((pacman: any) => ({ ...pacman, x: -20 }));
    }
    // do not go beyond the screen (left)
    if (pacman.x < -21) {
      setPacman((pacman: any) => ({ ...pacman, x: canvasRef.current!.width }));
    }

    createRect(
      ctx,
      pacman.x,
      pacman.y,
      MapPropertys.blockSize,
      MapPropertys.blockSize,
      'yellow',
    );
  };

  redraw = (
    ctx: CanvasRenderingContext2D,
    setPacman: React.Dispatch<React.SetStateAction<Record<string, number>>>,
    pacmanState: Record<string, number>,
    canvasRef: React.RefObject<HTMLCanvasElement>,
  ) => {
    this.drawBackground(ctx);
    this.drawMap(ctx);
    this.drawFood(ctx);
    this.drawPacman(ctx, setPacman, pacmanState, canvasRef);
  };
}

const game = new Game();

export default game;
