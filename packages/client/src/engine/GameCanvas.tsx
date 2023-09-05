import { useState, useEffect, useRef } from 'react';

import game from './Game';
import pacman from './Pacman';
import { Direction, KeyCode, MapPropertys } from './variables';

const GameCanvas = () => {
  const [time, setTime] = useState<number | null>(null);
  const [direction, setDirection] = useState<string>('stop');
  const [nextDirection, setNextDirection] = useState<string>('stop');
  const [pacmanState, setPacmanState] = useState<Record<string, number>>({
    x: 1 * MapPropertys.blockSize,
    y: 1 * MapPropertys.blockSize,
    width: 20,
    height: 20,
    speed: 2,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // keyboard handler
  useEffect(() => {
    const keyboardHandler = (e: KeyboardEvent) => {
      switch (e.code) {
        case KeyCode.right:
          setNextDirection(() => Direction.right);
          break;
        case KeyCode.left:
          setNextDirection(() => Direction.left);
          break;
        case KeyCode.up:
          setNextDirection(() => Direction.up);
          break;
        case KeyCode.down:
          setNextDirection(() => Direction.down);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', keyboardHandler);
    return () => window.removeEventListener('keydown', keyboardHandler);
  }, []);

  // launch game loop
  useEffect(() => {
    game.loop(setTime);
  }, []);

  // launch canvas draw process depending of time
  useEffect(() => {
    const context = canvasRef.current!.getContext('2d');
    game.redraw(context!, setPacmanState, pacmanState, canvasRef);
  }, [time]);

  // launch pacman move process depending of time
  useEffect(() => {
    pacman.moveProcess(
      direction,
      nextDirection,
      pacmanState,
      setPacmanState,
      setDirection,
    );
  }, [time]);

  return (
    <>
      <canvas ref={canvasRef} id="canvas" width="420" height="460"></canvas>
    </>
  );
};

export default GameCanvas;
