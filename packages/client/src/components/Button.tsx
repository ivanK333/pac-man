import React from 'react';

export interface ButtonProps {
  label: string;
  type?: 'button' | 'submit' | 'reset';
  id?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { label, type, id, disabled, onClick, ...rest } = props;
  return (
    <button
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
