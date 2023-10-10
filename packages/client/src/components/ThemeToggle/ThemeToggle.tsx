import { useState } from 'react';

import styles from './styles.module.scss';

const ThemeToggle = () => {
  const [x, setX] = useState(false);
  console.log(x);
  return (
    <>
      <input
        id="toggle"
        className={styles.toggle}
        checked={x}
        onChange={() => setX(!x)}
        type="checkbox"
      />
    </>
  );
};

export default ThemeToggle;
