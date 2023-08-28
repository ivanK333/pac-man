import { useParams } from 'react-router';

import styles from './styles.module.scss';
import blueGhost from '../../assets/images/blueSprite.svg';
import TopicForm from '../../components/TopicForm/TopicForm';
import TopicItem from '../../components/TopicItem/TopicItem';

const Topic = () => {
  const { id } = useParams();
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <div className={styles.headingContainer}>
          <h3 className={styles.heading}>Pacman</h3>
          <img className={styles.image} src={blueGhost} alt="ghost" />
        </div>

        <button className={styles.backButton}>Back &gt;</button>
      </div>

      <div className={styles.messages}>
        <div className={styles.messageList}></div>
      </div>
    </div>
  );
};

export default Topic;
