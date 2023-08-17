import styles from './styles.module.scss';
import FormGroup from '../../components/FormGroup/FormGroup';
import spriteSvg from '../../assets/images/purple_ghost.png';
import Input from '../../components/InputWithLabel/InputWithLabel';

const Register = () => {
  return (
    <div className={styles.registerPage}>
      <FormGroup
        title="Register"
        spriteImg={spriteSvg}
        bottomText="Already have an account?"
        linkName="Login"
        link="/login"
      >
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
        />
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Repeat password"
        />
      </FormGroup>
    </div>
  );
};

export default Register;
