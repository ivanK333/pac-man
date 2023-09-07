import { map } from './map';
import { MapProperties, KeyCode, Direction } from './variables';
import { createRect } from './helpers';

type TGameProps = {
  setTime: React.Dispatch<React.SetStateAction<number | null>>;
  pacmanState: Record<string, number>;
  setPacmanState: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  setNextDirection: React.Dispatch<React.SetStateAction<string>>;
};

class Game {
  private canvasRef: React.RefObject<HTMLCanvasElement> | null;
  private ctx: CanvasRenderingContext2D | null;
  private setTime: React.Dispatch<React.SetStateAction<number | null>>;
  private pacmanState: Record<string, number>;
  private setPacmanState: React.Dispatch<
    React.SetStateAction<Record<string, number>>
  >;
  private setNextDirection: React.Dispatch<React.SetStateAction<string>>;

  constructor(props: TGameProps) {
    this.canvasRef = null;
    this.ctx = null;
    this.setTime = props.setTime;
    this.pacmanState = props.pacmanState;
    this.setPacmanState = props.setPacmanState;
    this.setNextDirection = props.setNextDirection;
  }

  public loop = () => {
    const animation = (now: number) => {
      this.setTime(() => now);
      window.requestAnimationFrame(animation);
    };
    animation(performance.now());
  };

  private keyboardHandler = (e: KeyboardEvent) => {
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

  public addKeyboardEventHendler = () => {
    return window.addEventListener('keydown', this.keyboardHandler);
  };

  public removeKeyboardEventHendler = () => {
    return () => window.removeEventListener('keydown', this.keyboardHandler);
  };

  private drawBackground = () => {
    this.ctx &&
      createRect(
        this.ctx,
        0,
        0,
        this.ctx.canvas.width,
        this.ctx.canvas.height,
        '#000',
      );
  };

  private drawMap = () => {
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[0].length; j++) {
        // wall block drawing
        if (map[i][j] === 1) {
          this.ctx &&
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
          this.ctx &&
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
          this.ctx &&
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
          this.ctx &&
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
          this.ctx &&
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

  private drawFood = () => {
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[0].length; j++) {
        if (map[i][j] === 2) {
          this.ctx &&
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

  private drawPacman = () => {
    // do not go beyond the screen (right)
    if (
      this.canvasRef &&
      this.canvasRef.current &&
      this.canvasRef.current.width &&
      this.pacmanState.x > this.canvasRef.current.width
    ) {
      this.setPacmanState(() => ({
        ...this.pacmanState,
        x: -20,
      }));
    }
    // do not go beyond the screen (left)
    if (this.pacmanState.x < -21) {
      this.setPacmanState(() => ({
        ...this.pacmanState,
        x: this.canvasRef!.current!.width,
      }));
    }

    this.ctx &&
      createRect(
        this.ctx,
        this.pacmanState.x,
        this.pacmanState.y,
        MapProperties.blockSize,
        MapProperties.blockSize,
        'yellow',
      );
  };

  public redraw = (ref: React.RefObject<HTMLCanvasElement>) => {
    this.canvasRef = ref;
    this.ctx = this.canvasRef.current!.getContext('2d');

    this.drawBackground();
    this.drawMap();
    this.drawFood();
    this.drawPacman();
  };
}

export default Game;
