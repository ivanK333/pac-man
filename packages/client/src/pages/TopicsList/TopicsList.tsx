import styles from './styles.module.scss';
import TopicItem from '../../components/TopicItem/TopicItem';
import { fakeTopics } from '../../constants/fakeTopics';

type TTopicsProps = {
  handleOpenModal: () => void;
};

const TopicsList: React.FC<TTopicsProps> = ({ handleOpenModal }) => {
  return (
    <div className={styles.container}>
      <div className={styles.topicList}>
        <div className={styles.buttonContainer}>
          <button onClick={handleOpenModal} className={styles.button}>
            Create a topic &gt;
          </button>
        </div>
        {fakeTopics.map((topic) => (
          <TopicItem
            name={topic.topicName}
            count={topic.messages.length}
            id={topic.id}
            key={topic.id}
          />
        ))}
      </div>
    </div>
  );
};

export default TopicsList;
