import styles from './styles.module.scss';
import AvatarImage, { Size } from '../AvatarImage/AvatarImage';

const CommentItem = () => {
  return (
    <div className={styles.container}>
      <div className={styles.headingContainer}>
        <h5 className={styles.username}>Username</h5>
        <p className={styles.time}>12:55</p>
      </div>
      <div className={styles.contentContainer}>
        <AvatarImage image="" size={Size.small} />
        <div className={styles.textContainer}>
          <p className={styles.text}>Super comment from superuser</p>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
