import React, { ReactNode } from 'react';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import styles from './styles.module.scss';

type FormProps = {
  onSubmit: SubmitHandler<any>;
  children: ReactNode;
};

const LoginFormContainer: React.FC<FormProps> = ({ onSubmit, children }) => {
  const formMethods = useForm();
  return (
    <div className={styles.formContainer}>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>{children}</form>
      </FormProvider>
    </div>
  );
};

export default LoginFormContainer;
