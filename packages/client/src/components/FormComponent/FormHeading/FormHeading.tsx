import styles from './styles.module.scss';

type TFormHeadingProps = {
  text: string;
};

const FormHeading: React.FC<TFormHeadingProps> = ({ text }) => {
  return <h4 className={styles.heading}>{text}</h4>;
};

export default FormHeading;
