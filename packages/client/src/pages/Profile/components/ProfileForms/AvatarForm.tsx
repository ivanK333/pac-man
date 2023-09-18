import { SyntheticEvent, useEffect, useRef, useState, FC } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import styles from './styles.module.scss';
import defaultImage from '../../../../assets/images/default-avatar.svg';
import FormHeading from '../../../../components/FormComponent/FormHeading/FormHeading';
import { userAPI, User } from '../../../../api';
import { RESOURCES_URL } from '../../../../constants/api';
import FormButton from '../../../../components/FormComponent/FormButtonGroup/FormButton';

type TAvatarFormProps = {
  handleClose: () => void;
  avatar: string;
  refreshUserData: (data: User) => void;
};

const AvatarForm: FC<TAvatarFormProps> = ({
  handleClose,
  avatar,
  refreshUserData,
}) => {
  const formMethods = useForm();

  const [image, setImage] = useState<string>(defaultImage);

  const formRef = useRef<HTMLFormElement | null>(null);

  const { changeAvatar } = userAPI();

  const preview = (e: SyntheticEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        e.target && setImage(e.target.result as string);
      };
      reader.readAsDataURL(target.files[0]);
    }
  };

  const handleSubmit = async () => {
    const form = formRef.current;
    if (form) {
      const formData = new FormData(form);
      const response = await changeAvatar(formData);

      if (response.data) {
        refreshUserData(response.data);
        handleClose();
      }
    }
  };

  const imageClassname = () => {
    return image === defaultImage ? styles.defaultImage : styles.previewImage;
  };

  const isDisabled = Boolean(
    formRef && formRef.current && formRef.current.checkValidity(),
  );

  useEffect(() => {
    const avatarImage =
      avatar === 'null' || !avatar ? defaultImage : `${RESOURCES_URL}${avatar}`;
    setImage(avatarImage);
  }, [avatar]);

  return (
    <FormProvider {...formMethods}>
      <form
        ref={formRef}
        noValidate={true}
        className={styles.avatarForm}
        onSubmit={formMethods.handleSubmit(handleSubmit)}
      >
        <FormHeading text="Load avatar" />
        <div className={styles.previewContainer}>
          <img className={imageClassname()} src={image} alt="Avatar image" />
        </div>
        <label className={styles.uploadLabel}>
          <input
            className={styles.hideInput}
            type="file"
            required={true}
            {...formMethods.register('avatar')}
            accept="image/*"
            onChange={preview}
          />
          Upload image
        </label>

        <FormButton
          title="Change"
          bottomText="Don't change?"
          linkName="Exit"
          onClick={handleClose}
          disabled={!isDisabled}
        />
      </form>
    </FormProvider>
  );
};

export default AvatarForm;
