import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import blueGhostImage from '../../assets/images/blueSprite.svg';
import addCommentImage from '../../assets/images/addCommentImage.png';
import { TTopicHeader } from '../../api';

type TTopicItemProps = {
  topic: TTopicHeader;
};

const TopicItem: React.FC<TTopicItemProps> = ({ topic }) => {
  const { topicName, count, id } = topic;
  return (
    <div className={styles.topic}>
      <div className={styles.imageContainer}>
        <img src={blueGhostImage} alt="Ghost" />
      </div>
      <div className={styles.content}>
        <p className={styles.text}>{topicName}</p>

        <div className={styles.topicGroup}>
          <p className={styles.counter}>{count}</p>
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
