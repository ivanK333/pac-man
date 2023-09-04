import { useCallback } from 'react';

import { useNavigate } from 'react-router';

import Button from '../../components/ButtonSubmit/Button';
import styles from './styles.module.scss';
import { ROUTES } from '../../constants/routes';
import { useEventListener } from '../../hooks/useEventListener';

type Props = {
  restartGame: () => void;
};

const GameOver = ({ restartGame: reset }: Props) => {
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
    <div className={styles.container}>
      <h1 className={styles.title}>GAME OVER</h1>

      <div className={styles.buttonWrapper}>
        <Button onClick={restartGame} label="Restart" />

        <Button onClick={goToLeaderboard} label="Leaderboard" />
      </div>
    </div>
  );
};

export default GameOver;
