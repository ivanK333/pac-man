import { ReactNode } from 'react';

import {
  FormProvider,
  SubmitHandler,
  useForm,
  FieldValues,
} from 'react-hook-form';

import styles from './styles.module.scss';

export type FormGroupProps<T extends FieldValues> = {
  onSubmit: SubmitHandler<T>;
  children: ReactNode;
};

const FormGroup = <T extends Record<string, string>>({
  onSubmit,
  children,
}: FormGroupProps<T>) => {
  const formMethods = useForm<T>();
  return (
    <article className={styles.formContainer}>
      <FormProvider {...formMethods}>
        <form
          noValidate={true}
          className={styles.form}
          onSubmit={formMethods.handleSubmit(onSubmit)}
        >
          {children}
        </form>
      </FormProvider>
    </article>
  );
};

export default FormGroup;
