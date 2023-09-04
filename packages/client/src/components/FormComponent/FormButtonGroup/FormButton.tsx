import { Link } from 'react-router-dom';

import Button from '../../ButtonSubmit/Button';
import styles from './styles.module.scss';
import Sprite from '../FormSprite/FormSprite';

export interface FormButtonProps {
  title: string;
  spriteImg?: string;
  bottomText: string;
  link?: string;
  onClick?: () => void;
  linkName: string;
  disabled?: boolean;
}

const FormButton: React.FC<FormButtonProps> = ({
  title,
  spriteImg,
  bottomText,
  link,
  linkName,
  onClick,
  ...rest
}) => {
  return (
    <article className={styles.section}>
      {spriteImg && <Sprite spriteImg={spriteImg} />}
      <Button label={title} {...rest} />
      <p>
        {bottomText}
        <span>&nbsp;</span>
        {link ? (
          <Link className={styles.link} to={link}>
            {linkName}
          </Link>
        ) : (
          <button
            type="button"
            className={styles.link + ' ' + styles.btn}
            onClick={onClick}
          >
            {linkName}
          </button>
        )}
      </p>
    </article>
  );
};

export default FormButton;
