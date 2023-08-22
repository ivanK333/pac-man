import styles from './styles.module.scss';

type TForumHeading = {
  text: string;
};

const ForumHeading: React.FC<TForumHeading> = ({ text }) => {
  return <h4 className={styles.heading}>{text}</h4>;
};

export default ForumHeading;
