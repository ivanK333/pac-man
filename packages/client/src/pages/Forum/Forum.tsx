import { useEffect, useState } from 'react';

import { Outlet } from 'react-router';
import { useMatch } from 'react-router-dom';

import styles from './styles.module.scss';
import { ROUTES } from '../../constants/routes';
import Modal from '../../components/Modal/Modal';
import TopicCreationForm from '../../components/TopicCreationForm/TopicCreationForm';
import { forumController } from '../../controllers/ForumController';
import { TCreateTopic, TTopic } from '../../api';
import TopicItem from '../../components/TopicItem/TopicItem';

const Forum = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const matchForumRoot = useMatch({ path: ROUTES.main.forum.root, end: true });
  const isForumRoot = Boolean(matchForumRoot);

  const { getAllTopics, createTopic } = forumController();

  const [topics, setTopics] = useState<TTopic[]>([]);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  useEffect(() => {
    const getTopics = async () => {
      const response = await getAllTopics();
      //   {
      //     "id": "5b6c908c-9337-4caf-a93e-a357706917b9",
      //     "title": "test",
      //     "text": "test",
      //     "owner_id": "550e8400-e29b-41d4-a716-446655440000\n",
      //     "owner_login": "test",
      //     "owner_avatar": "test",
      //     "createdAt": "2023-10-13T11:18:40.832Z",
      //     "updatedAt": "2023-10-13T11:18:40.832Z"
      // }
      if (response?.data) {
        console.log(response.data);
        setTopics(response.data);
      }
    };

    getTopics();
  }, []);

  const submitTopic = async (data: TCreateTopic) => {
    const response = await createTopic(data);
    if (response?.data) {
      setTopics([response.data, ...topics]);
      handleCloseModal();
    }
  };

  return (
    <>
      <div className={styles.container}>
        {isForumRoot ? (
          <div className={styles.listContainer}>
            <div className={styles.topicList}>
              <div className={styles.buttonContainer}>
                <button onClick={handleOpenModal} className={styles.button}>
                  Create a topic &gt;
                </button>
              </div>
              {topics.length === 0 && <p>No topics yet</p>}

              {topics.length > 0 &&
                topics.map((topic) => (
                  <TopicItem topic={topic} key={topic.id} />
                ))}
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
      {isOpenModal && (
        <Modal>
          <TopicCreationForm
            onSubmit={submitTopic}
            handleCloseModal={handleCloseModal}
          />
        </Modal>
      )}
    </>
  );
};

export default Forum;
