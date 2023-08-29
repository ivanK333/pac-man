import { useState } from 'react';

import { Outlet } from 'react-router';
import { useMatch } from 'react-router-dom';

import styles from './styles.module.scss';
import { ROUTES } from '../../constants/routes';
import Topics from '../Topics/Topics';
import Modal from '../../components/Modal/Modal';
import TopicCreationForm from '../../components/TopicCreationForm/TopicCreationForm';

const Forum = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const matchForumRoot = useMatch({ path: ROUTES.main.forum.root, end: true });
  const isForumRoot = Boolean(matchForumRoot);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };
  return (
    <>
      <div className={styles.container}>
        {isForumRoot ? (
          <Topics handleOpenModal={handleOpenModal} />
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
