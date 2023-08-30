import styles from './styles.module.scss';
import AvatarImage, { Size } from '../AvatarImage/AvatarImage';

type TCommentItemProps = {
  userName: string;
  time: string;
  avatar: string;
  comment: string;
  id: string;
};

const CommentItem: React.FC<TCommentItemProps> = ({
  userName,
  time,
  avatar,
  comment,
  id,
}) => {
  console.log(id);
  return (
    <section className={styles.container}>
      <div className={styles.headingContainer}>
        <h5 className={styles.username}>{userName}</h5>
        <p className={styles.time}>{time}</p>
      </div>
      <div className={styles.contentContainer}>
        <AvatarImage image={avatar} size={Size.small} />
        <div className={styles.textContainer}>
          <p className={styles.text}>{comment}</p>
        </div>
      </div>
    </section>
  );
};

export default CommentItem;
