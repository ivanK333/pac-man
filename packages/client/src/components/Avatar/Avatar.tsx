import styles from './styles.module.scss';
import defaultAvatar from '../../assets/images/default-avatar.svg';
import testImage from '../../assets/images/сорри.jpg';

const Avatar = () => {
  const avatar = testImage;
  return (
    <div className={styles.imageContainer}>
      <section className={styles.wrapper}>
        <div className={styles.hoverOverlay}>
          <p className={styles.hoverText}>Change avatar</p>
        </div>
        {avatar ? (
          <img className={styles.image} src={avatar} alt="Avatar" />
        ) : (
          <img
            className={styles.defaultImage}
            src={defaultAvatar}
            alt="Avatar"
          />
        )}
      </section>
    </div>
  );
};

export default Avatar;
