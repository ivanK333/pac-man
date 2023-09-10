import { updateMap } from './GameCanvas';
import { MapElements } from './config';

describe('Тест логики изменения карты', () => {
  let map: number[][];

  beforeEach(() => {
    map = [[2, 2, 2, 2]];
  });

  test('изменение карты', () => {
    const newMap = [[0, 0, 0, 0]];
    for (let i = 0; i < 4; i++) {
      updateMap(0, i, MapElements.NONE, map);
    }
    expect(map).toEqual(newMap);
  });
});
