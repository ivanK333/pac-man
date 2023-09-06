import { useState, useEffect, useRef } from 'react';

import Game from './Game';
import Pacman from './Pacman';
import { MapProperties } from './variables';

const GameCanvas = () => {
  const [time, setTime] = useState<number | null>(null);
  const [direction, setDirection] = useState<string>('stop');
  const [nextDirection, setNextDirection] = useState<string>('stop');
  const [pacmanState, setPacmanState] = useState<Record<string, number>>({
    x: 1 * MapProperties.blockSize,
    y: 1 * MapProperties.blockSize,
    width: 20,
    height: 20,
    speed: 2,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const game = new Game({
    canvasRef,
    time,
    setTime,
    pacmanState,
    setPacmanState,
    direction,
    setDirection,
    nextDirection,
    setNextDirection,
  });

  const pacman = new Pacman({
    direction,
    nextDirection,
    pacmanState,
    setPacmanState,
    setDirection,
  });

  // launch game
  useEffect(() => {
    // launch game loop
    game.loop();

    // add/remove keyboard handler
    game.addKeyboardEventHendler();
    return game.removeKeyboardEventHendler();
  }, []);

  // launch canvas draw process depending of time
  useEffect(() => {
    game.redraw(canvasRef);
  }, [time]);

  // launch pacman move process depending of time
  useEffect(() => {
    pacman.moveProcess();
  }, [time]);

  return (
    <>
      <canvas ref={canvasRef} id="canvas" width="420" height="460"></canvas>
    </>
  );
};

export default GameCanvas;
