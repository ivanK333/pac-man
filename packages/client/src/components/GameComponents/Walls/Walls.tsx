// Draw walls and passages using the this.matrix
// import { isEqual } from 'lodash';

import { MapMatrix } from '../types';

export function drawWalls(
  ctx: CanvasRenderingContext2D,
  matrix: MapMatrix,
  cellSize: number,
  color: string,
  strokeSize = 5,
) {
  const wallDrawer = new WallDrawer(ctx, matrix, strokeSize, cellSize, color);

  wallDrawer.render();
}

type Pattern = (number | undefined)[][];
type Drawer = (x: number, y: number) => void;

/** compare 3x3 matrices of neighbours */
const isEqual = (pattern: Pattern, inQuestion: Pattern) => {
  const matches: boolean[] = [];
  for (let row = 0; row < pattern.length; row++) {
    for (let col = 0; col < pattern[row].length; col++) {
      if (pattern[row][col] === undefined) {
        matches.push(true);
      } else if (pattern[row][col] === inQuestion[row][col]) {
        matches.push(true);
      } else {
        matches.push(false);
      }
    }
  }
  return matches.every((value) => value);
};

const getCellValue = (matrix: MapMatrix, row: number, col: number) => {
  if (row < 0 || col < 0) return 0;
  if (row > matrix.length - 1 || col > matrix[row].length - 1) return 0;
  if (matrix[row][col] === 4) return 1;
  return 0;
};

const rect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string,
) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, size, size);
};

const dot = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string,
) => {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x + size / 2, y + size / 2, 1, 0, 2 * Math.PI);
  ctx.fill();
};

const replaceNonFourWithZero = (matrix: number[][]): number[][] => {
  // console.log('=====>', matrix);
  return matrix.map((row) => row.map((val) => (val === 4 ? val : 0)));
};

const rotateMatrix90 = (matrix: Pattern): Pattern => {
  const rows = matrix.length;
  const cols = matrix[0].length;

  const rotated: Pattern = [];

  for (let col = 0; col < cols; col++) {
    const newRow: (number | undefined)[] = [];
    for (let row = rows - 1; row >= 0; row--) {
      newRow.push(matrix[row][col]);
    }
    rotated.push(newRow);
  }
  // const rotated = matrix.map((row) => row.map((col) => ))

  return rotated;
};

const rotatematrix180 = (matrix: Pattern): Pattern => {
  return rotateMatrix90(rotateMatrix90(matrix));
};

class WallDrawer {
  ctx: CanvasRenderingContext2D;
  matrix: MapMatrix;
  strokeSize: number;
  cellSize: number;
  strokeColor: string;
  patterns: { patterns: Pattern[]; func: Drawer }[];

  constructor(
    ctx: CanvasRenderingContext2D,
    matrix: MapMatrix,
    strokeSize: number,
    cellSize: number,
    strokeColor: string,
  ) {
    this.ctx = ctx;
    this.matrix = matrix;
    this.strokeSize = strokeSize;
    this.cellSize = cellSize;
    this.strokeColor = strokeColor;
    this.patterns = this.getPatterns();
  }

  static readonly SEGMENTS = {
    vert: WallDrawer.prototype.drawVerticalLine,
    hor: WallDrawer.prototype.drawHorizontalLine,
    cornerLT: WallDrawer.prototype.drawCornerLT,
    cornerRT: WallDrawer.prototype.drawCornerRT,
    cornerRB: WallDrawer.prototype.drawCornerRB,
    cornerLB: WallDrawer.prototype.drawCornerLB,
  };

  getPatterns(): { patterns: Pattern[]; func: Drawer }[] {
    const verts = [
      [
        [undefined, 1, undefined],
        [0, 1, 0],
        [undefined, 1, undefined],
      ],
      [
        [1, 1, 0],
        [1, 1, 0],
        [1, 1, 0],
      ],
      [
        [0, 1, 1],
        [0, 1, 1],
        [0, 1, 1],
      ],
      [
        [0, 1, 1],
        [0, 1, 1],
        [1, 1, 1],
      ],
      [
        [1, 1, 0],
        [1, 1, 0],
        [1, 1, 1],
      ],
      [
        [1, 1, 1],
        [1, 1, 0],
        [1, 1, 0],
      ],
      [
        [1, 1, 1],
        [0, 1, 1],
        [0, 1, 1],
      ],
      [
        [1, 1, 1],
        [0, 1, 1],
        [1, 1, 1],
      ],
      [
        [1, 1, 1],
        [1, 1, 0],
        [1, 1, 1],
      ],
    ];

    const hors = verts.map((v) => rotateMatrix90(v));

    const cornersRT = [
      [
        [0, 0, 0],
        [1, 1, 0],
        [undefined, 1, 0],
      ],
      [
        [1, 1, 0],
        [1, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 0, 0],
        [1, 1, 0],
        [1, 1, 1],
      ],
      [
        [1, 0, 0],
        [1, 1, 0],
        [1, 1, 0],
      ],
      [
        [undefined, undefined, undefined],
        [1, 1, 1],
        [0, 1, 1],
      ],
    ];

    const cornersRB = cornersRT.map((v) => rotateMatrix90(v));
    const cornersLB = cornersRB.map((v) => rotateMatrix90(v));
    const cornersLT = cornersLB.map((v) => rotateMatrix90(v));

    return [
      { patterns: verts, func: WallDrawer.SEGMENTS.vert },
      { patterns: hors, func: WallDrawer.SEGMENTS.hor },
      { patterns: cornersRT, func: WallDrawer.SEGMENTS.cornerRT },
      { patterns: cornersRB, func: WallDrawer.SEGMENTS.cornerRB },
      { patterns: cornersLB, func: WallDrawer.SEGMENTS.cornerLB },
      { patterns: cornersLT, func: WallDrawer.SEGMENTS.cornerLT },
    ];
  }

  render() {
    const matrix = replaceNonFourWithZero(this.matrix);
    this.ctx.lineWidth = this.strokeSize;

    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[row].length; col++) {
        if (matrix[row][col] === 4) {
          /** get cell top left corner */
          const x = col * this.cellSize;
          const y = row * this.cellSize;
          /** get drawer */
          const drawer = this.getDrawer(row, col);
          if (drawer) {
            drawer(x, y);
          }
        }
      }
    }
  }

  getDrawer(row: number, col: number) {
    const matrix = replaceNonFourWithZero(this.matrix);

    /** get 3x3 matrix of neighbours */
    const inQuestion = [row - 1, row, row + 1].map((r) =>
      [col - 1, col, col + 1].map((c) => getCellValue(matrix, r, c)),
    );

    /** get which pattern set has a match */
    const match = this.patterns.filter((obj) =>
      obj.patterns.map((p) => isEqual(p, inQuestion)).some((value) => value),
    )[0];

    if (match) {
      return match.func.bind(this);
    }
    /** last check for theloose ends  */
    if (row === matrix.length - 1) return this.drawVerticalLine.bind(this);
    if (col === matrix[row].length - 1)
      return this.drawHorizontalLine.bind(this);
    // return this.drawDummmy.bind(this);
  }

  drawDummmy(x: number, y: number) {
    rect(this.ctx, x, y, this.cellSize, 'pink');
    dot(this.ctx, x, y, this.cellSize, 'red');
  }

  drawVerticalLine(x: number, y: number) {
    // rect(this.ctx, x, y, this.cellSize, 'yellow');
    this.ctx.strokeStyle = this.strokeColor;
    this.ctx.beginPath();
    this.ctx.moveTo(x + this.cellSize / 2, y);
    this.ctx.lineTo(x + this.cellSize / 2, y + this.cellSize);
    this.ctx.stroke();
    // dot(this.ctx, x, y, this.cellSize, 'red');
  }

  drawHorizontalLine(x: number, y: number) {
    // rect(this.ctx, x, y, this.cellSize, 'yellow');

    this.ctx.beginPath();
    this.ctx.moveTo(x, y + this.cellSize / 2);
    this.ctx.lineTo(x + this.cellSize, y + this.cellSize / 2);
    this.ctx.stroke();
    // dot(this.ctx, x, y, this.cellSize, 'red');
  }

  drawCornerLT(x: number, y: number) {
    // rect(this.ctx, x, y, this.cellSize, 'yellow');
    this.ctx.beginPath();
    this.ctx.moveTo(x + this.cellSize / 2, y + this.cellSize);
    this.ctx.lineTo(x + this.cellSize / 2, y + this.cellSize / 2);
    this.ctx.lineTo(x + this.cellSize, y + this.cellSize / 2);
    this.ctx.stroke();
    // dot(this.ctx, x, y, this.cellSize, 'red');
  }

  drawCornerRT(x: number, y: number) {
    // rect(this.ctx, x, y, this.cellSize, 'yellow');
    this.ctx.beginPath();
    this.ctx.moveTo(x + this.cellSize / 2, y + this.cellSize);
    this.ctx.lineTo(x + this.cellSize / 2, y + this.cellSize / 2);
    this.ctx.lineTo(x, y + this.cellSize / 2);
    this.ctx.stroke();
    // dot(this.ctx, x, y, this.cellSize, 'red');
  }

  drawCornerRB(x: number, y: number) {
    // rect(this.ctx, x, y, this.cellSize, 'yellow');
    this.ctx.beginPath();
    this.ctx.moveTo(x + this.cellSize / 2, y);
    this.ctx.lineTo(x + this.cellSize / 2, y + this.cellSize / 2);
    this.ctx.lineTo(x, y + this.cellSize / 2);
    this.ctx.stroke();
    // dot(this.ctx, x, y, this.cellSize, 'red');
  }

  drawCornerLB(x: number, y: number) {
    // rect(this.ctx, x, y, this.cellSize, 'yellow');
    this.ctx.beginPath();
    this.ctx.moveTo(x + this.cellSize / 2, y);
    this.ctx.lineTo(x + this.cellSize / 2, y + this.cellSize / 2);
    this.ctx.lineTo(x + this.cellSize, y + this.cellSize / 2);
    this.ctx.stroke();
    // dot(this.ctx, x, y, this.cellSize, 'red');
  }
}

// this.ctx.beginPath();
// this.ctx.moveTo(x + this.cellSize / 2, y);
// this.ctx.lineTo(x + this.cellSize / 2, y + this.cellSize / 2);
// this.ctx.arc(x + this.cellSize, y + this.cellSize / 2, this.cellSize / 2, -Math.PI / 2, 0);
// this.ctx.stroke();
