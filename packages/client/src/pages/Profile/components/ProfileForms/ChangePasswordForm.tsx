import { SyntheticEvent, FC } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import Input from '../../../../components/FormComponent/InputWithLabel/InputWithLabel';
import { validation } from '../../../../constants/formValidation/formValidation';
import styles from './styles.module.scss';
import { userAPI } from '../../../../api';

type TChangePasswordFormProps = {
  handleSwitch: () => void;
};

type TChangePasswordForm = {
  oldPassword: string;
  password: string;
};

const ChangePasswordForm: FC<TChangePasswordFormProps> = ({ handleSwitch }) => {
  const formMethods = useForm<TChangePasswordForm>();
  const { changePassword } = userAPI();

  const handleChangePassword = async (data: TChangePasswordForm) => {
    if (!formMethods.formState.isValid) {
      return;
    }
    const { oldPassword, password } = data;
    const response = await changePassword({
      oldPassword,
      newPassword: password,
    });

    if (response.data) {
      formMethods.reset();
    }
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
            // type="password"
            name="oldPassword"
            placeholder="Enter old password"
            validation={validation.oldPassword}
            required={true}
          />
          <Input
            label="New password"
            // type="password"
            name="password"
            placeholder="Enter new password"
            validation={validation.password}
            required={true}
          />
          <Input
            label="Password confirmation"
            // type="password"
            name="confirm_password"
            placeholder="Repeat new password"
            validation={validation.confirm_password}
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
