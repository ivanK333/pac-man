import { Link, NavLink, useMatch } from 'react-router-dom';
import classNames from 'classnames';

import styles from './styles.module.scss';
import { ROUTES } from '../../constants/routes';
import fullScreenOn from '../../assets/images/fullscreen_on.svg';
import fullScreenOff from '../../assets/images/fullscreen-off.svg';
import { authController } from '../../controllers/AuthController';
import useFullScreen from '../../hooks/useFullSrceen';
import { useReadLocalStorage } from '../../hooks/useLocalStorage';

const Header = () => {
  const isAuthenticated = useReadLocalStorage('isAuthenticated');
  const match = useMatch({
    path: ROUTES.main.forum.root,
    end: false,
  });
  const classname = classNames(styles.link, {
    [styles.linkActive]: match,
  });

  const { logout } = authController();

  const handleLogout = () => {
    logout();
  };

  const { fullScreen, open } = useFullScreen();

  return (
    <header className={styles.header}>
      {isAuthenticated ? (
        <button className={styles.exitButton} onClick={handleLogout}>
          Log out
        </button>
      ) : null}
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <NavLink
            to={ROUTES.main.lending}
            className={({ isActive }) =>
              isActive ? styles.linkActive : styles.link
            }
          >
            About
          </NavLink>
        </li>
        <li className={styles.listItem}>
          <NavLink
            to={ROUTES.main.root}
            className={({ isActive }) =>
              isActive ? styles.linkActive : styles.link
            }
          >
            Game
          </NavLink>
        </li>
        <li className={styles.listItem}>
          <NavLink
            to={ROUTES.main.lead}
            className={({ isActive }) =>
              isActive ? styles.linkActive : styles.link
            }
          >
            Leaderboard
          </NavLink>
        </li>
        <li className={styles.listItemActive}>
          <NavLink
            to={ROUTES.main.profile}
            className={({ isActive }) =>
              isActive ? styles.linkActive : styles.link
            }
          >
            Profile
          </NavLink>
        </li>
        <li className={styles.listItem}>
          <Link to={ROUTES.main.forum.root} className={classname}>
            Forum
          </Link>
        </li>
      </ul>
      <img
        onClick={open}
        id="toggle_fullscreen"
        className={styles.fullscreen}
        src={fullScreen ? fullScreenOn : fullScreenOff}
        alt="fullscreen"
      />
    </header>
  );
};

export default Header;
