import styles from './styles.module.scss';
import TopicItem from '../../components/TopicItem/TopicItem';

type TTopicsProps = {
  handleOpenModal: () => void;
};

const Topics: React.FC<TTopicsProps> = ({ handleOpenModal }) => {
  return (
    <div className={styles.container}>
      <div className={styles.topics}>
        <div className={styles.topicList}>
          <div className={styles.buttonContainer}>
            <button onClick={handleOpenModal} className={styles.button}>
              Create a topic &gt;
            </button>
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
