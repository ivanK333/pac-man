import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import SubmitButton from '../Button/Button';
import styles from './styles.module.scss';
import Sprite from '../FormSprite/FormSprite';

type FormValues = {
  login: string;
  password: string;
};

interface FormGroupProps {
  title: string;
  spriteImg: string;
  bottomText: string;
  link: string;
  linkName: string;
  children: React.ReactNode | React.ReactNode[];
}

const FormGroup = (props: FormGroupProps) => {
  const methods = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);
  return (
    <article className={styles.formContainer}>
      <h2 className={styles.title}>{props.title}</h2>
      <FormProvider {...methods}>
        <form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
          {props.children}
        </form>
      </FormProvider>
      <section className={styles.section}>
        <Sprite spriteImg={props.spriteImg} />
        <SubmitButton label={props.title} />
        <p>
          {props.bottomText}
          <span>&nbsp;</span>
          <Link className={styles.link} to={props.link}>
            {props.linkName}
          </Link>
        </p>
      </section>
    </article>
  );
};

export default FormGroup;
