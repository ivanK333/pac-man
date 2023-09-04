import { Direction } from '../GameCanvas';
import spritePng from '../../assets/images/sprites.png';
import { MapElements, backGroundColor } from '../config';
import { drawSimpleFood } from '../Primitives/drawSimpleFood';
import { drawRectangle } from '../Primitives/drawRectangle';
import { Character, CharacterProps, CharacterState } from './character';

export enum SpriteColors {
  red = 'red',
  pink = 'pink',
  blue = 'blue',
  yellow = 'yellow',
}

/** расположение изображений спрайтов на PNG */
const spriteAvatars: Record<SpriteColors, [number, number, number, number]> = {
  red: [457, 64, 128, 16],
  pink: [457, 80, 128, 16],
  blue: [457, 96, 128, 16],
  yellow: [457, 112, 128, 16],
};

/** сдвиг для каждого отдельного аватара для имитации болтания ногами */
const spriteAnimationPositions: Record<string, [number, number]> = {
  right: [0, 16],
  left: [32, 48],
  up: [64, 80],
  down: [96, 112],
};

interface SpriteState extends CharacterState {
  image: string;
  crop: [number, number, number, number];
  patchRedraw: MapElements;
  legsPosition: 0 | 1;
}

export class Sprite extends Character {
  image: string;
  crop: [number, number, number, number];
  patchRedraw: MapElements;
  legsPosition: 0 | 1;
  color: SpriteColors;

  state: SpriteState;

  constructor(
    props: CharacterProps,
    color: SpriteColors,
    startDirection: Direction,
  ) {
    super(props);

    this.image = spritePng;
    this.crop = [0, 0, 0, 0];
    this.patchRedraw = MapElements.NONE;
    this.legsPosition = 0;
    this.color = color;
    this.crop = spriteAvatars[this.color];

    this.state = {
      speed: props.speed,
      x: props.startPosition[1] * props.size,
      y: props.startPosition[0] * props.size,

      direction: startDirection,
      nextDirection: startDirection,
      restricted: {
        up: true,
        right: true,
        down: true,
        left: true,
      },
      legsPosition: 0,
      image: spritePng,
      crop: [0, 0, 0, 0],
      patchRedraw: MapElements.NONE,
    };
  }

  setPatchRedraw(patchRedraw: MapElements) {
    this.setState({ patchRedraw });
  }

  /** RENDERING */
  private drawPatch() {
    if (!this.ctx) return;
    const x = this.state.x;
    const y = this.state.y;
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
    if (this.state.patchRedraw === MapElements.FOOD) {
      drawSimpleFood(this.ctx, i, j);
    }
  }

  private drawSpriteItself() {
    if (!this.ctx) return;
    const wallThickness = 3;

    const image = new Image();
    image.src = spritePng;
    const [sx, sy, sw, sh] = this.crop;

    const direction = this.state.direction;
    const legsPosition = this.state.legsPosition;
    const crop: [number, number, number, number] = [
      sx + spriteAnimationPositions[direction][legsPosition],
      sy,
      sw / 8,
      sh,
    ];
    const dx = this.state.x + wallThickness;
    const dy = this.state.y + wallThickness;
    const dw = this.size - 2 * wallThickness;
    const dh = this.size - 2 * wallThickness;
    this.ctx.drawImage(...[image, ...crop, dx, dy, dw, dh]);
    spriteAnimationPositions[this.state.direction];
  }

  render(time: number | null) {
    if (!time) return;

    const legsPosition = Math.floor(time / 100) % 2 === 0 ? 0 : 1;
    this.setState({ legsPosition });

    this.drawPatch();

    this.drawSpriteItself();
  }
}
