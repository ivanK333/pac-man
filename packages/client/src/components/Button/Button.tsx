import classNames from 'classnames';

import styles from './styles.module.scss';
import { FormFlavor } from '../../commonTypes';

interface ButtonProps {
  label: string;
  type?: 'button' | 'submit' | 'reset';
  id?: string;
  disabled?: boolean;
  onClick?: () => void;
  flavor?: FormFlavor;
}

const Button = (props: ButtonProps) => {
  const { label, type, id, disabled, onClick, ...rest } = props;
  const buttonClass = classNames(
    styles.bigBTN,
    { [styles.login]: props.flavor === 'login' },
    { [styles.register]: props.flavor === 'register' },
  );
  return (
    <button
      className={buttonClass}
      type={type}
      disabled={disabled ? disabled : false}
      id={id}
      onClick={onClick}
      {...rest}
    >
      {label}
    </button>
  );
};

export default Button;
