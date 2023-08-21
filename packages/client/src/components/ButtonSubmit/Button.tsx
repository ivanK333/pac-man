import { FC } from 'react';

import styles from './styles.module.scss';

interface ButtonProps {
  label?: string;
  type?: 'button' | 'submit' | 'reset';
  id?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = (props) => {
  const { label, type, id, disabled, onClick, ...rest } = props;
  return (
    <button
      className={styles.bigBTN}
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
