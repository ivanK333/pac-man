export const eatFood = (
  matrix: number[][],
  i: number,
  j: number,
): number[][] => {
  matrix[i][j] = 0;
  return matrix;
};
