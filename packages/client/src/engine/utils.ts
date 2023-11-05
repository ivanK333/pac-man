import { MapElements } from './config';

export const countOccurrences = (
  matrix: number[][],
  target: number,
): number => {
  return matrix.reduce((count, row) => {
    return (
      count +
      row.reduce((innerCount, value) => {
        return innerCount + (value === target ? 1 : 0);
      }, 0)
    );
  }, 0);
};

export const checkFood = (matrix: number[][], i: number, j: number): boolean =>
  matrix[i][j] === MapElements.FOOD;

export const eatFood = (
  matrix: number[][],
  i: number,
  j: number,
): number[][] => {
  matrix[i][j] = 0;
  return matrix;
};
