import styles from './styles.module.scss';
import TopicItem from '../../components/TopicItem/TopicItem';

const Topics = () => {
  return (
    <div className={styles.container}>
      <div className={styles.topics}>
        <div className={styles.topicList}>
          <div className={styles.buttonContainer}>
            <button className={styles.button}>Create a topic &gt;</button>
          </div>

          <TopicItem name="Pacman" />
          <TopicItem />
          <TopicItem />
          <TopicItem />
          <TopicItem />
          <TopicItem />
        </div>
      </div>
    </div>
  );
};

export default Topics;
