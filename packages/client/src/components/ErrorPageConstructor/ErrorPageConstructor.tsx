import styles from './styles.module.scss';
import Link from '../Link';

type TErrorPageConstructor = {
  image: string;
  title: string;
  linkText: string;
  linkPath: string;
};

const ErrorPageConstructor: React.FC<TErrorPageConstructor> = ({
  image,
  title,
  linkText,
  linkPath,
}) => {
  return (
    <section className={styles.container}>
      <img className={styles.image} src={image} alt="image" />
      <h3>{title}</h3>
      <Link to={linkPath}>
        <p className={styles.image}>{linkText}</p>
      </Link>
    </section>
  );
};

export default ErrorPageConstructor;
