import styles from './styles.module.scss';
import AvatarImage from '../AvatarImage/AvatarImage';
import TopicForm from '../TopicForm/TopicForm';
import { TTopicForm } from '../../pages/Topic/Topic';

type TTopicMessageProps = {
  image: string;
  username: string;
  message: string;
  time: string;
};

const TopicMessage: React.FC<TTopicMessageProps> = ({
  image,
  username,
  message,
  time,
}) => {
  const handleSubmit = (data: TTopicForm) => {
    console.log(data);
  };
  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <p className={styles.username}>{username}</p>
        <p className={styles.time}>{time}</p>
      </div>
      <div className={styles.userContainer}>
        <AvatarImage image={image} />
        <div className={styles.messageContainer}>
          <p className={styles.message}>{message}</p>
          <div className={styles.comments}>
            <TopicForm
              placeholder="Enter a comment"
              autoFocus={false}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicMessage;
