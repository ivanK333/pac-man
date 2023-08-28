import styles from './styles.module.scss';
const LoaderGame = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loaderContainer}>
        <div className={styles.pacman} />

        <ul className={styles.dots}>
          <li className={styles.dot} />
          <li className={styles.dot} />
          <li className={styles.dot} />
          <li className={styles.dot} />
          <li className={styles.dot} />
          <li className={styles.dot} />
          <li className={styles.dot} />
          <li className={styles.dot} />
        </ul>
      </div>
    </div>
  );
};

export default LoaderGame;
