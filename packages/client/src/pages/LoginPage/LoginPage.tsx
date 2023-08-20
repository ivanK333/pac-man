import { useState } from 'react';

import { SubmitHandler } from 'react-hook-form';

import { LoginAPI } from '../../api/AuthAPI';
import FormGroup from '../../components/FormGroup/FormGroup';
import Input from '../../components/InputWithLabel/InputWithLabel';
import FormButtonGroup from '../../components/FormButtonGroup/FormButton';
import spriteSvg from '../../assets/images/blueSprite.svg';
import { validation } from '../../assets/constants/formValidation';
import styles from './styles.module.scss';

type FormValues = {
  login: string;
  password: string;
};
const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);

  const submit: SubmitHandler<FormValues> = async (submitData) => {
    setError(null);

    try {
      const response = await LoginAPI(submitData);
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

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <FormGroup onSubmit={submit}>
          <h2>Login</h2>
          {error && <p className={styles.submitError}>{error}</p>}
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
          <FormButtonGroup
            title="Login"
            spriteImg={spriteSvg}
            bottomText="Don&rsquo;t have an account yet?"
            linkName="Register"
            link="/register"
          />
        </FormGroup>
      </div>
    </div>
  );
};
export default LoginForm;
