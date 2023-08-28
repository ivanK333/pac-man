import { Outlet } from 'react-router';
import { useMatch } from 'react-router-dom';

import styles from './styles.module.scss';
import { ROUTES } from '../../constants/routes';
import Topics from '../Topics/Topics';

const Forum = () => {
  const matchForumRoot = useMatch({ path: ROUTES.main.forum.root, end: true });
  const isForumRoot = Boolean(matchForumRoot);
  return (
    <>
      <div
        className={isForumRoot ? styles.container : styles.containerWithImage}
      >
        {isForumRoot ? <Topics /> : <Outlet />}
      </div>
    </>
  );
};

export default Forum;
