import { Link } from 'react-router-dom';

import SubmitButton from '../ButtonSubmit/Button';
import styles from './styles.module.scss';
import Sprite from '../FormSprite/FormSprite';

export interface FormButtonProps {
  title: string;
  spriteImg: string;
  bottomText: string;
  link: string;
  linkName: string;
}

const FormButton: React.FC<FormButtonProps> = ({
  title,
  spriteImg,
  bottomText,
  link,
  linkName,
}) => {
  return (
    <article className={styles.section}>
      <Sprite spriteImg={spriteImg} />
      <SubmitButton label={title} />
      <p>
        {bottomText}
        <span>&nbsp;</span>
        <Link className={styles.link} to={link}>
          {linkName}
        </Link>
      </p>
    </article>
  );
};

export default FormButton;
