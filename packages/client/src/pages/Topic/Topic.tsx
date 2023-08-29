import { useNavigate, useParams } from 'react-router';

import styles from './styles.module.scss';
import blueGhost from '../../assets/images/blueSprite.svg';
import TopicForm from '../../components/TopicForm/TopicForm';
import TopicMessage from '../../components/TopicMessage/TopicMessage';
import { fakeTopics } from '../../constants/fakeTopics';

export type TTopicForm = { message: string };

const Topic = () => {
  const { id } = useParams();
  const history = useNavigate();

  const handleSubmit = (data: TTopicForm) => {
    console.log(data, id);
  };

  const topic = fakeTopics.find((topic) => topic.id === id);
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
            onSubmit={handleSubmit}
            placeholder="Enter your message"
            autoFocus={true}
          />
        </div>
        <div className={styles.messageList}>
          {topic &&
            topic.messages &&
            topic.messages.map((message) => (
              <TopicMessage
                message={message.message}
                image={message.user.avatar}
                time="12:33"
                username={message.user.name}
                comments={message.comments}
                key={message.id}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Topic;
