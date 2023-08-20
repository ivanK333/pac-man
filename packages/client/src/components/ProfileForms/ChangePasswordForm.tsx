import { SyntheticEvent } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import Input from '../InputWithLabel/InputWithLabel';
import { validation } from '../../assets/constants/formValidation';
import styles from './styles.module.scss';

type TChangePasswordFormProps = {
  handleSwitch: () => void;
};

type TChangePasswordForm = {
  oldPassword: string;
  newPassword: string;
  repeatNewPassword: string;
};

const ChangePasswordForm: React.FC<TChangePasswordFormProps> = ({
  handleSwitch,
}) => {
  const formMethods = useForm<TChangePasswordForm>();
  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit((data) =>
          console.log(data, formMethods.formState.isValid),
        )}
        noValidate={true}
      >
        <Input
          label="Old password"
          type="password"
          name="oldPassword"
          placeholder="Enter old password"
          validation={validation.password_old}
        />
        <Input
          label="New password"
          type="password"
          name="password"
          placeholder="Enter new password"
          validation={validation.password_new}
        />
        <Input
          label="Password confirmation"
          type="password"
          name="password"
          placeholder="Repeat new password"
          validation={validation.password}
        />
        <div className={styles.buttonContainer}>
          <button
            className={
              formMethods.formState.isDirty
                ? styles.submitButton
                : styles.editButton
            }
            type="submit"
            disabled={!formMethods.formState.isDirty}
          >
            save
          </button>
          <button
            className={styles.editButton}
            onClick={(e: SyntheticEvent) => {
              e.preventDefault();
              handleSwitch();
            }}
          >
            edit profile
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ChangePasswordForm;
