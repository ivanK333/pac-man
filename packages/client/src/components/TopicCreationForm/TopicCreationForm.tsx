import { useForm } from 'react-hook-form';

import styles from './styles.module.scss';
import FormHeading from '../FormComponent/FormHeading/FormHeading';
import FormGroup from '../FormComponent/FormGroup/FormGroup';
import InputWithLabel from '../FormComponent/InputWithLabel/InputWithLabel';
import FormButton from '../FormComponent/FormButtonGroup/FormButton';

type TTopicCreationFormProps = {
  handleCloseModal: () => void;
};

const TopicCreationForm: React.FC<TTopicCreationFormProps> = ({
  handleCloseModal,
}) => {
  const formMethods = useForm();
  const handleSubmit = () => {
    console.log(formMethods.formState.isValid);
  };

  return (
    <FormGroup onSubmit={handleSubmit}>
      <FormHeading text="Create a topic" />
      <InputWithLabel
        label="Topic"
        type="text"
        name="topic"
        placeholder="Enter topic name"
        autoFocus={true}
        required={true}
      />
      <article className={styles.group}>
        <label className={styles.label} htmlFor="message">
          Message:
        </label>
        <textarea
          className={styles.textArea}
          {...formMethods.register('messageArea')}
          required={true}
          placeholder="Enter message text"
          name="message"
        />
        {formMethods.formState.errors['message'] && (
          <div className={styles.error}>
            <p>{formMethods.formState.errors['message']?.message as string}</p>
          </div>
        )}
      </article>

      <FormButton
        title="Create"
        linkName="Close"
        bottomText="Don't want to create?"
        onClick={handleCloseModal}
        disabled={!formMethods.formState.isValid}
      />
    </FormGroup>
  );
};

export default TopicCreationForm;
