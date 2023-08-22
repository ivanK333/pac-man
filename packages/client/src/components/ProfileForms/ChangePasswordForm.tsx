import { SyntheticEvent } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import Input from '../InputWithLabel/InputWithLabel';
import { validation } from '../../assets/constants/formValidation';
import styles from './styles.module.scss';
import { emptyResponse, ProfileAPI } from '../../api/ProfileAPI';

type TChangePasswordFormProps = {
  handleSwitch: () => void;
};

type TChangePasswordForm = {
  oldPassword: string;
  password: string;
};

const ChangePasswordForm: React.FC<TChangePasswordFormProps> = ({
  handleSwitch,
}) => {
  const formMethods = useForm<TChangePasswordForm>();
  const { changePassword } = ProfileAPI();

  const handleChangePassword = (data: TChangePasswordForm) => {
    if (!formMethods.formState.isValid) {
      return;
    }
    const { oldPassword, password } = data;
    changePassword({ oldPassword, newPassword: password })
      .then((data) => {
        data === emptyResponse.ok && formMethods.reset();
      })
      .catch((e) => console.error(e));
  };
  return (
    <FormProvider {...formMethods}>
      <form
        className={styles.form}
        onSubmit={formMethods.handleSubmit((data) =>
          handleChangePassword(data),
        )}
        noValidate={true}
      >
        <div className={styles.inputContainer}>
          <Input
            label="Old password"
            type="password"
            name="oldPassword"
            placeholder="Enter old password"
            validation={validation.password_old}
            required={true}
          />
          <Input
            label="New password"
            type="password"
            name="password"
            placeholder="Enter new password"
            validation={validation.password_new}
            required={true}
          />
          <Input
            label="Password confirmation"
            type="password"
            name="password"
            placeholder="Repeat new password"
            validation={validation.password}
            required={true}
          />
        </div>
        <div className={styles.buttonContainer}>
          <button
            className={
              formMethods.formState.isValid
                ? styles.submitButton
                : styles.editButton
            }
            type="submit"
            disabled={!formMethods.formState.isValid}
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
