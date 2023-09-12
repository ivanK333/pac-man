import { useCallback, useEffect, useState } from 'react';

import LoaderGame from '../LoaderGame/LoaderGame';
import GameOver from '../GameOver/GameOver';
import StartGame from '../StartGame/StartGame';
import GameCanvas from '../../engine/GameCanvas';
import styles from './styles.module.scss';
const delay = 0;

const Game = () => {
  const [loader, setLoader] = useState<boolean>(true);
  const [start, setStart] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);

  // const restartGame = useCallback(() => {
  //   setLoader(true);
  //   // заглушка для отображения loader
  //   fakeLoader();
  // }, []);

  const startGame = useCallback(() => {
    setLives(3);
    setScore(0);
    setStart(true);
  }, []);

  // заглушка для отображения loader
  const fakeLoader = useCallback(() => {
    setTimeout(() => {
      setLoader(false);
    }, delay);
  }, []);

  // заглушка для отображения loader
  useEffect(() => {
    fakeLoader();
  }, []);

  const updateScore = (score: number) => {
    setScore(score);
  };

  const updateLives = (lives: number) => {
    setLives(lives);
  };

  return (
    <>
      {!start ? <StartGame startGame={startGame} /> : null}

      {loader && start ? <LoaderGame /> : null}

      {lives === 0 ? <GameOver restartGame={startGame} /> : null}

      {!loader && start && lives !== 0 && (
        <div className={styles.container}>
          <div className={styles.info}>
            <div className={styles.score}>
              <span>LEVEL: </span>
              <span>1</span>
            </div>
            <div className={styles.score}>
              <span>SCORE: </span>
              <span>{score}</span>
            </div>
            <div className={styles.score}>
              <span>LIVES: </span>
              <span>{lives}</span>
            </div>
          </div>

          <div className={styles.canvasContainer}>
            <GameCanvas updateScore={updateScore} updateLives={updateLives} />
          </div>
          <div>
            <p>Use arrows to control packman, Space will kill pacman</p>
            <p>As a test can control Blinky with a w s z keys</p>
          </div>
        </div>
        // <GameOver restartGame={restartGame} />
      )}
    </>
  );
};
export default Game;
