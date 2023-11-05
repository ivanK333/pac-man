import { useFormContext, RegisterOptions } from 'react-hook-form';

import styles from './styles.module.scss';

export interface TextAreaProps {
  label: string;
  name: string;
  id?: string;
  value?: string | number;
  type?: string;
  placeholder?: string;
  required?: boolean;
  autoFocus?: boolean;
  validation?: RegisterOptions;
  onBlur?: () => void;
  disabled?: boolean;
}

const TextAreaWithLabel: React.FC<TextAreaProps> = ({
  label,
  name,
  id,
  autoFocus,
  placeholder,
  validation,
  disabled = false,
  ...rest
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <article className={styles.group}>
      <label className={styles.label} htmlFor={name}>
        {label}:
      </label>
      <textarea
        id={id}
        className={styles.textArea}
        autoFocus={autoFocus}
        {...register(name, validation)}
        required={true}
        placeholder={placeholder}
        name={name}
        disabled={disabled}
        {...rest}
      />
      {errors[name] && (
        <div className={styles.error}>
          <p>{errors[name]?.message as string}</p>
        </div>
      )}
    </article>
  );
};

export default TextAreaWithLabel;
