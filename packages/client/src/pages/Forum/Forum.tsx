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

  const { getTopics, createTopic } = forumController();

  const [topics, setTopics] = useState<TTopic[]>([]);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  useEffect(() => {
    const getTopicsInfo = async () => {
      const res = await getTopics();
      if (res?.data) {
        console.log('Forum getTopics===>', res.data);
        setTopics(res.data);
      }
    };

    getTopicsInfo();
  }, []);

  const submitTopic = async (data: TCreateTopic) => {
    const res = await createTopic(data);
    if (res?.data) {
      setTopics([res.data, ...topics]);
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
