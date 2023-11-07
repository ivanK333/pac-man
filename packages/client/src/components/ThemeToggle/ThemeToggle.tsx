import classNames from 'classnames';

import styles from './styles.module.scss';
import { setLocalStorage } from '../../utils/useReadLocalStorage';
import useCheckLightTheme from '../../hooks/useCheckLightTheme';
import useUserId from '../../hooks/useUserId';
import { userAPI } from '../../api/user';

const { updateTheme } = userAPI();

const ThemeToggle = () => {
  const { isLightTheme } = useCheckLightTheme();
  const { userId } = useUserId();

  const updateThemeInDB = async () => {
    if (!userId) {
      alert('There was an error saving theme settings!');
      return;
    }
    const res = await updateTheme({
      id: userId,
      lightTheme: !isLightTheme,
    });
    if (res?.status === 200) {
      console.log(
        `Updated theme is light ${!isLightTheme} for user ID ${userId}`,
      );
    } else {
      alert('There was an error saving theme settings!');
    }
  };

  const toggleTheme = () => {
    setLocalStorage('isLightTheme', (!isLightTheme).toString());
    updateThemeInDB();
  };

  return (
    <>
      <input
        id="toggle"
        className={classNames(
          [styles.theme],
          {
            [styles.dark]: !isLightTheme,
          },
          {
            [styles.light]: isLightTheme,
          },
        )}
        onChange={toggleTheme}
        type="checkbox"
      />
    </>
  );
};

export default ThemeToggle;
