import { useState } from 'react';

import styles from './styles.module.scss';

const DOTS_NUMBER = 8;
const LoaderGame = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loaderContainer}>
        <div className={styles.pacman} />
        <ul className={styles.dots}>
          {new Array(DOTS_NUMBER).fill(null).map((_, index) => (
            <li key={`dot-${index}`} className={styles.dot} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LoaderGame;
