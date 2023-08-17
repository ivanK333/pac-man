import React, { ReactNode } from 'react';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import styles from './styles.module.scss';

type LoginFormContainerProps = {
  formMethods: ReturnType<typeof useForm>;
  onSubmit: SubmitHandler<any>;
  children: ReactNode;
};

const LoginFormContainer: React.FC<LoginFormContainerProps> = ({
  formMethods,
  onSubmit,
  children,
}) => {
  return (
    <div className={styles.formContainer}>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>{children}</form>
      </FormProvider>
    </div>
  );
};

export default LoginFormContainer;
