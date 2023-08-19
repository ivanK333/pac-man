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
    <article className={styles.group}>
      <label className={styles.label} htmlFor={name}>
        {label}:
      </label>
      <div className={styles.input}>
        <input
          className={errors[name] && styles.errorInput}
          id={id}
          value={value}
          type={type}
          placeholder={placeholder}
          autoFocus={autoFocus}
          {...register(name, validation)}
          onBlur={() => trigger(name)}
          {...rest}
        />
      </div>
      {errors[name] && (
        <div className={styles.error}>
          <p>{errors[name]?.message as string}</p>
        </div>
      )}
    </article>
  );
};

export default InputWithLabel;
