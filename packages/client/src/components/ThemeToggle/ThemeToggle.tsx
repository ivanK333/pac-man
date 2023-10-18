import classNames from 'classnames';

import styles from './styles.module.scss';
import { useReadLocalStorage } from '../../hooks/useLocalStorage';
import { readLocalStorage } from '../../utils/useReadLocalStorage';

const ThemeToggle = () => {
  const isLightTheme = useReadLocalStorage('isLightTheme');
  const availableChangeThemeToDark = isLightTheme === 'true';

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
