import { SyntheticEvent, useEffect, useRef, useState } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import styles from './styles.module.scss';
import defaultImage from '../../assets/images/default-avatar.svg';
import ModalHeading from '../ModalHeading/ModalHeading';
import ModalSubmitButton from '../ModalSubmitButton/ModalSubmitButton';
import { ProfileAPI, TUserResponse } from '../../api/ProfileAPI';
import { RESOURCES_URL } from '../../api/config';

type TAvatarFormProps = {
  handleClose: () => void;
  avatar: string;
  refreshUserData: (data: TUserResponse) => void;
};

const AvatarForm: React.FC<TAvatarFormProps> = ({
  handleClose,
  avatar,
  refreshUserData,
}) => {
  const formMethods = useForm();

  const [image, setImage] = useState<string>(defaultImage);

  const formRef = useRef<HTMLFormElement | null>(null);

  const { changeAvatar } = ProfileAPI();

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

  const handleSubmit = () => {
    const form = formRef.current;

    if (form) {
      const data = new FormData(form);
      form.checkValidity() &&
        changeAvatar(data)
          .then((data) => {
            refreshUserData(data);
            handleClose();
          })
          .catch((e) => console.error(e));
    }
  };

  const imageClassname = () => {
    return image === defaultImage ? styles.defaultImage : styles.previewImage;
  };

  const isDisabled = Boolean(
    formRef && formRef.current && formRef.current.checkValidity(),
  );

  useEffect(() => {
    setImage(`${RESOURCES_URL}${avatar}`);
  }, [avatar]);
  return (
    <FormProvider {...formMethods}>
      <form
        ref={formRef}
        noValidate={true}
        className={styles.avatarForm}
        onSubmit={formMethods.handleSubmit(() => handleSubmit())}
      >
        <ModalHeading text="Load avatar" />
        <div className={styles.previewContainer}>
          <img className={imageClassname()} src={image} alt="Avatar image" />
        </div>
        <label className={styles.uploadLabel}>
          <input
            className={styles.hideInput}
            type="file"
            {...formMethods.register('avatar')}
            required={true}
            onChange={preview}
          />
          Upload image
        </label>

        <button
          onClick={(e) => {
            e.preventDefault();
            formMethods.reset();
            setImage(defaultImage);
          }}
          className={styles.resetButton}
        >
          reset
        </button>
        <ModalSubmitButton
          exitParagraphText="don't change?"
          exitButtonText="exit"
          text="change"
          disabled={!isDisabled}
          handleClose={handleClose}
        />
      </form>
    </FormProvider>
  );
};

export default AvatarForm;
