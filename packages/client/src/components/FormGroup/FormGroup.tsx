import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import styles from './styles.module.scss';

export interface FormGroupProps {
  formMethods: ReturnType<typeof useForm>;
  onSubmit: SubmitHandler<any>;
  children: React.ReactNode;
}

const FormGroup: React.FC<FormGroupProps> = ({
  formMethods,
  onSubmit,
  children,
}) => {
  return (
    <article className={styles.formContainer}>
      <FormProvider {...formMethods}>
        <form
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
