import classNames from 'classnames';

import styles from './styles.module.scss';
import { readLocalStorage } from '../../utils/useReadLocalStorage';
import useCheckLightTheme from '../../hooks/useCheckLightTheme';

const ThemeToggle = () => {
  const { availableChangeThemeToDark, isLightTheme } = useCheckLightTheme();

  const toggleTheme = () => {
    if (isLightTheme === 'true') {
      readLocalStorage('isLightTheme', 'false');
    } else {
      readLocalStorage('isLightTheme', 'true');
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
        onChange={() => toggleTheme()}
        type="checkbox"
      />
    </>
  );
};

export default ThemeToggle;
