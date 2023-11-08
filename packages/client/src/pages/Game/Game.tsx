import { useCallback, useRef, useState } from 'react';

import classNames from 'classnames';

import LoaderGame from '../LoaderGame/LoaderGame';
import GameOver from '../GameOver/GameOver';
import StartGame from '../StartGame/StartGame';
import GameCanvas from '../../engine/GameCanvas';
import MuteButton from '../../components/MuteButton/MuteButton';
import { SoundEffects, Sounds } from '../../engine/Sound/sound';
import styles from './styles.module.scss';
import { leaderboardController } from '../../controllers/LeaderboardController';
import useCheckLightTheme from '../../hooks/useCheckLightTheme';

const delay = 2000;

const Game = () => {
  const [loader, setLoader] = useState<boolean>(true);
  const [start, setStart] = useState<boolean>(false);
  const [mute, setMute] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);
  const [attempts, setAttempts] = useState<number>(0);
  const [sounds, setSounds] = useState<Sounds | null>(null);

  const { isLightTheme } = useCheckLightTheme();

  const { addUserToLeaderboard } = leaderboardController();

  const restartGame = useCallback(() => {
    setScore(0);
    setLives(3);
    setAttempts(attempts + 1);

    startGame();
  }, []);

  const startGame = useCallback(() => {
    setLoader(true);
    fakeLoader();
    setStart(true);
  }, []);

  const fakeLoader = useCallback(async () => {
    const volume = mute ? 0 : 1;
    const audioContext = new window.AudioContext();
    const sounds = new Sounds(audioContext);
    setSounds(sounds);

    sounds
      .loadSounds()
      .then(() => {
        sounds.setVolume(volume);
        sounds.playSound(SoundEffects.Beginning);
      })
      .catch((error) => {
        console.error('Error loading sound effect:', error);
      });

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

  const toggleMute = () => {
    setMute((prevMute) => !prevMute);
    const volume = mute ? 1 : 0;
    sounds?.setVolume(volume);
  };

  return (
    <>
      {!start && <StartGame startGame={startGame} />}

      {lives <= 0 && <GameOver restartGame={restartGame} />}

      {start && loader && <LoaderGame />}

      {start && !loader && lives > 0 && (
        <div
          className={classNames([styles.container], {
            [styles.container_light]: isLightTheme,
          })}
        >
          <div className={styles.muteButton}>
            <MuteButton mute={mute} onClick={toggleMute} />
          </div>

          <div className={styles.info}>
            <span>LEVEL: </span>
            <span>1</span>

            <span>SCORE: </span>
            <span className={styles.score}>{score}</span>

            <span>LIVES: </span>
            {Array.from({ length: 3 }, (_, index) => (
              <span
                className={classNames([styles.hearts], {
                  [styles.hidden]: index >= lives,
                })}
                key={index}
              >
                &hearts;
              </span>
            ))}
          </div>

          <div className={styles.canvasContainer}>
            <GameCanvas
              updateScore={updateScore}
              updateLives={updateLives}
              restart={attempts}
              sounds={sounds}
            />
          </div>
        </div>
      )}
    </>
  );
};
export default Game;
