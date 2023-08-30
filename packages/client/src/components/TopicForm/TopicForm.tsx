import { FormProvider, useForm } from 'react-hook-form';

import styles from './styles.module.scss';
import { TTopicForm } from '../../pages/Topic/Topic';

type TTopicFormProps = {
  onSubmit: (data: TTopicForm) => void;
  placeholder: string;
};

const TopicForm: React.FC<TTopicFormProps> = ({ onSubmit, placeholder }) => {
  const formMethods = useForm<TTopicForm>();

  const handleSubmit = (data: TTopicForm) => {
    formMethods.formState.isValid && onSubmit(data);
    console.log(formMethods.formState.isValid);
  };
  return (
    <FormProvider {...formMethods}>
      <form
        noValidate={true}
        className={styles.form}
        onSubmit={formMethods.handleSubmit((data) => handleSubmit(data))}
      >
        <input
          className={styles.input}
          type="text"
          placeholder={placeholder}
          {...formMethods.register('message')}
          required={true}
          autoFocus={true}
        />

        <button
          className={styles.submit}
          disabled={!formMethods.formState.isValid}
        >
          &#62;
        </button>
      </form>
    </FormProvider>
  );
};

export default TopicForm;
