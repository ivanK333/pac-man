import React from 'react';

import styles from './styles.module.scss';

interface SpriteProps {
  spriteImg: string;
}

const Sprite: React.FC<SpriteProps> = (props) => {
  return (
    <div className={styles.spriteContainer}>
      <div className={styles.spriteMover}>
        <img src={props.spriteImg} alt="Blue Sprite" />
      </div>
    </div>
  );
};

export default Sprite;
