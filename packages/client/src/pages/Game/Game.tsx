import { useCallback, useEffect, useState } from 'react';

import LoaderGame from '../LoaderGame/LoaderGame';
import GameOver from '../GameOver/GameOver';
import StartGame from '../StartGame/StartGame';
import GameCanvas from '../../engine/GameCanvas';
import styles from './styles.module.scss';

const Game = () => {
  const [loader, setLoader] = useState<boolean>(true);
  const [start, setStart] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);

  const restartGame = useCallback(() => {
    setLoader(true);
    // заглушка для отображения loader
    fakeLoader();
  }, []);

  const startGame = useCallback(() => {
    setStart(true);
  }, []);

  // заглушка для отображения loader
  const fakeLoader = useCallback(() => {
    setTimeout(() => {
      setLoader(false);
    }, 5000);
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
    </div>
    // <>
    //   {!start ? <StartGame startGame={startGame} /> : null}

    //   {loader && start ? (
    //     <LoaderGame />
    //   ) : (
    //     <GameOver restartGame={restartGame} />
    //   )}
    // </>
  );
};
export default Game;
