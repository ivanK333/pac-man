import { NavLink } from 'react-router-dom';

import styles from './styles.module.scss';
import { ROUTES } from '../../constants/routes';

const Header = () => {
  return (
    <header className={styles.header}>
      <ul className={styles.list}>
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
          <NavLink
            to={ROUTES.main.forum}
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
