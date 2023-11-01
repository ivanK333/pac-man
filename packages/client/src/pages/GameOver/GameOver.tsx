import { useCallback } from 'react';

import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import styles from './styles.module.scss';
import { ROUTES } from '../../constants/routes';
import { useEventListener } from '../../hooks/useEventListener';
import Button from '../../components/ButtonSubmit/Button';
import useCheckLightTheme from '../../hooks/useCheckLightTheme';

type Props = {
  restartGame: () => void;
};

const GameOver = ({ restartGame: reset }: Props) => {
  const { availableChangeThemeToDark } = useCheckLightTheme();

  const navigate = useNavigate();

  const restartGame = useCallback(() => {
    reset();
  }, [reset]);

  const goToLeaderboard = useCallback(() => {
    navigate(`/${ROUTES.main.lead}`);
  }, []);

  const handlerButtonRestart = useCallback((event: Event) => {
    if (event instanceof KeyboardEvent && event.key === 'Enter') {
      restartGame();
    }
  }, []);

  useEventListener({
    eventName: 'keydown',
    handler: handlerButtonRestart,
    container: window,
  });

  return (
    <div
      className={classNames([styles.container], {
        [styles.container_light]: availableChangeThemeToDark,
      })}
    >
      <h1 className={styles.title}>GAME OVER</h1>
      <div className={styles.buttonWrapper}>
        <Button onClick={restartGame} label="Restart" />
        <Button onClick={goToLeaderboard} label="Leaderboard" />
      </div>
    </div>
  );
};

export default GameOver;
