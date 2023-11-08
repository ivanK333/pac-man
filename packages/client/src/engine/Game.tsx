import { map as layer } from './map/levels/level_001';
import Pacman from './characters/pacman/pacman';
import Ghost from './characters/ghosts/ghost';
import pacman from './characters/pacman';
import ghosts from './characters/ghosts';
import draw from './helpers/Draw';
import { MapElements, Direction, KeyCode, Modes, modeTiming } from './config';
import { TGameProps, TRestrictions } from './types';

class Game {
  private time: number | null;
  private setTime: (number: number) => void;
  private map: number[][];
  private setMap: (map: number[][]) => void;
  private updateScore: (value: number) => void;
  private updateLives: (value: number) => void;
  private restart: number;
  public score: number;
  public eatenBooster: boolean;
  private foodAmount: number;
  private cherriesAmount: number;
  private spaceDisabled: boolean;
  private dimentions: number[];
  private remainingCherries: number;

  private previousCherryAmount: number;
  private setPreviousCherryAmount: (amount: number) => void;
  private setEatenBooster: (eatenBooster: boolean) => void;

  constructor(props: TGameProps) {
    this.time = props.time;
    this.setTime = props.setTime;
    this.map = props.map;
    this.setMap = props.setMap;
    this.updateScore = props.updateScore;
    this.updateLives = props.updateLives;
    this.restart = props.restart;

    this.score = 0;
    this.eatenBooster = props.eatenBooster;
    this.foodAmount = this.countOccurrences(layer, MapElements.FOOD);
    this.cherriesAmount = this.countOccurrences(layer, MapElements.CHERRY);
    this.spaceDisabled = false;
    this.dimentions = props.dimentions;

    this.remainingCherries = this.countOccurrences(
      this.map,
      MapElements.CHERRY,
    );

    this.previousCherryAmount = props.previousCherryAmount;
    this.setPreviousCherryAmount = props.gameSetPreviousCherryAmount;

    this.setEatenBooster = props.gameSetEatenBooster;
  }

  public loop = () => {
    const animation = (now: number) => {
      this.setTime(now);
      window.requestAnimationFrame(animation);
    };
    animation(performance.now());
  };

  private keyboardHandler = (e: KeyboardEvent) => {
    switch (e.code) {
      case KeyCode.Right:
        pacman.setNextDirection(Direction.Right);
        break;
      case KeyCode.Left:
        pacman.setNextDirection(Direction.Left);
        break;
      case KeyCode.Up:
        pacman.setNextDirection(Direction.Up);
        break;
      case KeyCode.Down:
        pacman.setNextDirection(Direction.Down);
        break;
      case KeyCode.Space:
        /** выключаю пробел пока пакман умирает */
        if (!this.spaceDisabled) {
          pacman.die(this.updateLives);
          this.spaceDisabled = true;
          setTimeout(() => {
            this.spaceDisabled = false;
          }, 2000);
        }
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

  countOccurrences = (matrix: number[][], target: number): number => {
    return matrix.reduce((count, row) => {
      return (
        count +
        row.reduce((innerCount, value) => {
          return innerCount + (value === target ? 1 : 0);
        }, 0)
      );
    }, 0);
  };

  getObstacles = (map: number[][], i: number, j: number): TRestrictions => ({
    up:
      map[i - 1][j] !== MapElements.WALL && map[i - 1][j] !== MapElements.SPAWN,
    right:
      map[i][j + 1] !== MapElements.WALL && map[i][j + 1] !== MapElements.SPAWN,
    down:
      map[i + 1][j] !== MapElements.WALL && map[i + 1][j] !== MapElements.SPAWN,
    left:
      map[i][j - 1] !== MapElements.WALL && map[i][j - 1] !== MapElements.SPAWN,
    stop: false,
  });

  updateMap = (map: number[][], i: number, j: number, value: MapElements) => {
    map[i][j] = value;
  };

  limitToTheMap = (j: number, char: Pacman | Ghost) => {
    if (j < 0) {
      char.setDirection(Direction.Right);
      char.setNextDirection(Direction.Right);
    }
    if (j >= this.dimentions[1] - 3) {
      char.setDirection(Direction.Left);
      char.setNextDirection(Direction.Left);
    }
  };

  private boosterTracker = () => {
    if (
      !this.previousCherryAmount ||
      this.remainingCherries === this.previousCherryAmount
    )
      return;

    this.setEatenBooster(true);

    setTimeout(() => {
      this.setEatenBooster(false);
    }, 4000);
  };

  public animatePacman = () => {
    const [i, j] = pacman.currentBlock;
    this.limitToTheMap(j, pacman);

    /** update score state */
    this.updateMap(this.map, i, j, MapElements.NONE);
    this.score =
      this.foodAmount -
      this.countOccurrences(this.map, MapElements.FOOD) +
      // eslint-disable-next-line prettier/prettier
      (this.cherriesAmount -
        this.countOccurrences(this.map, MapElements.CHERRY)) *
        10;
    this.updateScore(this.score);

    /** update previous cherry state */
    this.setPreviousCherryAmount(this.remainingCherries);

    /** находит все стены вокруг ячейки */
    pacman.setRestrictions(this.getObstacles(this.map, i, j));
    pacman.move();
  };

  public animateGhost = () => {
    Object.values(ghosts).forEach((ghost) => {
      const [i, j] = ghost.currentBlock;
      this.limitToTheMap(j, ghost);

      ghost.setRestrictions(this.getObstacles(this.map, i, j));
      /** определяет какую ячейку переисовать после спрайта */
      ghost.setPatchRedraw(this.map[i][j]);

      this.changeModeIfNecessary(ghost);
      ghost.move();
    });
  };

  // Логика изменения режимов приведений
  public changeModeIfNecessary = (character: Ghost) => {
    if (!character.atBlockCenter) return;

    const timing = Math.floor(this.time! / 1000);

    if (this.eatenBooster) {
      character.setMode(Modes.frightened);
    } else if (
      timing === modeTiming.chase[0] ||
      timing === modeTiming.chase[1] ||
      timing === modeTiming.chase[2] ||
      timing === modeTiming.chase[3]
    ) {
      character.setMode(Modes.chase);
    } else if (
      timing === modeTiming.scatter[0] ||
      timing === modeTiming.scatter[1] ||
      timing === modeTiming.scatter[2]
    ) {
      character.setMode(Modes.scatter);
    }

    this.modeObserver(character);
  };

  private modeObserver(character: Ghost) {
    switch (character.mode) {
      case 'scatter':
        character.scatter();
        break;
      case 'chase':
        character.chase(
          pacman.currentBlock,
          pacman.predictionBlock,
          ghosts.blinky.currentBlock,
        );
        break;
      case 'frightened':
        character.frightened(this.dimentions);
        break;
      // case 'home':
      //   character.home();
      //   break;
      // case 'stop':
      //   character.home();
      //   break;
      default:
        break;
    }
  }

  // Пересечение пакмана с призраками
  public catchUp = () => {
    const gostsPositions: Record<string, number[]> = {};

    gostsPositions.blinky = ghosts.blinky.currentBlock;
    gostsPositions.inky = ghosts.inky.currentBlock;
    gostsPositions.pinky = ghosts.pinky.currentBlock;
    gostsPositions.clyde = ghosts.clyde.currentBlock;

    if (pacman.intersection(gostsPositions)) {
      pacman.die(this.updateLives);
    }
    return;
  };

  public redraw = () => {
    this.catchUp();

    this.boosterTracker();

    Object.values(ghosts).forEach((ghost) => {
      ghost.render(this.time);
    });
    pacman.render(this.time);
  };

  public start = (canvasRef: HTMLCanvasElement) => {
    /** make a deep copy. will need it for restart */
    this.setMap(layer.map((innerArr) => [...innerArr]));
    /** TODO: this is temporary, whole restart should be redone */
    pacman.lives = 3;

    const context = canvasRef.getContext('2d');
    if (!context) return;

    // make pacman contextaware
    pacman.setContext(context);
    Object.values(ghosts).forEach((ghost) => {
      ghost.setContext(context);
    });

    draw.drawBackground(context);
    draw.drawWalls(context, layer);
    draw.drawFood(context, layer);

    /** start animation */
    this.loop();
  };
}

export default Game;
