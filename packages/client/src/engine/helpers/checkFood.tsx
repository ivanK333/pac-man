import { MapElements } from '../config';

export const checkFood = (matrix: number[][], i: number, j: number): boolean =>
  matrix[i][j] === MapElements.FOOD;
