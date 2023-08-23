import { SyntheticEvent, useState } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import styles from './styles.module.scss';
import defaultImage from '../../assets/images/default-avatar.svg';
import ModalHeading from '../ModalHeading/ModalHeading';
import ModalSubmitButton from '../ModalSubmitButton/ModalSubmitButton';

const AvatarForm = () => {
  const formMethods = useForm();

  const [image, setImage] = useState<string>(defaultImage);

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

  const imageClassname = () => {
    return image === defaultImage ? styles.defaultImage : styles.previewImage;
  };
  return (
    <FormProvider {...formMethods}>
      <form
        noValidate={true}
        className={styles.avatarForm}
        onSubmit={formMethods.handleSubmit(() => console.log('submit'))}
      >
        <ModalHeading text="Load avatar" />
        <div className={styles.previewContainer}>
          <img className={imageClassname()} src={image} alt="Avatar image" />
        </div>
        <label className={styles.uploadLabel}>
          <input
            className={styles.hideInput}
            type="file"
            required={true}
            {...formMethods.register('avatar')}
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
          disabled={!formMethods.formState.isValid}
        />
      </form>
    </FormProvider>
  );
};

export default AvatarForm;
