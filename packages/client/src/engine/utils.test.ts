import { getObstacles, updateMap } from './GameCanvas';
import { MapElements } from './config';
import { map as layer } from './Layers/layer_001';
describe('Тест логики изменения карты', () => {
  let map: number[][];

  beforeEach(() => {
    map = [[2, 2, 2, 2]];
  });

  test('изменение карты', () => {
    const newMap = [[0, 0, 0, 0]];
    for (let i = 0; i < 4; i++) {
      updateMap(map, 0, i, MapElements.NONE);
    }
    expect(map).toEqual(newMap);
  });
});

describe('Тест функции getObstacles', () => {
  test('Проверка в начальной позиции', () => {
    const map = [...layer];
    const result = getObstacles(map, 10, 1);
    expect(result.left).toEqual(true);
    expect(result.right).toEqual(true);
    expect(result.up).toEqual(false);
    expect(result.down).toEqual(false);
    expect(result.stop).toEqual(false);
  });

  test('Проверка в [10, 7]', () => {
    const map = [...layer];
    const result = getObstacles(map, 10, 7);
    expect(result.left).toEqual(true);
    expect(result.right).toEqual(false);
    expect(result.up).toEqual(true);
    expect(result.down).toEqual(true);
    expect(result.stop).toEqual(false);
  });

  test('Проверка в [15, 7]', () => {
    const map = [...layer];
    const result = getObstacles(map, 15, 7);
    expect(result.left).toEqual(true);
    expect(result.right).toEqual(true);
    expect(result.up).toEqual(true);
    expect(result.down).toEqual(false);
    expect(result.stop).toEqual(false);
  });

  test('Проверка в [10, 10]', () => {
    const map = [...layer];
    const result = getObstacles(map, 10, 10);
    expect(result.left).toEqual(false);
    expect(result.right).toEqual(false);
    expect(result.up).toEqual(false);
    expect(result.down).toEqual(false);
    expect(result.stop).toEqual(false);
  });
});
