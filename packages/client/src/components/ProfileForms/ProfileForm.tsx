import { SyntheticEvent, useEffect, useState } from 'react';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import Input from '../InputWithLabel/InputWithLabel';
import { validation } from '../../assets/constants/formValidation';
import styles from './styles.module.scss';
import { ProfileAPI, TProfileForm } from '../../api/ProfileAPI';

type TProfileFormProps = {
  handleSwitch: () => void;
  user: TProfileForm;
};

const ProfileForm: React.FC<TProfileFormProps> = ({ handleSwitch, user }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const formMethods = useForm<TProfileForm>({
    defaultValues: user,
  });

  const { changeProfile } = ProfileAPI();

  const handleSubmit: SubmitHandler<TProfileForm> = (data: TProfileForm) => {
    if (!formMethods.formState.isValid) {
      return;
    }
    changeProfile(data)
      .then(
        ({ first_name, second_name, display_name, login, email, phone }) => {
          formMethods.reset({
            first_name,
            second_name,
            display_name,
            login,
            email,
            phone,
          });
        },
      )
      .catch((e) => console.error(e));
    setIsEdit(false);
  };

  useEffect(() => {
    formMethods.reset(user);
  }, [user]);

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit((data) => handleSubmit(data))}
        noValidate={true}
      >
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="pochta@yandex.ru"
          autoFocus={true}
          validation={validation.email}
          disabled={!isEdit}
          required={true}
        />
        <Input
          label="Login"
          type="login"
          name="login"
          placeholder="ivanivanov"
          validation={validation.login}
          disabled={!isEdit}
          required={true}
        />
        <Input
          label="Name"
          type="text"
          name="first_name"
          placeholder="Ivan"
          validation={validation.first_name}
          disabled={!isEdit}
          required={true}
        />
        <Input
          label="Surname"
          type="text"
          name="second_name"
          placeholder="Ivanov"
          validation={validation.second_name}
          disabled={!isEdit}
          required={true}
        />
        <Input
          label="Display name"
          type="text"
          name="display_name"
          placeholder="Ivanov"
          validation={validation.display_name}
          disabled={!isEdit}
          required={true}
        />
        <Input
          label="Phone"
          type="phone"
          name="phone"
          placeholder="+79098087766"
          validation={validation.phone}
          disabled={!isEdit}
          required={true}
        />
        <div className={styles.buttonContainer}>
          {isEdit ? (
            <>
              <button
                className={
                  formMethods.formState.isValid && formMethods.formState.isDirty
                    ? styles.submitButton
                    : styles.editButton
                }
                type="submit"
                disabled={
                  !formMethods.formState.isValid &&
                  !formMethods.formState.isDirty
                }
              >
                save
              </button>
              <button
                className={
                  formMethods.formState.isDirty
                    ? styles.submitButton
                    : styles.editButton
                }
                type="button"
                onClick={(e: SyntheticEvent) => {
                  e.preventDefault();
                  setIsEdit(false);
                  formMethods.reset(user);
                }}
              >
                cancel
              </button>
            </>
          ) : (
            <>
              <button
                className={styles.editButton}
                type="button"
                onClick={(e: SyntheticEvent) => {
                  e.preventDefault();
                  setIsEdit(true);
                }}
              >
                edit
              </button>
              <button
                className={styles.editButton}
                onClick={(e: SyntheticEvent) => {
                  e.preventDefault();
                  handleSwitch();
                }}
              >
                edit password
              </button>
            </>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default ProfileForm;
