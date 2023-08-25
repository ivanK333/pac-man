import styles from './styles.module.scss';
import ForumHeading from '../ForumHeading/ForumHeading';
const DesignersComponent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <ForumHeading text="Designers" />
      </div>
    </div>
  );
};

export default DesignersComponent;