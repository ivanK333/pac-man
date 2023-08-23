import styles from './styles.module.scss';
import defaultAvatar from '../../assets/images/default-avatar.svg';
import { RESOURCES_URL } from '../../api/config';

type TAvatarProps = {
  avatar: string;
  handleOpenModal: () => void;
};

const Avatar: React.FC<TAvatarProps> = ({ avatar, handleOpenModal }) => {
  return (
    <div className={styles.imageContainer} onClick={handleOpenModal}>
      <section className={styles.wrapper}>
        <div className={styles.hoverOverlay}>
          <p className={styles.hoverText}>Change avatar</p>
        </div>
        <img
          className={
            avatar === defaultAvatar ? styles.defaultImage : styles.image
          }
          src={avatar ? `${RESOURCES_URL}${avatar}` : defaultAvatar}
          alt="Avatar"
        />
      </section>
    </div>
  );
};

export default Avatar;
