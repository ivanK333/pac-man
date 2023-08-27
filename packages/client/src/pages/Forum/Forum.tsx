import { Outlet } from 'react-router';
import { NavLink, useMatch } from 'react-router-dom';

import styles from './styles.module.scss';
import { ROUTES } from '../../constants/routes';
import Topics from '../Topics/Topics';

const Forum = () => {
  const match = useMatch({ path: ROUTES.main.forum.root, end: true });
  const isForumRoot = Boolean(match);
  return (
    <>
      <div
        className={isForumRoot ? styles.container : styles.containerWithImage}
      >
        <ul className={styles.forumNavigation}>
          <li>
            <NavLink
              to="/forum/"
              className={({ isActive }) =>
                isActive ? styles.linkActive : styles.link
              }
            >
              Forum
            </NavLink>
          </li>
          <li>
            <NavLink
              to="about"
              className={({ isActive }) =>
                isActive ? styles.linkActive : styles.link
              }
            >
              About us
            </NavLink>
          </li>

          <li>
            <NavLink
              to="tech"
              className={({ isActive }) =>
                isActive ? styles.linkActive : styles.link
              }
            >
              Technologies
            </NavLink>
          </li>
        </ul>
        <div className={styles.outlet}>
          <>{isForumRoot ? <Topics /> : <Outlet />}</>
        </div>
      </div>
    </>
  );
};

export default Forum;
