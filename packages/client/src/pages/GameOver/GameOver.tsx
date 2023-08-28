import { useCallback, useEffect } from 'react';

import { useNavigate } from 'react-router';

import Button from '../../components/ButtonSubmit/Button';
import styles from './styles.module.scss';
import { ROUTES } from '../../constants/routes';

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

  useEffect(() => {
    const handlerButtonRestart = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        restartGame();
      }
    };

    document.addEventListener('keydown', handlerButtonRestart);
    return () => {
      document.removeEventListener('keydown', handlerButtonRestart);
    };
  }, []);

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
