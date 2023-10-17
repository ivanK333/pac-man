import classNames from 'classnames';

import styles from './styles.module.scss';
import { FormFlavor } from '../../../constants/commonTypes';

interface SpriteProps {
  spriteImg: string;
  flavor?: FormFlavor;
}

const Sprite: React.FC<SpriteProps> = (props) => {
  const spriteContainerClass = classNames(
    styles.spriteContainer,
    { [styles.login]: props.flavor === 'login' },
    { [styles.register]: props.flavor === 'register' },
  );

  return (
    <div className={spriteContainerClass}>
      <div className={styles.spriteMover}>
        <img src={props.spriteImg} alt="Sprite" />
      </div>
    </div>
  );
};

export default Sprite;
