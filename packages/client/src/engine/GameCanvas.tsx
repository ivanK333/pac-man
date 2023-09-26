import { FC, useState, useEffect, useRef } from 'react';

import Game from './Game';
import { map as layer } from './map/levels/level_001';
import { blockSize, dimentions } from './config';
import { ICanvasProps } from './types';

const GameCanvas: FC<ICanvasProps> = (props: ICanvasProps) => {
  const { updateScore, updateLives, restart } = props;
  const [time, setTime] = useState<number | null>(null);
  const [map, setMap] = useState<number[][]>(layer);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const game = new Game({
    time,
    setTime,
    map,
    setMap,
    updateScore,
    updateLives,
    restart,
    dimentions,
  });

  /** create canvas and draw map */
  useEffect(() => {
    game.start(canvasRef);
  }, [restart]);

  // keyboard handler
  useEffect(() => {
    // add/remove keyboard handler
    game.addKeyboardEventHendler();
    return game.removeKeyboardEventHendler();
  }, []);

  /** game runner */
  useEffect(() => {
    game.animatePacman();
    game.animateGhost();

    game.redraw();
  }, [time]);

  return (
    <canvas
      ref={canvasRef}
      id="canvas"
      width={`${dimentions[0] * blockSize}`}
      height={`${dimentions[1] * blockSize}`}
    ></canvas>
  );
};

export default GameCanvas;
