import { useState } from 'react';

import styles from './styles.module.scss';

const DOTS_NUMBER = 8;
const LoaderGame = () => {
  const [active, setIsActive] = useState(true);

  const animationToggle = () => {
    setIsActive(false);
    setTimeout(() => setIsActive(true), 5);
  };
  return (
    <>
      {active ? (
        <div className={styles.container}>
          <div
            className={styles.loaderContainer}
            onAnimationEnd={(e) => {
              if (e.animationName === '_travel_su64p_1') {
                animationToggle();
              }
            }}
          >
            <div className={styles.pacman} />
            <ul className={styles.dots}>
              {new Array(DOTS_NUMBER).fill(null).map((_, index) => (
                <li key={`dot-${index}`} className={styles.dot} />
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default LoaderGame;
