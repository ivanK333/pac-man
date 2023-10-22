import classNames from 'classnames';

import styles from './styles.module.scss';
import { setLocalStorage } from '../../utils/useReadLocalStorage';
import useCheckLightTheme from '../../hooks/useCheckLightTheme';

const ThemeToggle = () => {
  const { availableChangeThemeToDark } = useCheckLightTheme();

  const toggleTheme = () => {
    if (availableChangeThemeToDark) {
      setLocalStorage('isLightTheme', 'false');
    } else {
      setLocalStorage('isLightTheme', 'true');
    }
  };
  return (
    <>
      <input
        id="toggle"
        className={classNames(
          [styles.theme],
          {
            [styles.dark]: !availableChangeThemeToDark,
          },
          {
            [styles.light]: availableChangeThemeToDark,
          },
        )}
        onChange={toggleTheme}
        type="checkbox"
      />
    </>
  );
};

export default ThemeToggle;
