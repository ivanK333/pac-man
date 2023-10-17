import classNames from 'classnames';

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
  const isSmallContainer = classNames({
    [styles.imageContainer]: size === Size.normal,
    [styles.imageContainerSmall]: size === Size.small,
  });
  const isDefault = image === 'null' || !image || image === defaultImage;

  const isSmallDefaultImage = classNames({
    [styles.imageDefaultSmall]: size === Size.small,
    [styles.imageDefault]: size === Size.normal,
  });

  return (
    <div className={isSmallContainer}>
      {isDefault ? (
        <img className={isSmallDefaultImage} src={defaultImage} alt="avatar" />
      ) : (
        <img className={styles.image} src={image} alt="avatar" />
      )}
    </div>
  );
};

export default AvatarImage;
