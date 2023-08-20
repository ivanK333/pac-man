import { useEffect } from 'react';

import { useNavigate } from 'react-router';

import Button from '../../components/ButtonSubmit/Button';
import styles from './styles.module.scss';
import { ROUTES } from '../../constants/routes';

const GameOver = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handlerButtonRestart = (event: KeyboardEvent) => {
      if (event.key) {
        navigate(`/${ROUTES.main.game}`);
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
        <Button
          onClick={() => navigate(`/${ROUTES.main.game}`)}
          label="Restart"
        />
        <Button
          onClick={() => navigate(`/${ROUTES.main.lead}`)}
          label="Leaderboard"
        />
      </div>
    </div>
  );
};

export default GameOver;
