import { useState } from 'react';

import { forumController } from '../../controllers/ForumController';
import styles from './styles.module.scss';
import AvatarImage from '../AvatarImage/AvatarImage';
import TopicForm from '../TopicForm/TopicForm';
import { TTopicForm } from '../../pages/Topic/Topic';
import CommentItem from '../CommentItem/CommentItem';
import { TComment, TMessage } from '../../api';

type TTopicMessageProps = {
  message: TMessage;
};

const TopicMessage: React.FC<TTopicMessageProps> = ({ message }) => {
  const { id, createdAt, comments, user } = message;
  const { avatar, name } = user;
  const { leaveComment } = forumController();

  const [isShow, setIsShow] = useState<boolean>(false);
  const [thisComments, setThisComments] = useState<TComment[]>(comments);
  const hasComments = thisComments && thisComments.length > 0;

  const submitComment = async (data: TTopicForm) => {
    const response = await leaveComment({ ...data, messageId: id as string });
    if (response?.data) {
      const updatedComments: TComment[] = [response.data, ...thisComments];
      setThisComments(updatedComments);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <h4 className={styles.username}>{name}</h4>
        <p className={styles.time}>{createdAt}</p>
      </div>
      <div className={styles.userContainer}>
        <AvatarImage image={avatar} />
        <div className={styles.messageContainer}>
          <p className={styles.message}>{message.message}</p>
          <div className={styles.buttonContainer}>
            <p
              className={styles.commentsLength}
              onClick={() => {
                setIsShow(!isShow);
              }}
            >
              {hasComments
                ? `${thisComments.length} comment(s).`
                : 'leave a comment.'}
              <span className={styles.span}>{isShow ? 'hide' : 'show'}</span>
            </p>
          </div>

          {isShow && (
            <div className={styles.comments}>
              {hasComments
                ? thisComments.map((comment) => (
                    <CommentItem comment={comment} key={comment.id} />
                  ))
                : null}

              <TopicForm
                placeholder="Enter a comment"
                onSubmit={submitComment}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopicMessage;
