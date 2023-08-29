import styles from './styles.module.scss';
import defaultImage from '../../assets/images/default-avatar.svg';

type TAvatarImage = {
  image: string | undefined | null | '';
};

const AvatarImage: React.FC<TAvatarImage> = ({ image }) => {
  return (
    <div className={styles.imageContainer}>
      {image === 'null' || !image || image === defaultImage ? (
        <img className={styles.imageDefault} src={defaultImage} alt="avatar" />
      ) : (
        <img className={styles.image} src={image} alt="avatar" />
      )}
    </div>
  );
};

export default AvatarImage;
