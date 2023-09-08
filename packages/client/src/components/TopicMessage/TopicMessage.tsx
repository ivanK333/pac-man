import { useState } from 'react';

import styles from './styles.module.scss';
import AvatarImage from '../AvatarImage/AvatarImage';
import TopicForm from '../TopicForm/TopicForm';
import { TTopicForm } from '../../pages/Topic/Topic';
import CommentItem from '../CommentItem/CommentItem';
import { TComment } from '../../constants/fakeTopics';

type TTopicMessageProps = {
  image: string;
  username: string;
  message: string;
  time: string;
  comments: TComment[];
};

const TopicMessage: React.FC<TTopicMessageProps> = ({
  image,
  username,
  message,
  time,
  comments,
}) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const handleSubmit = (data: TTopicForm) => {
    console.log(data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <h4 className={styles.username}>{username}</h4>
        <p className={styles.time}>{time}</p>
      </div>
      <div className={styles.userContainer}>
        <AvatarImage image={image} />
        <div className={styles.messageContainer}>
          <p className={styles.message}>{message}</p>
          <div className={styles.buttonContainer}>
            <p
              className={styles.commentsLength}
              onClick={() => {
                setIsShow(!isShow);
              }}
            >
              {comments && comments.length > 0
                ? `${comments.length} comment(s).`
                : 'leave a comment.'}
              <span className={styles.span}>{isShow ? 'hide' : 'show'}</span>
            </p>
          </div>

          {isShow && (
            <div className={styles.comments}>
              {comments && comments.length
                ? comments.map((comment) => (
                    <CommentItem
                      comment={comment.comment}
                      avatar={comment.user.avatar}
                      userName={comment.user.name}
                      time={comment.time}
                      id={comment.id}
                      key={comment.id}
                    />
                  ))
                : null}

              <TopicForm
                placeholder="Enter a comment"
                onSubmit={handleSubmit}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopicMessage;
