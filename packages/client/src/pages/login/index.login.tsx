import { useState } from 'react';

import { SubmitHandler } from 'react-hook-form';

import { ValidationEntry } from '../../commonTypes';
import { LoginAPI } from '../../api/AuthAPI';
import Form from '../../components/Form/Form';
import Input from '../../components/InputWithLabel/InputWithLabel';
import Sprite from '../../components/FormSprite/FormSprite';
import spriteSvg from '../../assets/images/blueSprite.svg';
import SubmitButton from '../../components/Button/Button';
// import Link from '../../components/Link';
// import styles from './styles.module.scss';

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

type FormValues = {
  login: string;
  password: string;
};
const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);

  const submit: SubmitHandler<FormValues> = async (loginData) => {
    setError(null);

    try {
      const response = await LoginAPI(loginData);
      console.log('====response==>', response);
      const { status } = response;
      switch (status) {
        case 200:
          setError('Login successful');
          // formMethods.reset();
          break;
        case 400:
          setError('User already in the system');
          break;
        case 401:
          setError('Login failed. Please check your credentials');
          break;
        case 500:
          setError('An error occurred while logging in');
          break;
        default:
          setError(`${status}`);
      }
    } catch (error) {
      setError(`An error occurred while logging in. ${error}`);
    }
  };
  const flavor = 'login';

  return (
    // <div className={styles.container}>
    //   <div className={styles.contentContainer}>
    <div>
      <div>
        <Form onSubmit={submit}>
          <h2>Login</h2>
          {error && <p>{error}</p>}
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
          {/* <section className={styles.section}> */}
          <section>
            <Sprite spriteImg={spriteSvg} flavor={flavor} />
            <SubmitButton label="Login" flavor={flavor} />
            {/* <FormLink
              text="Don't have an account yet?"
              linkText=" Register"
              to="/register"
              flavor={flavor}
            /> */}
          </section>
        </Form>
      </div>
    </div>
  );
};
export default LoginForm;
