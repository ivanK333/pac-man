import React from 'react';

import { map } from './map';
import { MapProperties, KeyCode, Direction } from './variables';
import { createRect } from './helpers';

class Game {
  canvasRef: React.RefObject<HTMLCanvasElement> | null;
  ctx: CanvasRenderingContext2D | null;
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number | null>>;
  pacmanState: Record<string, number>;
  setPacmanState: React.Dispatch<React.SetStateAction<number | null>>;
  direction: string;
  setDirection: React.Dispatch<React.SetStateAction<string | null>>;
  nextDirection: string;
  setNextDirection: React.Dispatch<React.SetStateAction<string | null>>;

  constructor(props: any) {
    this.canvasRef = null;
    this.ctx = null;
    this.time = props.time;
    this.setTime = props.setTime;
    this.pacmanState = props.pacmanState;
    this.setPacmanState = props.setPacmanState;
    this.direction = props.direction;
    this.setDirection = props.setDirection;
    this.nextDirection = props.nextDirection;
    this.setNextDirection = props.setNextDirection;
  }

  loop = () => {
    const animation = (now: number) => {
      this.setTime(() => now);
      window.requestAnimationFrame(animation);
    };
    animation(performance.now());
  };

  private keyboardHandler = (e: KeyboardEvent): void => {
    switch (e.code) {
      case KeyCode.right:
        this.setNextDirection(() => Direction.right);
        break;
      case KeyCode.left:
        this.setNextDirection(() => Direction.left);
        break;
      case KeyCode.up:
        this.setNextDirection(() => Direction.up);
        break;
      case KeyCode.down:
        this.setNextDirection(() => Direction.down);
        break;
      default:
        break;
    }
  };

  addKeyboardEventHendler = () => {
    return window.addEventListener('keydown', this.keyboardHandler);
  };

  removeKeyboardEventHendler = () => {
    return () => window.removeEventListener('keydown', this.keyboardHandler);
  };

  drawBackground = () => {
    createRect(
      this.ctx,
      0,
      0,
      this.ctx.canvas.width,
      this.ctx.canvas.height,
      '#000',
    );
  };

  drawMap = () => {
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[0].length; j++) {
        // wall block drawing
        if (map[i][j] === 1) {
          createRect(
            this.ctx,
            j * MapProperties.blockSize,
            i * MapProperties.blockSize,
            MapProperties.blockSize,
            MapProperties.blockSize,
            MapProperties.wallCollor,
          );
        }
        // cutting out the insides of horizontal blocks
        if (j > 0 && map[i][j - 1] === 1) {
          createRect(
            this.ctx,
            j * MapProperties.blockSize,
            i * MapProperties.blockSize + MapProperties.wallOffset,
            MapProperties.wallSpaceWidth + MapProperties.wallOffset,
            MapProperties.wallSpaceWidth,
            MapProperties.wallInnerColor,
          );
        }
        // removing borders of horizontal blocks
        if (j < map[0].length - 1 && map[i][j + 1] === 1) {
          createRect(
            this.ctx,
            j * MapProperties.blockSize + MapProperties.wallOffset,
            i * MapProperties.blockSize + MapProperties.wallOffset,
            MapProperties.wallSpaceWidth + MapProperties.wallOffset,
            MapProperties.wallSpaceWidth,
            MapProperties.wallInnerColor,
          );
        }
        // cutting out the insides of vertical blocks
        if (i < map.length - 1 && map[i + 1][j] === 1) {
          createRect(
            this.ctx,
            j * MapProperties.blockSize + MapProperties.wallOffset,
            i * MapProperties.blockSize + MapProperties.wallOffset,
            MapProperties.wallSpaceWidth,
            MapProperties.wallSpaceWidth + MapProperties.wallOffset,
            MapProperties.wallInnerColor,
          );
        }
        // removing borders of vertical blocks
        if (i > 0 && map[i - 1][j] === 1) {
          createRect(
            this.ctx,
            j * MapProperties.blockSize + MapProperties.wallOffset,
            i * MapProperties.blockSize,
            MapProperties.wallSpaceWidth,
            MapProperties.wallSpaceWidth + MapProperties.wallOffset,
            MapProperties.wallInnerColor,
          );
        }
      }
    }
  };

  drawFood = () => {
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[0].length; j++) {
        if (map[i][j] === 2) {
          createRect(
            this.ctx,
            j * MapProperties.blockSize + 8,
            i * MapProperties.blockSize + 8,
            MapProperties.blockSize / 5,
            MapProperties.blockSize / 5,
            MapProperties.foodCollor,
          );
        }
      }
    }
  };

  drawPacman = () => {
    // do not go beyond the screen (right)
    if (this.pacmanState.x > this.canvasRef.current!.width) {
      this.setPacmanState((pacman: any) => ({ ...pacman, x: -20 }));
    }
    // do not go beyond the screen (left)
    if (this.pacmanState.x < -21) {
      this.setPacmanState((pacman: any) => ({
        ...pacman,
        x: this.canvasRef.current!.width,
      }));
    }

    createRect(
      this.ctx,
      this.pacmanState.x,
      this.pacmanState.y,
      MapProperties.blockSize,
      MapProperties.blockSize,
      'yellow',
    );
  };

  redraw = (ref: React.RefObject<HTMLCanvasElement>) => {
    this.canvasRef = ref;
    this.ctx = this.canvasRef.current!.getContext('2d');

    this.drawBackground();
    this.drawMap();
    this.drawFood();
    this.drawPacman();
  };
}

export default Game;
