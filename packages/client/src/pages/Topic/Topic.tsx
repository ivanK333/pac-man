import { useNavigate, useParams } from 'react-router';

import styles from './styles.module.scss';
import blueGhost from '../../assets/images/blueSprite.svg';
import TopicForm from '../../components/TopicForm/TopicForm';
import TopicMessage from '../../components/TopicMessage/TopicMessage';

export type TTopicForm = { message: string };

const Topic = () => {
  const { id } = useParams();
  const history = useNavigate();

  const handleSubmit = (data: TTopicForm) => {
    console.log(data, id);
  };
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <div className={styles.headingContainer}>
          <h3 className={styles.heading}>Pacman</h3>
          <img className={styles.image} src={blueGhost} alt="ghost" />
        </div>

        <button onClick={() => history(-1)} className={styles.backButton}>
          Back &gt;
        </button>
      </div>

      <div className={styles.messages}>
        <div className={styles.formContainer}>
          <TopicForm
            onSubmit={handleSubmit}
            placeholder="Enter your message"
            autoFocus={true}
          />
        </div>
        <div className={styles.messageList}>
          <TopicMessage
            message="test"
            image=""
            time="12:33"
            username="20lettersloginlength"
          />
          <TopicMessage
            message="test"
            image=""
            time="12:33"
            username="20LETTERSLOGINLENGTH"
          />
          <TopicMessage
            /* eslint-disable-next-line max-len */
            message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            image=""
            time="12:33"
            username="test"
          />
          <TopicMessage message="test" image="" time="12:33" username="test" />
          <TopicMessage message="test" image="" time="12:33" username="test" />
          <TopicMessage message="test" image="" time="12:33" username="test" />
          <TopicMessage message="test" image="" time="12:33" username="test" />
          <TopicMessage message="test" image="" time="12:33" username="test" />
          <TopicMessage message="test" image="" time="12:33" username="test" />
          <TopicMessage message="test" image="" time="12:33" username="test" />
          <TopicMessage message="test" image="" time="12:33" username="test" />
          <TopicMessage message="test" image="" time="12:33" username="test" />
          <TopicMessage message="test" image="" time="12:33" username="test" />
          <TopicMessage message="test" image="" time="12:33" username="test" />
          <TopicMessage message="test" image="" time="12:33" username="test" />
        </div>
      </div>
    </div>
  );
};

export default Topic;
