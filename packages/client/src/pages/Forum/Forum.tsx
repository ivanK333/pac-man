import { useState } from 'react';

import { Outlet } from 'react-router';
import { useMatch } from 'react-router-dom';
import classNames from 'classnames';

import styles from './styles.module.scss';
import { ROUTES } from '../../constants/routes';
import TopicsList from '../TopicsList/TopicsList';
import Modal from '../../components/Modal/Modal';
import TopicCreationForm from '../../components/TopicCreationForm/TopicCreationForm';
import { useReadLocalStorage } from '../../hooks/useLocalStorage';

const Forum = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const matchForumRoot = useMatch({ path: ROUTES.main.forum.root, end: true });
  const isForumRoot = Boolean(matchForumRoot);

  const isLightTheme = useReadLocalStorage('isLightTheme');
  const availableChangeThemeToDark = isLightTheme === 'true';

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <div
        className={classNames([styles.container], {
          [styles.container_light]: availableChangeThemeToDark,
        })}
      >
        {isForumRoot ? (
          <TopicsList handleOpenModal={handleOpenModal} />
        ) : (
          <Outlet />
        )}
      </div>
      {isOpenModal && (
        <Modal>
          <TopicCreationForm handleCloseModal={handleCloseModal} />
        </Modal>
      )}
    </>
  );
};

export default Forum;
