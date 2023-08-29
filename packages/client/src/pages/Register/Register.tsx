import { useState } from 'react';

import { SubmitHandler } from 'react-hook-form';

import FormGroup from '../../components/FormGroup/FormGroup';
import FormButtonGroup from '../../components/FormButtonGroup/FormButton';
import spriteSvg from '../../assets/images/purple_ghost.png';
import Input from '../../components/InputWithLabel/InputWithLabel';
import { validation } from '../../constants/formValidation/formValidation';
import styles from './styles.module.scss';
import FormHeading from '../../components/FormHeading/FormHeading';
import { redirect } from '../LoginPage/LoginPage';
import AuthController from '../../controllers/AuthController';
import { ROUTES } from '../../constants/routes';

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

  const submit: SubmitHandler<FormValues> = async (submitData) => {
    if (submitData.confirm_password !== submitData.password) {
      setError(`Passwords don't match`);
      return;
    }

    delete submitData.confirm_password;
    const response = await AuthController.signup(submitData);

    if (!response.success) {
      setError(`${response.error}`);
      return;
    }

    redirect(ROUTES.main.root);
  };

  return (
    <div className={styles.registerPage}>
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
