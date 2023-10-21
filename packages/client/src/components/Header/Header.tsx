import { useEffect, useState } from 'react';

import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import styles from './styles.module.scss';
import { ROUTES } from '../../constants/routes';
import fullScreenOn from '../../assets/images/fullscreen_on.png';
import fullScreenOff from '../../assets/images/fullscreen_off.png';
import { logout, useAppDispatch } from '../../store';
import useFullScreen from '../../hooks/useFullSrceen';
import { useReadLocalStorage } from '../../hooks/useLocalStorage';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import useCheckLightTheme from '../../hooks/useCheckLightTheme';

const Header = () => {
  const [render, setRender] = useState(false);

  const isAuthenticated = useReadLocalStorage('isAuthenticated');

  const { availableChangeThemeToDark } = useCheckLightTheme();

  const { fullScreen, open } = useFullScreen();

  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await dispatch(logout());
  };

  useEffect(() => {
    setRender(true);
  }, []);

  if (!render) {
    return <></>;
  }

  return (
    <header
      className={classNames(
        [styles.header],
        { [styles.header_light]: availableChangeThemeToDark },
        { [styles.header_noauth]: !isAuthenticated },
      )}
    >
      <section className={styles.edition}>
        <ThemeToggle />
        {isAuthenticated && (
          <button className={styles.exitButton} onClick={handleLogout}>
            Log out
          </button>
        )}
      </section>
      <ul className={styles.list}>
        <li>
          <NavLink
            to={ROUTES.main.lending}
            className={({ isActive }) =>
              isActive ? styles.linkActive : styles.link
            }
          >
            About
          </NavLink>
        </li>
        {!isAuthenticated && (
          <li>
            <NavLink
              to={ROUTES.auth.login}
              className={({ isActive }) =>
                isActive ? styles.linkActive : styles.link
              }
            >
              Auth
            </NavLink>
          </li>
        )}
        {isAuthenticated && (
          <>
            {' '}
            <li>
              <NavLink
                to={ROUTES.main.root}
                className={({ isActive }) =>
                  isActive ? styles.linkActive : styles.link
                }
              >
                Game
              </NavLink>
            </li>
            <li>
              <NavLink
                to={ROUTES.main.profile}
                className={({ isActive }) =>
                  isActive ? styles.linkActive : styles.link
                }
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to={ROUTES.main.forum.root}
                className={({ isActive }) =>
                  isActive ? styles.linkActive : styles.link
                }
              >
                Forum
              </NavLink>
            </li>
            <li>
              <NavLink
                to={ROUTES.main.lead}
                className={({ isActive }) =>
                  isActive ? styles.linkActive : styles.link
                }
              >
                Leaderboard
              </NavLink>
            </li>
          </>
        )}
      </ul>
      {isAuthenticated && (
        <img
          onClick={open}
          id="toggle_fullscreen"
          className={styles.fullscreen}
          src={fullScreen ? fullScreenOn : fullScreenOff}
          alt="fullscreen"
        />
      )}
    </header>
  );
};

export default Header;
