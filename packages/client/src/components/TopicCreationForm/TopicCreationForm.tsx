import Input from '../InputWithLabel/InputWithLabel';
import FormButtonGroup from '../FormButtonGroup/FormButton';
import FormGroup from '../FormGroup/FormGroup';

type TTopicCreationFormProps = {
  handleCloseModal: () => void;
};

const TopicCreationForm: React.FC<TTopicCreationFormProps> = ({
  handleCloseModal,
}) => {
  const handleSubmit = () => {
    console.log('submit');
  };
  return (
    <FormGroup onSubmit={handleSubmit}>
      <Input
        label="Topic"
        type="text"
        name="topic"
        placeholder="Enter topic name"
        autoFocus={true}
      />
      <Input
        label="Message"
        type="text"
        name="message"
        placeholder="Enter message text"
      />
      <FormButtonGroup
        title="Create"
        linkName="Close"
        bottomText="don't want to create?"
        onClick={handleCloseModal}
      />
    </FormGroup>
  );
};

export default TopicCreationForm;
