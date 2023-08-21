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
  backgroundColor?: Colors.black | Colors.yellow;
};

const ErrorPageConstructor: React.FC<TErrorPageConstructor> = ({
  image,
  title = '',
  linkText,
  linkPath,
  /*  linkColor,
  backgroundColor = Colors.black,*/
}) => {
  /*  const isYellowBackground = linkColor === Colors.yellow;
  const isBlueBackground = linkColor === Colors.blue;
  const isBlackBackground = linkColor === Colors.black;

  const isYellowLink = linkColor === Colors.yellow;
  const isBlueLink = linkColor === Colors.blue;
  const isBlackLink = linkColor === Colors.black;

  const sectionClassname = () => {};*/
  return (
    <section className={styles.container}>
      <img className={styles.image} src={image} alt="image" />
      {title ? <h3>{title}</h3> : null}
      <Link to={linkPath}>
        <p>{linkText}</p>
      </Link>
    </section>
  );
};

export default ErrorPageConstructor;
