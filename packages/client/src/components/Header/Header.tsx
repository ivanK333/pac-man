// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NavLink } from 'react-router-dom';

import styles from './styles.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? styles.linkActive : styles.link
            }
          >
            Game
          </NavLink>
        </li>
        <li className={styles.listItem}>
          <NavLink
            to="/lead"
            className={({ isActive }) =>
              isActive ? styles.linkActive : styles.link
            }
          >
            Leaderboard
          </NavLink>
        </li>
        <li className={styles.listItemActive}>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? styles.linkActive : styles.link
            }
          >
            Profile
          </NavLink>
        </li>
        <li className={styles.listItem}>
          <NavLink
            to="/forum"
            className={({ isActive }) =>
              isActive ? styles.linkActive : styles.link
            }
          >
            Forum
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Header;
