import classNames from 'classnames';

import { useReadLocalStorage } from '../../hooks/useLocalStorage';
import styles from './styles.module.scss';

const DOTS_NUMBER = 8;
const LoaderGame = () => {
  const isLightTheme = useReadLocalStorage('isLightTheme');
  const availableChangeThemeToDark = isLightTheme === 'true';

  return (
    <div
      className={classNames([styles.container], {
        [styles.container_light]: availableChangeThemeToDark,
      })}
    >
      <div className={styles.loaderContainer}>
        <div className={styles.sprite} />
        <div className={styles.pacman} />
        <ul className={styles.dots}>
          {new Array(DOTS_NUMBER).fill(null).map((_, index) => (
            <li key={`dot-${index}`} className={styles.dot} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LoaderGame;
