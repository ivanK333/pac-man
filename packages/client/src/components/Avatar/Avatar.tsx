import styles from './styles.module.scss';
import defaultAvatar from '../../assets/images/default-avatar.svg';
import { RESOURCES_URL } from '../../api/config';

type TAvatarProps = {
  avatar: string;
  handleOpenModal: () => void;
};

const Avatar: React.FC<TAvatarProps> = ({ avatar, handleOpenModal }) => {
  const avatarImage =
    avatar === 'null' || !avatar ? defaultAvatar : `${RESOURCES_URL}${avatar}`;

  return (
    <section className={styles.wrapper} onClick={handleOpenModal}>
      <div className={styles.hoverOverlay}>
        <p className={styles.hoverText}>Change avatar</p>
      </div>
      <img
        className={
          avatarImage === defaultAvatar ? styles.defaultImage : styles.image
        }
        src={avatarImage}
        alt="Avatar"
      />
    </section>
  );
};

export default Avatar;
