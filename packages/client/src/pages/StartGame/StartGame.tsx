import { useNavigate } from 'react-router';

import logo from '../../assets/images/logo.svg';
import play from '../../assets/images/play.svg';
import { ROUTES } from '../../constants/routes';
import { useEventListener } from '../../hooks/useEventListener';
import styles from './styles.module.scss';
const StartGame = () => {
  const navigate = useNavigate();

  const goToGame = () => {
    navigate(`/${ROUTES.main.game}`);
  };

  const handlerButtonRestart = (event: Event) => {
    if (event instanceof KeyboardEvent) {
      if (event.key === 'Enter') {
        navigate(`/${ROUTES.main.game}`);
      }
    }
  };

  useEventListener({
    eventName: 'keydown',
    handler: handlerButtonRestart,
    container: window,
  });

  return (
    <div className={styles.container}>
      <img src={logo} alt="logo" className={styles.logo} />

      <button className={styles.button} onClick={goToGame}>
        <img src={play} alt={play} />
      </button>
    </div>
  );
};

export default StartGame;
