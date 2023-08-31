import { NavLink, useMatch } from 'react-router-dom';
import classNames from 'classnames';

import styles from './styles.module.scss';
import { ROUTES } from '../../constants/routes';
import Link from '../Link';

const Header = () => {
  const match = useMatch({
    path: ROUTES.main.forum.root,
    end: false,
  });
  const classname = classNames(styles.link, {
    [styles.linkActive]: match,
  });

  const handleLogout = () => {
    console.log('logout logic');
  };

  return (
    <header className={styles.header}>
      <button className={styles.exitButton} onClick={handleLogout}>
        Log out
      </button>
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
          <Link to={ROUTES.main.forum.root} className={classname}>
            Forum
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
