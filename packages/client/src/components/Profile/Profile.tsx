import styles from './styles.module.scss';
import Avatar from '../Avatar/Avatar';

const Profile = () => {
  return (
    <div className={styles.container}>
      <div className={styles.avatarContainer}>
        <Avatar />
        <p className={styles.username}>Username</p>
      </div>
      <div className={styles.formContainer}></div>
    </div>
  );
};

export default Profile;
