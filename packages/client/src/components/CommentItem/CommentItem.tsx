import styles from './styles.module.scss';
import AvatarImage, { Size } from '../AvatarImage/AvatarImage';
import { TComment } from '../../api';

type TCommentItemProps = {
  comment: TComment;
};

const CommentItem: React.FC<TCommentItemProps> = ({ comment }) => {
  const { createdAt, user } = comment;
  const { avatar, name: userName } = user;
  return (
    <section className={styles.container}>
      <div className={styles.headingContainer}>
        <h5 className={styles.username}>{userName}</h5>
        <p className={styles.time}>{createdAt}</p>
      </div>
      <div className={styles.contentContainer}>
        <AvatarImage image={avatar} size={Size.small} />
        <div className={styles.textContainer}>
          <p className={styles.text}>{comment.comment}</p>
        </div>
      </div>
    </section>
  );
};

export default CommentItem;
