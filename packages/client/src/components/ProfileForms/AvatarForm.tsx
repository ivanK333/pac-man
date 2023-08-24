import { SyntheticEvent, useState } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import styles from './styles.module.scss';
import defaultImage from '../../assets/images/default-avatar.svg';
import ModalHeading from '../ModalHeading/ModalHeading';
import ModalSubmitButton from '../ModalSubmitButton/ModalSubmitButton';
import FormGroup from '../FormGroup/FormGroup';
import FormButtonGroup from '../../components/FormButtonGroup/FormButton';

type TAvatarFormProps = {
  handleClose: () => void;
};

const AvatarForm: React.FC<TAvatarFormProps> = ({ handleClose }) => {
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

  const handleSubmit = () => {
    console.log('Submit');
  };

  const imageClassname = () => {
    return image === defaultImage ? styles.defaultImage : styles.previewImage;
  };
  return (
    <FormGroup onSubmit={handleSubmit}>
      <ModalHeading text="Load avatar" />
      <div className={styles.previewContainer} onChange={preview}>
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
      <FormButtonGroup
        title="Change"
        bottomText="Don't change?"
        linkName="Exit"
        onClick={handleClose}
      />
    </FormGroup>
  );
};

export default AvatarForm;
