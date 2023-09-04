import styles from './styles.module.scss';
import CustomLink from '../CustomLink/CustomLink';
import { Colors, TColorsType } from '../../constants/colors';

type TErrorPageConstructor = {
  image: string;
  title?: string;
  linkText: string;
  linkPath: string;
  linkColor: TColorsType;
  backgroundColor?: TColorsType;
};

const ErrorPageConstructor: React.FC<TErrorPageConstructor> = ({
  image,
  title = '',
  linkText,
  linkPath = '/',
  linkColor,
  backgroundColor = Colors.black,
}) => {
  const sectionClassname = () => {
    switch (backgroundColor) {
      case Colors.yellow:
        return styles.containerYellow;
      case Colors.blue:
        return styles.containerBlue;
      default:
        return styles.containerBlack;
    }
  };

  return (
    <section className={sectionClassname()}>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={image} alt="image" />
        {title ? <h3 className={styles.title}>{title}</h3> : null}
      </div>
      <CustomLink
        linkPath={linkPath}
        linkText={linkText}
        linkColor={linkColor}
      />
    </section>
  );
};

export default ErrorPageConstructor;
