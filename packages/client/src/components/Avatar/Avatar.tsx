import classNames from 'classnames';

import styles from './styles.module.scss';
import defaultAvatar from '../../assets/images/default-avatar.svg';
import { RESOURCES_URL } from '../../constants/api';

type TAvatarProps = {
  avatar: string;
  handleOpenModal: () => void;
};

const Avatar: React.FC<TAvatarProps> = ({ avatar, handleOpenModal }) => {
  const avatarImage =
    avatar === 'null' || !avatar ? defaultAvatar : `${RESOURCES_URL}${avatar}`;

  const classname = classNames(styles.image, {
    [styles.defaultImage]: avatarImage === defaultAvatar,
  });

  return (
    <section className={styles.wrapper} onClick={handleOpenModal}>
      <div className={styles.hoverOverlay}>
        <p className={styles.hoverText}>Change avatar</p>
      </div>
      <img className={classname} src={avatarImage} alt="Avatar" />
    </section>
  );
};

export default Avatar;
