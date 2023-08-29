import { useNavigate, useParams } from 'react-router';

import styles from './styles.module.scss';
import blueGhost from '../../assets/images/blueSprite.svg';
import TopicForm from '../../components/TopicForm/TopicForm';

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
        <div className={styles.messageList}>
          <TopicForm
            onSubmit={handleSubmit}
            placeholder="Enter your message"
            autoFocus={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Topic;
