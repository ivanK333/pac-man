import { useParams } from 'react-router';

import styles from './styles.module.scss';

const Topic = () => {
  const { id } = useParams();
  return <div className={styles.container}>{id}</div>;
};

export default Topic;
