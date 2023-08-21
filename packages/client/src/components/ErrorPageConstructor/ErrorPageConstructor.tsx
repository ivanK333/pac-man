import styles from './styles.module.scss';
import Link from '../Link';

enum Colors {
  yellow = 'yellow',
  blue = 'blue',
  black = 'black',
}

type TErrorPageConstructor = {
  image: string;
  title?: string;
  linkText: string;
  linkPath: string;
  linkColor: Colors.blue | Colors.black | Colors.yellow;
  backgroundColor?: Colors.black | Colors.yellow | Colors.blue;
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

  const linkTextClassname = () => {
    switch (linkColor) {
      case Colors.yellow:
        return styles.linkTextYellow;
      case Colors.blue:
        return styles.linkTextBlue;
      default:
        return styles.linkTextBlack;
    }
  };
  return (
    <section className={sectionClassname()}>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={image} alt="image" />
        {title ? <h3 className={styles.title}>{title}</h3> : null}
      </div>
      <Link to={linkPath}>
        <p className={linkTextClassname()}>{linkText}</p>
      </Link>
    </section>
  );
};

export default ErrorPageConstructor;
