import { useState } from 'react';

import styles from './styles.module.scss';
import AvatarImage from '../AvatarImage/AvatarImage';
import TopicForm from '../TopicForm/TopicForm';
import { TTopicForm } from '../../pages/Topic/Topic';
import CommentItem from '../CommentItem/CommentItem';
import { TComment, TMessage, forumAPI } from '../../api';
import { formatDateString } from '../../utils/dateFormatter';

type TTopicMessageProps = {
  message: TMessage;
};

const TopicMessage: React.FC<TTopicMessageProps> = ({ message }) => {
  // console.log('message: ', message);
  const { id, text, ownerAvatar, ownerLogin, commentsCount, createdAt } =
    message;
  const comments: TComment[] = [];

  const { leaveComment, getComments } = forumAPI();

  const [isShow, setIsShow] = useState<boolean>(false);
  const [thisComments, setThisComments] = useState<TComment[]>(comments);
  const commentsNumber = Math.max(thisComments.length, parseInt(commentsCount));
  const hasComments = commentsNumber > 0;

  const submitComment = async (data: TTopicForm) => {
    const { message: text } = data;
    const response = await leaveComment({ text, messageId: id as string });
    if (response?.data) {
      const updatedComments: TComment[] = [...thisComments, response.data];
      setThisComments(updatedComments);
    }
  };

  const loadComments = async () => {
    const response = await getComments(id as string);
    if (response?.data) {
      setThisComments(response.data);
    }
  };

  const toggleShow = () => {
    setIsShow(!isShow);
    if (thisComments.length === 0) {
      loadComments();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <h4 className={styles.username}>{ownerLogin}</h4>
        <p className={styles.time}>{formatDateString(createdAt)}</p>
      </div>
      <div className={styles.userContainer}>
        <AvatarImage image={ownerAvatar} />
        <div className={styles.messageContainer}>
          <p className={styles.message}>{text}</p>
          <div className={styles.buttonContainer}>
            <p className={styles.commentsLength} onClick={toggleShow}>
              {hasComments
                ? `${commentsNumber} comment${commentsNumber > 1 ? 's' : ''}.`
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
