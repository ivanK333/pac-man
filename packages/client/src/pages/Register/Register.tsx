import { SubmitHandler } from 'react-hook-form';

import FormGroup from '../../components/FormGroup/FormGroup';
import FormButtonGroup from '../../components/FormButtonGroup/FormButton';
import spriteSvg from '../../assets/images/purple_ghost.png';
import Input from '../../components/InputWithLabel/InputWithLabel';
import { validation } from '../../assets/constants/formValidation';
import styles from './styles.module.scss';

type FormValues = {
  login: string;
  password: string;
  // TODO: add input fields
};

const Register = () => {
  const submit: SubmitHandler<FormValues> = async (submitData) => {
    console.log(submitData);
  };

  return (
    <div className={styles.registerPage}>
      <FormGroup onSubmit={submit}>
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
          validation={validation.login}
        />
        <Input label="Name" type="text" name="first_name" placeholder="Ivan" />
        <Input
          label="Surname"
          type="text"
          name="second_name"
          placeholder="Ivanov"
        />
        <Input
          label="Phone"
          type="phone"
          name="phone"
          placeholder="+79098087766"
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
