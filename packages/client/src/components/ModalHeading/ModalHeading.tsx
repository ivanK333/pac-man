import styles from './styles.module.scss';

type TModalHeadingProps = {
  text: string;
};

const ModalHeading: React.FC<TModalHeadingProps> = ({ text }) => {
  return <h4 className={styles.heading}>{text}</h4>;
};

export default ModalHeading;
