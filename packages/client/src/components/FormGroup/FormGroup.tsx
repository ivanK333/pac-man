import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import Input from '../InputWithLabel/InputWithLabel';
import SubmitButton from '../Button/Button';
import { ValidationEntry } from '../../commonTypes';
import styles from './styles.module.scss';

type FormValues = {
  login: string;
  password: string;
};

const validation: Record<string, ValidationEntry> = {
  login: {
    required: 'Login is required',
    minLength: { value: 3, message: 'at least 3 characters' },
    maxLength: { value: 20, message: 'no more than 20 characters' },
    pattern: {
      value: /^[a-zA-Z0-9-]{3,20}$/,
      message: `Only Latin letters, digits, but not composed solely of them, without spaces, 
      without special characters (hyphens and underscores are allowed)`,
    },
  },
  password: {
    required: 'Password is required',
    minLength: { value: 8, message: 'at least 8 characters' },
    maxLength: { value: 40, message: 'no more than 40 characters' },
    pattern: {
      value: /^(?=.*[A-Z])(?=.*\d).{8,40}$/,
      message: 'At least one uppercase letter and one digit are required',
    },
  },
};

const FormGroup = () => {
  const methods = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);
  return (
    <article className={styles.formContainer}>
      <h2 className={styles.title}>Login</h2>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Input
            label="Login"
            type="text"
            name="login"
            placeholder="Enter your login"
            autoFocus={true}
            validation={validation.login}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            validation={validation.password}
          />
        </form>
      </FormProvider>
      <section className={styles.section}>
        <SubmitButton label="Login" />
        <p>
          Don`t have an account yet?{' '}
          <Link className={styles.link} to="/register">
            Register
          </Link>
        </p>
      </section>
    </article>
  );
};

export default FormGroup;
