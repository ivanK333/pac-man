import styles from './styles.module.scss';
import defaultImage from '../../assets/images/default-avatar.svg';

export enum Size {
  small = 'small',
  normal = 'normal',
}

type TAvatarImage = {
  image: string | undefined | null;
  size?: Size.normal | Size.small;
};

const AvatarImage: React.FC<TAvatarImage> = ({ image, size = Size.normal }) => {
  return (
    <div
      className={
        size === Size.normal
          ? styles.imageContainer
          : styles.imageContainerSmall
      }
    >
      {image === 'null' || !image || image === defaultImage ? (
        <img
          className={
            size === Size.normal
              ? styles.imageDefault
              : styles.imageDefaultSmall
          }
          src={defaultImage}
          alt="avatar"
        />
      ) : (
        <img className={styles.image} src={image} alt="avatar" />
      )}
    </div>
  );
};

export default AvatarImage;
