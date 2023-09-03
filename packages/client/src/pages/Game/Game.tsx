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

  return (
    <div className={styles.container}>
      <p className={styles.score}>{score}</p>
      <div className={styles.canvasContainer}>
        <GameCanvas updateScore={updateScore} />
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
