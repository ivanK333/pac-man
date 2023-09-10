import { countOccurrences } from './utils';
import { MapElements } from './config';
import { map as layer } from './Layers/layer_001';
import { updateMap } from './GameCanvas';

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
