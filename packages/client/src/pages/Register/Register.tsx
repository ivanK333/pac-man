import { useForm } from 'react-hook-form';

import styles from './styles.module.scss';
import FormGroup from '../../components/FormGroup/FormGroup';
import spriteSvg from '../../assets/images/purple_ghost.png';
import Input from '../../components/InputWithLabel/InputWithLabel';
import { ValidationEntry } from '../../commonTypes';
import FormButton from '../../components/FormButton/FormButton';

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

const Register = () => {
  const formMethods = useForm();

  const submit = () => {
    console.log('заглушка для формы');
  };

  return (
    <div className={styles.registerPage}>
      <FormGroup onSubmit={submit} formMethods={formMethods}>
        <h2 className={styles.title}>Register</h2>
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="pochta@yandex.ru"
          autoFocus={true}
        />
        <Input
          label="Login"
          type="login"
          name="login"
          placeholder="ivanivanov"
          autoFocus={true}
          validation={validation.login}
        />
        <Input
          label="Name"
          type="text"
          name="first_name"
          placeholder="Ivan"
          autoFocus={true}
        />
        <Input
          label="Surname"
          type="text"
          name="second_name"
          placeholder="Ivanov"
          autoFocus={true}
        />
        <Input
          label="Phone"
          type="phone"
          name="phone"
          placeholder="+79098087766"
          autoFocus={true}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          validation={validation.password}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Repeat password"
        />
        <FormButton
          title="Register"
          spriteImg={spriteSvg}
          bottomText="Already have an account?"
          linkName="Login"
          link="/login"
        />
      </FormGroup>
    </div>
  );
};

export default Register;
