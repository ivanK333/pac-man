import spritePng from '../../../assets/images/sprites.png';
import Character from '../character';
import draw from '../../helpers/Draw';
import {
  MapElements,
  backGroundColor,
  Direction,
  Modes,
  GhostNames,
  ghostAvatars,
  ghostAnimationPositions,
} from '../../config';
import { TGhostsProps } from '../../types';

class Ghost extends Character {
  image: string;
  crop: [number, number, number, number];
  patchRedraw: MapElements;
  legsPosition: 0 | 1;
  name: GhostNames;
  targetBlock: number[];
  defaultTargetBlock: number[];

  mode: Modes;
  constructor(props: TGhostsProps, name: GhostNames) {
    super(props);

    this.image = spritePng;
    this.crop = [0, 0, 0, 0];
    this.patchRedraw = MapElements.NONE;
    this.legsPosition = 0;
    this.name = name;
    this.direction = props.startDirection;
    this.crop = ghostAvatars[this.name];
    this.targetBlock = props.defaultTargetBlock;

    this.defaultTargetBlock = props.defaultTargetBlock;
    this.mode = Modes.scatter;
  }

  setPatchRedraw(patchRedraw: MapElements) {
    this.patchRedraw = patchRedraw;
  }

  setTargetBlock = (target: number[]) => {
    this.targetBlock = target;
    if (!this.ctx) return;
  };

  setMode = (newMode: Modes) => {
    this.mode = newMode;
  };

  /** RENDERING */
  private drawPatch() {
    if (!this.ctx) return;
    const x = this.x;
    const y = this.y;
    const width = this.size;
    const height = this.size;
    draw.drawRectangle({
      ctx: this.ctx,
      x,
      y,
      width,
      height,
      fillColor: backGroundColor,
    });

    const [i, j] = this.currentBlock;
    if (this.patchRedraw === MapElements.FOOD) {
      draw.drawSimpleFood(this.ctx, i, j);
    }
    if (this.patchRedraw === MapElements.CHERRY) {
      draw.drawCherry(this.ctx, i, j);
    }
  }

  private drawGhostItself() {
    if (!this.ctx) return;
    const wallThickness = 3;

    const image = new Image();
    image.src = spritePng;
    const [sx, sy, sw, sh] = this.crop;

    const direction = this.direction;
    const legsPosition = this.legsPosition;
    const dx = this.x + wallThickness;
    const dy = this.y + wallThickness;
    const dw = this.size - 2 * wallThickness;
    const dh = this.size - 2 * wallThickness;

    this.ctx.drawImage(
      image,
      /**выбираем какая картинка в зависимости от направления и положения ног */
      sx + ghostAnimationPositions[direction][legsPosition],
      sy,
      /**  каждому спрайту соответствует 8 картинок одинаковой ширины */
      sw / 8,
      sh,
      dx,
      dy,
      dw,
      dh,
    );
    ghostAnimationPositions[this.direction];
  }

  // Метод разбега
  scatter() {
    this.setSpeed(2);
    this.setTargetBlock(this.defaultTargetBlock);
  }

  // Метод охоты
  chase(
    pacmanCurrentBlock: number[],
    pacmanPredictionBlock: (predictionDistance: number) => number[],
    blinkyCurrentBlock: number[],
  ) {
    let targetY: number;
    let targetX: number;
    let distance: number;

    this.setSpeed(2);

    switch (this.name) {
      case 'blinky':
        this.setTargetBlock(pacmanCurrentBlock);
        break;
      case 'inky':
        targetY =
          (pacmanPredictionBlock(2)[0] - blinkyCurrentBlock[0]) * 2 +
          blinkyCurrentBlock[0];
        targetX =
          (pacmanPredictionBlock(2)[1] - blinkyCurrentBlock[1]) * 2 +
          blinkyCurrentBlock[1];

        this.setTargetBlock([targetY, targetX]);
        break;
      case 'pinky':
        this.setTargetBlock(pacmanPredictionBlock(4));
        break;
      case 'clyde':
        distance = Math.floor(
          this.countDistance(pacmanCurrentBlock, this.currentBlock),
        );

        if (distance < 4) {
          this.setTargetBlock(this.defaultTargetBlock);
        } else {
          this.setTargetBlock(pacmanCurrentBlock);
        }
        break;
      default:
        break;
    }
  }

  // Метод страха
  frightened(dimentions: number[]) {
    this.setSpeed(1);

    const newTarget = [
      Math.floor(Math.random() * (dimentions[0] + 1)),
      Math.floor(Math.random() * (dimentions[1] + 1)),
    ];

    this.setTargetBlock(newTarget);
  }

  // Расчет кротчайшего пути до целевой клетки
  calculateChoise() {
    const entries = Object.entries(this.restricted);
    const options: string[] = [];

    // Стороны в которые можно шагнуть записываем в options
    entries.forEach((direction) => {
      if (direction[1]) {
        options.push(direction[0]);
      }
    });

    const distance: Record<string, number> = {};

    options.forEach((option) => {
      switch (option as Direction) {
        case Direction.Up:
          // запрет ходить в блок из которого пришел
          if (this.previousBlock !== 'up' && this.targetBlock) {
            // расчет дистанции до целевой клетки
            distance.up = this.countDistance(
              [this.currentBlock[0] - 1, this.currentBlock[1]],
              this.targetBlock,
            );
          }
          break;
        case Direction.Right:
          if (this.previousBlock !== 'right' && this.targetBlock) {
            distance.right = this.countDistance(
              [this.currentBlock[0], this.currentBlock[1] + 1],
              this.targetBlock,
            );
          }
          break;
        case Direction.Down:
          if (this.previousBlock !== 'down' && this.targetBlock) {
            distance.down = this.countDistance(
              [this.currentBlock[0] + 1, this.currentBlock[1]],
              this.targetBlock,
            );
          }
          break;
        case Direction.Left:
          if (this.previousBlock !== 'left' && this.targetBlock) {
            distance.left = this.countDistance(
              [this.currentBlock[0], this.currentBlock[1] - 1],
              this.targetBlock,
            );
          }
          break;
        default:
          break;
      }
    });

    if (Object.entries(distance).length === 0) {
      //Нет доступных направлений
      throw new Error('Error, entries is empty');
    }

    // находим кратчайший путь до целевой клетки
    const shortestWay = Object.entries(distance).reduce((acc, curr) =>
      acc[1] < curr[1] ? acc : curr,
    )[0];

    // Изменяем направление движения на кратчайшее
    this.setDirection(shortestWay as Direction);
  }

  countDistance = (current: number[], target: number[]) => {
    return Math.sqrt(
      Math.pow(current[0] - target[0], 2) + Math.pow(current[1] - target[1], 2),
    );
  };

  move() {
    if (this.atBlockCenter) {
      this.calculateChoise();
    }

    this.step();
  }

  render(time: number | null) {
    if (!time) return;

    const legsPosition = Math.floor(time / 100) % 2 === 0 ? 0 : 1;
    this.legsPosition = legsPosition;

    this.drawPatch();

    this.drawGhostItself();
  }
}

export default Ghost;
