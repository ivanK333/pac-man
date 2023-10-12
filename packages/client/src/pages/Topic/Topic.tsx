import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router';

import { forumController } from '../../controllers/ForumController';
import styles from './styles.module.scss';
import blueGhost from '../../assets/images/blueSprite.svg';
import TopicForm from '../../components/TopicForm/TopicForm';
import TopicMessage from '../../components/TopicMessage/TopicMessage';
import { TTopic } from '../../api';

export type TTopicForm = { message: string };

const Topic = () => {
  const { id } = useParams();
  const history = useNavigate();
  const { leaveMessage, getTopicById } = forumController();

  const [topic, setTopic] = useState<TTopic | null>(null);

  useEffect(() => {
    const getTopic = async () => {
      const response = await getTopicById(id as string);
      if (response?.data) {
        setTopic(response.data);
      }
    };
    getTopic();
  }, []);

  const submitMessage = async (data: TTopicForm) => {
    const response = await leaveMessage({ ...data, topicId: id as string });
    if (topic && response?.data) {
      const updatedTopic: TTopic = {
        ...topic,
        messages: [response.data, ...(topic?.messages || [])],
      };
      setTopic(updatedTopic);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <div className={styles.headingContainer}>
          <h3 className={styles.heading}>{topic && topic.topicName}</h3>
          <img className={styles.image} src={blueGhost} alt="ghost" />
        </div>

        <button onClick={() => history(-1)} className={styles.backButton}>
          Back &gt;
        </button>
      </div>

      <div className={styles.messages}>
        <div className={styles.formContainer}>
          <TopicForm
            onSubmit={submitMessage}
            placeholder="Enter your message"
          />
        </div>
        <div className={styles.messageList}>
          {topic?.messages?.map((message) => (
            <TopicMessage message={message} key={message.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Topic;
