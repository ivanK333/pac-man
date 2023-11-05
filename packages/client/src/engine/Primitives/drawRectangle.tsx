export const drawRectangle = (props: {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  width: number;
  height: number;
  strokeColor?: string;
  lineWidth?: number;
  fillColor?: string;
}) => {
  const { ctx, x, y, width, height, strokeColor, lineWidth, fillColor } = props;
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
