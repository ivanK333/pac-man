import { dimentions } from './config';
import Game from './Game';
import { map as testMap } from './map/levels/level_001';

describe('Тест класса GameCanvas', () => {
  let time: number | null = null;
  let setMap: (map: number[][]) => void;
  let setTime: (time: number) => void;
  let updateLives: (lives: number) => void;
  let updateScore: (score: number) => void;
  let score: number;
  let lives: number;
  let layer: number[][];
  let canvas, ctx: CanvasRenderingContext2D;
  beforeEach(() => {
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    layer = [...testMap];
    time = null;
    score = 0;
    lives = 3;
    setMap = (map: number[][]) => {
      layer = map;
    };
    setTime = (data: number) => {
      time = data;
    };
    updateScore = (data: number) => {
      score = data;
    };
    updateLives = (data: number) => {
      lives = data;
    };
  });

  test('создается класс', () => {
    const game = new Game({
      time,
      setTime,
      map: layer,
      setMap,
      updateScore,
      updateLives,
      restart: 0,
      dimentions,
    });

    expect(game).toBeDefined();
  });
});
