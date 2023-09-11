import { countOccurrences } from './utils';
import { blockSize, MapElements, speed } from './config';
import { map as layer } from './Layers/layer_001';
import { Direction, updateMap } from './GameCanvas';
import { Pacman } from './AnimatedCharacters/pacman';

describe('Тест поедания еды', () => {
  let foodAmount: number;
  let cherriesAmount: number;

  beforeEach(() => {
    foodAmount = countOccurrences(layer, MapElements.FOOD);
    cherriesAmount = countOccurrences(layer, MapElements.CHERRY);
  });

  test('съедает еду', () => {
    const map = [...layer];
    updateMap(10, 0, MapElements.NONE);
    const score =
      foodAmount -
      countOccurrences(map, MapElements.FOOD) +
      (cherriesAmount - countOccurrences(map, MapElements.CHERRY)) * 10;
    expect(score).toEqual(1);
  });

  test('съедает вишенку', () => {
    const map = [...layer];
    updateMap(2, 1, MapElements.NONE);
    const score =
      foodAmount -
      countOccurrences(map, MapElements.FOOD) +
      (cherriesAmount - countOccurrences(map, MapElements.CHERRY)) * 10;
    expect(score).toEqual(10);
  });
});

describe('Тест поедания ряда еды', () => {
  let foodAmount: number;
  let cherriesAmount: number;

  beforeEach(() => {
    foodAmount = countOccurrences(layer, MapElements.FOOD);
    cherriesAmount = countOccurrences(layer, MapElements.CHERRY);
  });

  test('съедает ряд еды и проходит обратно', () => {
    const map = [...layer];
    for (let i = 0; i < 8; i++) {
      updateMap(10, i, MapElements.NONE);
    }

    for (let i = 7; i >= 0; i--) {
      updateMap(10, i, MapElements.NONE);
    }

    const score =
      foodAmount -
      countOccurrences(map, MapElements.FOOD) +
      (cherriesAmount - countOccurrences(map, MapElements.CHERRY)) * 10;
    expect(score).toEqual(8);
  });
});

describe('Тест создания класса Pacman', () => {
  let canvas, ctx;
  beforeEach(function () {
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
  });
  test('создается класс', () => {
    const pacman = new Pacman({
      size: blockSize,
      speed,
      startPosition: [10, 0],
      startDirection: Direction.Right,
    });
    expect(pacman.startDirection).toBe(Direction.Right);
  });
});
