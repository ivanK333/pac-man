import styles from './styles.module.scss';
import AvatarImage, { Size } from '../AvatarImage/AvatarImage';
import { TComment } from '../../api';
import { formatDateString } from '../../utils/dateFormatter';

type TCommentItemProps = {
  comment: TComment;
};

const CommentItem: React.FC<TCommentItemProps> = ({ comment }) => {
  const { createdAt, text, user } = comment;
  const { login, avatar } = user;
  return (
    <section className={styles.container}>
      <div className={styles.headingContainer}>
        <h5 className={styles.username}>{login}</h5>
        <p className={styles.time}>{formatDateString(createdAt)}</p>
      </div>
      <div className={styles.contentContainer}>
        <AvatarImage image={avatar} size={Size.small} />
        <div className={styles.textContainer}>
          <p className={styles.text}>{text}</p>
        </div>
      </div>
    </section>
  );
};

export default CommentItem;
