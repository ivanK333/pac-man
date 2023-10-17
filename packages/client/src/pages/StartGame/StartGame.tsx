import classNames from 'classnames';

import logo from '../../assets/images/logo.svg';
import play from '../../assets/images/play.svg';
import styles from './styles.module.scss';
import { useEventListener } from '../../hooks/useEventListener';
import { useReadLocalStorage } from '../../hooks/useLocalStorage';

type Props = {
  startGame: () => void;
};

const StartGame = ({ startGame }: Props) => {
  const handlerButtonRestart = (event: Event) => {
    if (event instanceof KeyboardEvent && event.key === 'Enter') {
      startGame();
    }
  };

  useEventListener({
    eventName: 'keydown',
    handler: handlerButtonRestart,
    container: window,
  });

  const isLightTheme = useReadLocalStorage('isLightTheme');
  const availableChangeThemeToDark = isLightTheme === 'true';

  return (
    <div
      className={classNames([styles.container], {
        [styles.container_light]: availableChangeThemeToDark,
      })}
    >
      <img src={logo} alt="logo" className={styles.logo} />

      <button className={styles.button} onClick={startGame}>
        <img src={play} alt={play} />
      </button>
    </div>
  );
};

export default StartGame;
