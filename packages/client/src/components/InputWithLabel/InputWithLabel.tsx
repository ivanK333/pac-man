import React from 'react';

import { useFormContext } from 'react-hook-form';

import { ValidationEntry } from '../../commonTypes';
import styles from './styles.module.scss';

export interface InputProps {
  label: string;
  name: string;
  id?: string;
  value?: string | number;
  type?: string;
  placeholder?: string;
  required?: boolean;
  autoFocus?: boolean;
  validation?: ValidationEntry;
  onBlur?: () => void;
}

const InputWithLabel: React.FC<InputProps> = ({
  label,
  name,
  type = 'text',
  id,
  value,
  autoFocus,
  placeholder,
  validation,
  ...rest
}) => {
  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext();

  return (
    <div className={styles.inputWithLabel}>
      <label htmlFor={name}>{label}:</label>
      <input
        id={id}
        value={value}
        type={type}
        placeholder={placeholder}
        autoFocus={autoFocus}
        {...register(name, validation)}
        onBlur={() => trigger(name)}
        {...rest}
      />
      {errors[name] && <p>{errors[name]?.message as string}</p>}
    </div>
  );
};

export default InputWithLabel;
