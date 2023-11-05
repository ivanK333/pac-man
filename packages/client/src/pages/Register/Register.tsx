import { useState } from 'react';

import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';
import classNames from 'classnames';

import FormGroup from '../../components/FormComponent/FormGroup/FormGroup';
import FormButtonGroup from '../../components/FormComponent/FormButtonGroup/FormButton';
import spriteSvg from '../../assets/images/purple_ghost.png';
import Input from '../../components/FormComponent/InputWithLabel/InputWithLabel';
import { validation } from '../../constants/formValidation/formValidation';
import styles from './styles.module.scss';
import FormHeading from '../../components/FormComponent/FormHeading/FormHeading';
import { authController } from '../../controllers/AuthController';
import { ROUTES } from '../../constants/routes';
import { themeAPI } from '../../api/theme/themeAPI';
import useCheckLightTheme from '../../hooks/useCheckLightTheme';

type FormValues = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  confirm_password?: string;
  phone: string;
};

const Register = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { signUp } = authController();

  const { createTheme } = themeAPI();

  const submit: SubmitHandler<FormValues> = async (submitData) => {
    if (submitData.confirm_password !== submitData.password) {
      setError(`Passwords don't match`);
      return;
    }

    delete submitData.confirm_password;
    const response = await signUp(submitData);

    if (!response?.data) {
      setError(`${response}`);
      return;
    }
    const { id } = response.data;
    const res = await createTheme(id.toString());
    if (res.data) {
      const { userId, lightTheme } = res.data;
      console.log(`Created theme is light ${lightTheme} for user ID ${userId}`);
    }

    navigate(ROUTES.main.root);
  };

  const { availableChangeThemeToDark } = useCheckLightTheme();

  return (
    <div
      className={classNames([styles.registerPage], {
        [styles.registerPage_light]: availableChangeThemeToDark,
      })}
    >
      <FormGroup onSubmit={submit}>
        <FormHeading text="Register" />
        {error && <p className={styles.submitError}>{error}</p>}
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="pochta@yandex.ru"
          validation={validation.email}
        />
        <Input
          label="Login"
          type="login"
          name="login"
          placeholder="ivanivanov"
          validation={validation.login}
        />
        <Input
          label="Name"
          type="text"
          name="first_name"
          placeholder="Ivan"
          validation={validation.first_name}
        />
        <Input
          label="Surname"
          type="text"
          name="second_name"
          placeholder="Ivanov"
          validation={validation.second_name}
        />
        <Input
          label="Phone"
          type="phone"
          name="phone"
          placeholder="+79098087766"
          validation={validation.phone}
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
          name="confirm_password"
          placeholder="Repeat password"
          validation={validation.confirm_password}
        />
        <FormButtonGroup
          title="Register"
          spriteImg={spriteSvg}
          bottomText="Already have an account?"
          linkName="Login"
          link="/auth/login"
        />
      </FormGroup>
    </div>
  );
};

export default Register;
