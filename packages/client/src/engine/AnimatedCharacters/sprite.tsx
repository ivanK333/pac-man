import spritePng from '../../assets/images/sprites.png';
import { MapElements, backGroundColor } from '../config';
import { drawSimpleFood } from '../Primitives/drawSimpleFood';
import { drawRectangle } from '../Primitives/drawRectangle';
import { Character, CharacterProps } from './character';
import { drawCherry } from '../Primitives/drawCherry';
import { Direction } from '../GameCanvas';

export enum SpriteNames {
  blinky = 'blinky',
  pinky = 'pinky',
  inky = 'inky',
  clyde = 'clyde',
}

/** расположение изображений спрайтов на PNG */
const spriteAvatars: Record<SpriteNames, [number, number, number, number]> = {
  blinky: [457, 64, 128, 16],
  pinky: [457, 80, 128, 16],
  inky: [457, 96, 128, 16],
  clyde: [457, 112, 128, 16],
};

/** сдвиг для каждого отдельного аватара для имитации болтания ногами */
const spriteAnimationPositions: Record<string, [number, number]> = {
  right: [0, 16],
  left: [32, 48],
  up: [64, 80],
  down: [96, 112],
};

export class Sprite extends Character {
  image: string;
  crop: [number, number, number, number];
  patchRedraw: MapElements;
  legsPosition: 0 | 1;
  name: SpriteNames;
  targetBlock?: number[];
  constructor(props: CharacterProps, name: SpriteNames) {
    super(props);

    this.image = spritePng;
    this.crop = [0, 0, 0, 0];
    this.patchRedraw = MapElements.NONE;
    this.legsPosition = 0;
    this.name = name;
    this.direction = props.startDirection;
    this.crop = spriteAvatars[this.name];
  }

  setPatchRedraw(patchRedraw: MapElements) {
    this.patchRedraw = patchRedraw;
  }

  /** RENDERING */
  private drawPatch() {
    if (!this.ctx) return;
    const x = this.x;
    const y = this.y;
    const width = this.size;
    const height = this.size;
    drawRectangle({
      ctx: this.ctx,
      x,
      y,
      width,
      height,
      fillColor: backGroundColor,
    });

    const [i, j] = this.currentBlock;
    if (this.patchRedraw === MapElements.FOOD) {
      drawSimpleFood(this.ctx, i, j);
    }
    if (this.patchRedraw === MapElements.CHERRY) {
      drawCherry(this.ctx, i, j);
    }
  }

  private drawSpriteItself() {
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
      sx + spriteAnimationPositions[direction][legsPosition],
      sy,
      /**  каждому спрайту соответствует 8 картинок одинаковой ширины */
      sw / 8,
      sh,
      dx,
      dy,
      dw,
      dh,
    );
    spriteAnimationPositions[this.direction];
  }

  scatter() {
    if (this.atBlockCenter) {
      this.calculateChoise();
    }
    this.step();
  }

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
      switch (option) {
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

    // находим кратчайший путь до целевой клетки
    const shortestWay = Object.entries(distance).reduce((acc, curr) =>
      acc[1] < curr[1] ? acc : curr,
    )[0];

    // Изменяем направление движения на кратчайшее
    this.setDirection(shortestWay as Direction);
  }

  // расчет дистанции
  countDistance(current: number[], target: number[]) {
    return Math.sqrt(
      Math.pow(current[0] - target[0], 2) + Math.pow(current[1] - target[1], 2),
    );
  }

  move() {
    this.scatter();
  }

  render(time: number | null) {
    if (!time) return;

    const legsPosition = Math.floor(time / 100) % 2 === 0 ? 0 : 1;
    this.legsPosition = legsPosition;

    this.drawPatch();

    this.drawSpriteItself();
  }
}
