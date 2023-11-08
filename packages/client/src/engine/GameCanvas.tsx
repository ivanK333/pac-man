import { FC, useState, useEffect, useRef } from 'react';

import Game from './Game';
import { blockSize, dimentions } from './config';
import { ICanvasProps } from './types';
import { map as layer } from './Map/levels/level_001';

const GameCanvas: FC<ICanvasProps> = (props: ICanvasProps) => {
  const { updateScore, updateLives, restart } = props;
  const [time, setTime] = useState<number | null>(null);
  const [map, setMap] = useState<number[][]>(layer);

  const [previousCherryAmount, setPreviousCherryAmount] = useState<number>(0);
  const [eatenBooster, setEatenBooster] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const gameSetTime = (time: number) => {
    setTime(time);
  };
  const gameSetMap = (map: number[][]) => {
    setMap(map);
  };

  const gameSetPreviousCherryAmount = (amount: number) => {
    setPreviousCherryAmount(amount);
  };

  const gameSetEatenBooster = (eatenBooster: boolean) => {
    setEatenBooster(eatenBooster);
  };

  const game = new Game({
    time,
    setTime: gameSetTime,
    map,
    setMap: gameSetMap,
    updateScore,
    updateLives,
    restart,
    dimentions,
    previousCherryAmount,
    gameSetPreviousCherryAmount,
    eatenBooster,
    gameSetEatenBooster,
  });

  /** create canvas and draw map */
  useEffect(() => {
    game.start(canvasRef.current!);
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
