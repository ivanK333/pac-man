import { SyntheticEvent, useState } from 'react';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import Input from '../InputWithLabel/InputWithLabel';
import { validation } from '../../assets/constants/formValidation';
import styles from './styles.module.scss';

type TProfileFormProps = {
  handleSwitch: () => void;
};

type TProfileForm = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

const ProfileForm: React.FC<TProfileFormProps> = ({ handleSwitch }) => {
  const defaultValues: TProfileForm = {
    first_name: 'Ilya',
    second_name: 'Makhin',
    display_name: 'IlyaZubastu',
    login: 'zubastu',
    email: 'zubastu@gmail.com',
    phone: '+79999220615',
  };

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const formMethods = useForm<TProfileForm>({
    defaultValues: defaultValues,
  });

  const handleSubmit: SubmitHandler<TProfileForm> = (data: TProfileForm) => {
    if (!formMethods.formState.isDirty) {
      return;
    }
    console.log(data);
    setIsEdit(false);
  };

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
                className={
                  formMethods.formState.isDirty
                    ? styles.submitButton
                    : styles.editButton
                }
                type="button"
                onClick={(e: SyntheticEvent) => {
                  e.preventDefault();
                  setIsEdit(false);
                  formMethods.reset(defaultValues);
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
