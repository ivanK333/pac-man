import { useState } from 'react';

import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';
import classNames from 'classnames';

import { authController } from '../../controllers/AuthController';
import FormGroup from '../../components/FormComponent/FormGroup/FormGroup';
import Input from '../../components/FormComponent/InputWithLabel/InputWithLabel';
import FormButtonGroup from '../../components/FormComponent/FormButtonGroup/FormButton';
import spriteSvg from '../../assets/images/blueSprite.svg';
import { validation } from '../../constants/formValidation/formValidation';
import styles from './styles.module.scss';
import FormHeading from '../../components/FormComponent/FormHeading/FormHeading';
import { ROUTES } from '../../constants/routes';
import { OAuth } from '../../components/OAuth/OAuth';
import { loadMe, useAppDispatch } from '../../store';
import useCheckLightTheme from '../../hooks/useCheckLightTheme';

type FormValues = {
  login: string;
  password: string;
};

const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { signIn } = authController();

  const submit: SubmitHandler<FormValues> = async (submitData) => {
    setError(null);

    const response = await signIn(submitData);
    if (!response.data) {
      setError(response);
      return;
    }

    dispatch(loadMe());

    navigate(ROUTES.main.root);
  };

  const { isLightTheme } = useCheckLightTheme();

  return (
    <div className={styles.container}>
      <div
        className={classNames([styles.contentContainer], {
          [styles.contentContainer_light]: isLightTheme,
        })}
      >
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
          <OAuth />
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
