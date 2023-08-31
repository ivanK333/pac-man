export const drawCircle = (props: {
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
