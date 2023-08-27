import { Outlet } from 'react-router';
import { NavLink } from 'react-router-dom';

import styles from './styles.module.scss';

const Forum = () => {
  return (
    <>
      <div className={styles.container}>
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
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Forum;
