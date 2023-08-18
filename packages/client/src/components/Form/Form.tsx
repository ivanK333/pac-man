import { ReactNode } from 'react';

import {
  FormProvider,
  SubmitHandler,
  useForm,
  FieldValues,
} from 'react-hook-form';

import styles from './styles.module.scss';

type FormProps<T extends FieldValues> = {
  onSubmit: SubmitHandler<T>;
  children: ReactNode;
};

const LoginFormContainer = <T extends Record<string, string>>({
  onSubmit,
  children,
}: FormProps<T>) => {
  const formMethods = useForm<T>();
  return (
    <article className={styles.formContainer}>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>{children}</form>
      </FormProvider>
    </article>
  );
};

export default LoginFormContainer;
