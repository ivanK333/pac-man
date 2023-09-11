import { countOccurrences } from './utils';
import { blockSize, MapElements, speed } from './config';
import { map as layer } from './Layers/layer_001';
import { Direction, getObstacles, updateMap } from './GameCanvas';
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
    expect(score).toEqual(7);
  });
});

describe('Тест создания класса Pacman', () => {
  let canvas, ctx: CanvasRenderingContext2D;
  beforeEach(function () {
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  });

  test('создается класс', () => {
    const pacman = new Pacman({
      size: blockSize,
      speed,
      startPosition: [10, 0],
      startDirection: Direction.Right,
    });

    expect(pacman).toBeDefined();
  });

  test('проверка начального направления движения', () => {
    const pacman = new Pacman({
      size: blockSize,
      speed,
      startPosition: [10, 0],
      startDirection: Direction.Right,
    });
    pacman.setContext(ctx);
    pacman.move();

    expect(pacman.direction).toBe(Direction.Right);
  });

  test('проверка начального положения Pacman на карте', () => {
    const pacman = new Pacman({
      size: blockSize,
      speed,
      startPosition: [10, 0],
      startDirection: Direction.Right,
    });
    pacman.setContext(ctx);
    pacman.move();

    expect(pacman.currentBlock).toEqual([10, 0]);
  });

  test('проверка изменения положения Pacman на карте', () => {
    const pacman = new Pacman({
      size: blockSize,
      speed,
      startPosition: [10, 0],
      startDirection: Direction.Right,
    });
    pacman.setContext(ctx);
    pacman.move();

    expect(pacman.direction).toBe(Direction.Right);
  });

  test('проверка изменения направления', () => {
    const pacman = new Pacman({
      size: blockSize,
      speed,
      startPosition: [10, 0],
      startDirection: Direction.Right,
    });
    pacman.setContext(ctx);
    pacman.move();

    expect(pacman.direction).toBe(Direction.Right);

    pacman.setDirection(Direction.Down);
    expect(pacman.direction).toBe(Direction.Down);

    pacman.setDirection(Direction.Up);
    expect(pacman.direction).toBe(Direction.Up);

    pacman.setDirection(Direction.Left);
    expect(pacman.direction).toBe(Direction.Left);

    pacman.setDirection(Direction.Right);
    expect(pacman.direction).toBe(Direction.Right);
  });

  test('проверка возможности изменения направления', () => {
    const pacman = new Pacman({
      size: blockSize,
      speed,
      startPosition: [10, 0],
      startDirection: Direction.Right,
    });
    pacman.setContext(ctx);
    pacman.move();

    expect(pacman.direction).toBe(Direction.Right);
    // Не должен менять направление, так как вверху и внизу стены(начальная позиция)
    pacman.setNextDirection(Direction.Down);
    pacman.move();
    expect(pacman.direction).toBe(Direction.Right);

    pacman.setNextDirection(Direction.Up);
    pacman.move();
    expect(pacman.direction).toBe(Direction.Right);
    // Должен изменить направление так как на пути Pacman'а нет стен
    pacman.setNextDirection(Direction.Left);
    pacman.move();
    expect(pacman.direction).toBe(Direction.Left);

    pacman.setNextDirection(Direction.Right);
    pacman.move();
    expect(pacman.direction).toBe(Direction.Right);
  });

  test('проверка изменения текущей позиции Pacman при движении вправо на 6 блоков', () => {
    const pacman = new Pacman({
      size: blockSize,
      speed,
      startPosition: [10, 0],
      startDirection: Direction.Right,
    });
    pacman.setContext(ctx);
    pacman.move();

    pacman.setSpeed(speed);

    pacman.setNextDirection(Direction.Right);

    for (let i = 0; i < 6 * 15 + 1; i++) {
      pacman.move();
    }

    expect(pacman.currentBlock).toEqual([10, 6]);
  });

  test('проверка на столкновение со стеной', () => {
    const pacman = new Pacman({
      size: blockSize,
      speed,
      startPosition: [10, 0],
      startDirection: Direction.Right,
    });

    pacman.setContext(ctx);
    pacman.move();

    pacman.setSpeed(speed);

    pacman.setNextDirection(Direction.Right);

    for (let i = 0; i < 10 * 15 + 1; i++) {
      const [i, j] = pacman.currentBlock;
      /** находит все стены вокруг ячейки */
      pacman.setRestrictions(getObstacles(i, j));
      pacman.move();
    }

    expect(pacman.currentBlock).toEqual([10, 7]);
  });

  test('проверка на столкновение со стеной и дальнейшее движение по карте и дальнейшее движение вниз на 5 клеток', () => {
    const pacman = new Pacman({
      size: blockSize,
      speed,
      startPosition: [10, 0],
      startDirection: Direction.Right,
    });
    pacman.setContext(ctx);
    pacman.move();

    pacman.setSpeed(speed);

    pacman.setNextDirection(Direction.Right);

    for (let i = 0; i < 10 * 15 + 1; i++) {
      const [i, j] = pacman.currentBlock;
      /** находит все стены вокруг ячейки */
      pacman.setRestrictions(getObstacles(i, j));
      pacman.move();
    }

    expect(pacman.currentBlock).toEqual([10, 7]);

    pacman.setNextDirection(Direction.Down);

    for (let i = 0; i < 10 * 15 + 1; i++) {
      const [i, j] = pacman.currentBlock;
      /** находит все стены вокруг ячейки */
      pacman.setRestrictions(getObstacles(i, j));
      pacman.move();
    }

    expect(pacman.currentBlock).toEqual([15, 7]);
  });
});
