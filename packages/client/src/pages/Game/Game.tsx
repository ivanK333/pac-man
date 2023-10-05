import { useCallback, useState } from 'react';

import LoaderGame from '../LoaderGame/LoaderGame';
import GameOver from '../GameOver/GameOver';
import StartGame from '../StartGame/StartGame';
import GameCanvas from '../../engine/GameCanvas';
import styles from './styles.module.scss';
import { leaderboardController } from '../../controllers/LeaderboardController';

const delay = 2000;

const Game = () => {
  const [loader, setLoader] = useState<boolean>(true);
  const [start, setStart] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);
  const [attempts, setAttempts] = useState<number>(0);

  const { addUserToLeaderboard } = leaderboardController();

  const restartGame = useCallback(() => {
    setScore(0);
    setLives(3);
    setAttempts(attempts + 1);

    setStart(true);
  }, []);

  const startGame = useCallback(() => {
    setLoader(true);
    fakeLoader();
    setStart(true);
  }, []);

  const fakeLoader = useCallback(() => {
    setTimeout(() => {
      setLoader(false);
    }, delay);
  }, []);

  const updateScore = (score: number) => {
    setScore(score);
  };

  const updateLives = (lives: number) => {
    setLives(lives);

    if (lives <= 0) {
      addUserToLeaderboard(score);
    }
  };

  return (
    <>
      {!start && <StartGame startGame={startGame} />}

      {lives <= 0 && <GameOver restartGame={restartGame} />}

      {start && loader && <LoaderGame />}

      {start && !loader && lives > 0 && (
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
            <GameCanvas
              updateScore={updateScore}
              updateLives={updateLives}
              restart={attempts}
            />
          </div>
          <div>
            <p>Use arrows to control packman, space bar to kill pacman</p>
            <p>As a test can control Blinky with a w s z keys</p>
          </div>
        </div>
      )}
    </>
  );
};
export default Game;
