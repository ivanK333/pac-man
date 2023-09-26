import {
  backGroundColor,
  blockSize,
  wallCollor,
  wallSpaceWidth,
  wallOffset,
  wallInnerColor,
  cherrySize,
  foodSize,
  foodCollor,
  MapElements,
} from '../config';

class Draw {
  public drawRectangle = (props: {
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    width: number;
    height: number;
    strokeColor?: string;
    lineWidth?: number;
    fillColor?: string;
  }) => {
    const { ctx, x, y, width, height, strokeColor, lineWidth, fillColor } =
      props;
    if (fillColor) {
      ctx.fillStyle = fillColor;
      ctx.fillRect(x, y, width, height);
    }
    if (strokeColor || lineWidth) {
      if (strokeColor) ctx.strokeStyle = strokeColor;
      if (lineWidth) ctx.lineWidth = lineWidth;
      ctx.strokeRect(x, y, width, height);
    }
  };

  public drawCircle = (props: {
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    radius: number;
    strokeColor?: string;
    fillColor?: string;
  }) => {
    const { ctx, x, y, radius, strokeColor, fillColor } = props;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.closePath();
    if (strokeColor) {
      ctx.strokeStyle = strokeColor;
      ctx.stroke();
    }
    if (fillColor) {
      ctx.fillStyle = fillColor;
      ctx.fill();
    }
  };

  public drawSimpleFood = (
    ctx: CanvasRenderingContext2D,
    i: number,
    j: number,
  ) =>
    this.drawRectangle({
      ctx,
      x: j * blockSize + (blockSize - foodSize) / 2,
      y: i * blockSize + (blockSize - foodSize) / 2,
      width: foodSize,
      height: foodSize,
      fillColor: foodCollor,
    });

  public drawCherry = (ctx: CanvasRenderingContext2D, i: number, j: number) => {
    const x = j * blockSize + blockSize / 2;
    const y = i * blockSize + blockSize / 2;
    // Cherry body
    ctx.beginPath();
    ctx.arc(x, y + cherrySize / 3, cherrySize / 2, 0, Math.PI * 2); // Outer circle
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();

    // Stem
    ctx.beginPath();
    ctx.moveTo(x, y - cherrySize / 2 + cherrySize / 3);
    ctx.lineTo(x + cherrySize / 6, y - cherrySize / 2);
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.closePath();
  };

  public drawBackground = (ctx: CanvasRenderingContext2D) => {
    this.drawRectangle({
      ctx,
      x: 0,
      y: 0,
      width: ctx.canvas.width,
      height: ctx.canvas.height,
      fillColor: backGroundColor,
    });
  };

  public drawBlank = (ctx: CanvasRenderingContext2D, i: number, j: number) =>
    this.drawRectangle({
      ctx,
      x: j * blockSize,
      y: i * blockSize,
      width: blockSize,
      height: blockSize,
      fillColor: backGroundColor,
    });

  public drawFood = (ctx: CanvasRenderingContext2D, map: number[][]) => {
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[0].length; j++) {
        if (map[i][j] === MapElements.FOOD) {
          this.drawSimpleFood(ctx, i, j);
        }
        if (map[i][j] === MapElements.CHERRY) {
          this.drawCherry(ctx, i, j);
        }
      }
    }
  };

  public drawWalls = (ctx: CanvasRenderingContext2D, map: number[][]) => {
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[0].length; j++) {
        if (map[i][j] === MapElements.WALL) {
          this.drawRectangle({
            ctx,
            x: j * blockSize,
            y: i * blockSize,
            width: blockSize,
            height: blockSize,
            fillColor: wallCollor,
          });
        }
        if (j > 0 && map[i][j - 1] === MapElements.WALL) {
          this.drawRectangle({
            ctx,
            x: j * blockSize,
            y: i * blockSize + wallOffset,
            width: wallSpaceWidth + wallOffset,
            height: wallSpaceWidth,
            fillColor: wallInnerColor,
          });
        }
        if (j < map[0].length - 1 && map[i][j + 1] === MapElements.WALL) {
          this.drawRectangle({
            ctx,
            x: j * blockSize + wallOffset,
            y: i * blockSize + wallOffset,
            width: wallSpaceWidth + wallOffset,
            height: wallSpaceWidth,
            fillColor: wallInnerColor,
          });
        }
        if (i < map.length - 1 && map[i + 1][j] === MapElements.WALL) {
          this.drawRectangle({
            ctx,
            x: j * blockSize + wallOffset,
            y: i * blockSize + wallOffset,
            width: wallSpaceWidth,
            height: wallSpaceWidth + wallOffset,
            fillColor: wallInnerColor,
          });
        }
        if (i > 0 && map[i - 1][j] === MapElements.WALL) {
          this.drawRectangle({
            ctx,
            x: j * blockSize + wallOffset,
            y: i * blockSize,
            width: wallSpaceWidth,
            height: wallSpaceWidth + wallOffset,
            fillColor: wallInnerColor,
          });
        }
      }
    }
  };
}

const draw = new Draw();

export default draw;
