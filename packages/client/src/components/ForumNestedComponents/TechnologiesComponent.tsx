import styles from './styles.module.scss';
import ForumHeading from '../ForumHeading/ForumHeading';
const TechnologiesComponent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <ForumHeading text="Technologies" />
      </div>
    </div>
  );
};

export default TechnologiesComponent;
