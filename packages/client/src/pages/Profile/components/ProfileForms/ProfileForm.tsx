import { SyntheticEvent, useEffect, useState, FC } from 'react';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import Input from '../../../../components/FormComponent/InputWithLabel/InputWithLabel';
import { validation } from '../../../../constants/formValidation/formValidation';
import styles from './styles.module.scss';
import { userAPI, TProfileForm } from '../../../../api';
import { ROUTES } from '../../../../constants/routes';
import { Colors } from '../../../../constants/colors';
import CustomLink from '../../../../components/CustomLink/CustomLink';

type TProfileFormProps = {
  handleSwitch: () => void;
  user: TProfileForm;
};

const ProfileForm: FC<TProfileFormProps> = ({ handleSwitch, user }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const formMethods = useForm<TProfileForm>({
    defaultValues: user,
  });

  const { changeProfile } = userAPI();

  const handleSubmit: SubmitHandler<TProfileForm> = async (
    data: TProfileForm,
  ) => {
    if (!formMethods.formState.isValid) {
      return;
    }

    const response = await changeProfile(data);

    if (response?.data) {
      formMethods.reset({
        first_name: data.first_name,
        second_name: data.second_name,
        display_name: data.display_name,
        login: data.login,
        email: data.email,
        phone: data.phone,
      });

      setIsEdit(false);
    }
  };

  useEffect(() => {
    formMethods.reset(user);
  }, [user]);

  const linkPath = ROUTES.main.root;
  const linkText = 'back to the game';
  const linkColor = Colors.yellow;

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
              <CustomLink
                linkPath={linkPath}
                linkText={linkText}
                linkColor={linkColor}
              />
            </>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default ProfileForm;
