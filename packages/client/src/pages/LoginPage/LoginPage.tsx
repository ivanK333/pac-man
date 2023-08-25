import { useState } from 'react';

import { useNavigate } from 'react-router';
import { SubmitHandler } from 'react-hook-form';

import AuthController from '../../controllers/AuthController';
import FormGroup from '../../components/FormGroup/FormGroup';
import Input from '../../components/InputWithLabel/InputWithLabel';
import FormButtonGroup from '../../components/FormButtonGroup/FormButton';
import spriteSvg from '../../assets/images/blueSprite.svg';
import { validation } from '../../assets/constants/formValidation';
import styles from './styles.module.scss';
import FormHeading from '../../components/FormHeading/FormHeading';

export const redirect = (url: string) => {
  window.location.href = url;
};

type FormValues = {
  login: string;
  password: string;
};
const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);

  const submit: SubmitHandler<FormValues> = async (submitData) => {
    setError(null);

    const response = await AuthController.signin(submitData);
    if (!response.success) {
      setError(`${response.error}`);
      return;
    }
    console.log(response);
    redirect('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <FormGroup onSubmit={submit}>
          <FormHeading text="Login" />
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
            link="/auth/register"
          />
        </FormGroup>
      </div>
    </div>
  );
};
export default LoginForm;
