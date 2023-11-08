import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import styles from './styles.module.scss';
import blueGhost from '../../assets/images/blueSprite.svg';
import TopicForm from '../../components/TopicForm/TopicForm';
import TopicMessage from '../../components/TopicMessage/TopicMessage';
import { TTopicWithMEssages, forumAPI } from '../../api';
import { useWebSocket, socketUrl } from '../../hooks/webSocketHook';

export type TTopicForm = { message: string };

const Topic = () => {
  const { send, readyState } = useWebSocket({ socketUrl });
  const { id } = useParams();
  const history = useNavigate();
  const { leaveMessage, getTopicWithMessages } = forumAPI();

  const [topic, setTopic] = useState<TTopicWithMEssages | null>(null);

  useEffect(() => {
    const getTopic = async () => {
      const response = await getTopicWithMessages(id as string);

      if (response?.data) {
        setTopic(response.data);
      }
    };
    getTopic();
  }, []);

  const submitMessage = async (data: any) => {
    const { message: text } = data;
    const response = await leaveMessage({ text, topicId: id as string });

    if (topic && response?.data) {
      const updatedTopic: TTopicWithMEssages = {
        ...topic,
        messages: [response.data, ...(topic?.messages || [])],
      };
      setTopic(updatedTopic);

      // send webSocket Notifications
      if (readyState) {
        const message = {
          type: 'New message',
          content: response.data,
        };
        send(message);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <div className={styles.headingContainer}>
          <h3 className={styles.heading}>{topic && topic.title}</h3>
          <img className={styles.image} src={blueGhost} alt="ghost" />
        </div>

        <button onClick={() => history(-1)} className={styles.backButton}>
          Back &gt;
        </button>
      </div>

      <div className={styles.messages}>
        <div className={styles.topicMainMessage}>
          {topic ? (
            <TopicMessage
              message={{
                createdAt: topic.createdAt,
                id: topic.id,
                user: { ...topic.user },
                ownerId: topic.ownerId,
                text: topic.text,
                updatedAt: topic.updatedAt,
              }}
              withForm={false}
            />
          ) : null}
        </div>
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
