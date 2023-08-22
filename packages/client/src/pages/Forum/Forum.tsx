import styles from './styles.module.scss';
import Link from '../../components/Link';

const Forum = () => {
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <h4 className={styles.heading}>Forum</h4>
        <Link to="games">
          <p className={styles.text}>New games</p>
        </Link>
        <Link to="designers">
          <p className={styles.text}>Game designers</p>
        </Link>
        <Link to="tech">
          <p className={styles.text}>Technologies</p>
        </Link>
      </div>

      <div className={styles.contentContainer}>
        <h4 className={styles.heading}>Topics</h4>
        <div className={styles.topicContainer}>
          <p className={styles.topicText}>100</p>
        </div>

        <div className={styles.topicContainer}>
          <p className={styles.topicText}>100</p>
        </div>

        <div className={styles.topicContainer}>
          <p className={styles.topicText}>100</p>
        </div>
      </div>

      <div className={styles.contentContainer}>
        <h4 className={styles.heading}>Discussions</h4>
        <p className={styles.counter}>234</p>
        <p className={styles.counter}>50</p>
        <p className={styles.counter}>8</p>
      </div>
    </div>
  );
};

export default Forum;
