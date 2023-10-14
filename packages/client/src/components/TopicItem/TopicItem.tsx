import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import blueGhostImage from '../../assets/images/blueSprite.svg';
import addCommentImage from '../../assets/images/addCommentImage.png';
import { TTopic } from '../../api';

type TTopicItemProps = {
  topic: TTopic;
};

const TopicItem: React.FC<TTopicItemProps> = ({ topic }) => {
  const { id, title, messagesCount } = topic;
  return (
    <div className={styles.topic}>
      <div className={styles.imageContainer}>
        <img src={blueGhostImage} alt="Ghost" />
      </div>
      <div className={styles.content}>
        <p className={styles.text}>{title}</p>

        <div className={styles.topicGroup}>
          <p className={styles.counter}>{messagesCount}</p>
          <Link to={`topic/${id}`}>
            <img
              className={styles.linkImage}
              src={addCommentImage}
              alt="link"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopicItem;
