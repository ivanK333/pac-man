import { useForm } from 'react-hook-form';

import FormHeading from '../FormComponent/FormHeading/FormHeading';
import FormGroup from '../FormComponent/FormGroup/FormGroup';
import InputWithLabel from '../FormComponent/InputWithLabel/InputWithLabel';
import FormButton from '../FormComponent/FormButtonGroup/FormButton';
import TextAreaWithLabel from '../FormComponent/TextAreaWithLabel/TextAreaWithLabel';
import { TCreateTopic } from '../../api';

type TTopicCreationFormProps = {
  handleCloseModal: () => void;
  onSubmit: (data: TCreateTopic) => void;
};

const TopicCreationForm: React.FC<TTopicCreationFormProps> = ({
  handleCloseModal,
  onSubmit,
}) => {
  const formMethods = useForm();
  const { formState } = formMethods;

  return (
    <FormGroup onSubmit={onSubmit}>
      <FormHeading text="Create a topic" />
      <InputWithLabel
        label="Topic"
        type="text"
        name="title"
        placeholder="Enter topic name"
        autoFocus={true}
        required={true}
      />

      <TextAreaWithLabel
        label="Message:"
        id="text"
        name="text"
        placeholder="Enter text"
        autoFocus={false}
        required={true}
      />

      <FormButton
        title="Create"
        linkName="Close"
        bottomText="Don't want to create?"
        onClick={handleCloseModal}
        disabled={!formState.isValid}
      />
    </FormGroup>
  );
};

export default TopicCreationForm;
