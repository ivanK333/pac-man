import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import blueGhostImage from '../../assets/images/blueSprite.svg';
import addCommentImage from '../../assets/images/addCommentImage.png';

type TTopicItemProps = {
  id?: string;
  name?: string;
  count?: number;
};

const TopicItem: React.FC<TTopicItemProps> = ({
  id = 'test',
  name = 'test',
  count = 0,
}) => {
  return (
    <div className={styles.topic}>
      <div className={styles.imageContainer}>
        <img src={blueGhostImage} alt="Ghost" />
      </div>
      <div className={styles.content}>
        <p className={styles.text}>{name}</p>

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
