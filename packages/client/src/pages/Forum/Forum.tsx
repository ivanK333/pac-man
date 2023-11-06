import { useEffect, useState } from 'react';

import { Outlet, useMatch } from 'react-router-dom';
import classNames from 'classnames';

import styles from './styles.module.scss';
import { ROUTES } from '../../constants/routes';
import Modal from '../../components/Modal/Modal';
import TopicCreationForm from '../../components/TopicCreationForm/TopicCreationForm';
import { TCreateTopic, TTopic, forumAPI } from '../../api';
import TopicItem from '../../components/TopicItem/TopicItem';
import useCheckLightTheme from '../../hooks/useCheckLightTheme';
import useWebSocket from '../../utils/webSocketHook';

const Forum = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const matchForumRoot = useMatch({ path: ROUTES.main.forum.root, end: true });
  const isForumRoot = Boolean(matchForumRoot);

  const { availableChangeThemeToDark } = useCheckLightTheme();

  const { getTopics, createTopic } = forumAPI();

  const [topics, setTopics] = useState<TTopic[]>([]);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  // use our hook
  const ws = useWebSocket({
    socketUrl: 'ws://localhost:3005',
  });

  // receive messages
  useEffect(() => {
    if (ws.data) {
      const { message } = ws.data;
      console.log(message);
    }
  }, [ws.data]);

  // useEffect(() => {
  //   const socket = new WebSocket('ws://localhost:3005');

  //   socket.onopen = () => {
  //     console.log('WebSocket connection established');
  //   };

  //   socket.onmessage = (event) => {
  //     console.log('Message received from server:', event.data);
  //   };

  //   return () => {
  //     socket.close();
  //   };
  // }, []);

  useEffect(() => {
    const getTopicsInfo = async () => {
      const res = await getTopics();
      if (res?.data) {
        setTopics(res.data);
      }
    };

    // const unlisten = history.listen(() => {
    getTopicsInfo();
    // });

    // return () => {
    //   unlisten();
    // };
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
      <div
        className={classNames([styles.container], {
          [styles.container_light]: availableChangeThemeToDark,
        })}
      >
        {isForumRoot ? (
          <div className={styles.listContainer}>
            <div className={styles.topicList}>
              <div className={styles.buttonContainer}>
                <button className={styles.button} onClick={handleOpenModal}>
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
