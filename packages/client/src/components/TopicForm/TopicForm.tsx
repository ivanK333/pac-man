import { FormProvider, useForm } from 'react-hook-form';

import styles from './styles.module.scss';
import { TTopicForm } from '../../pages/Topic/Topic';

type TTopicFormProps = {
  onSubmit: (data: TTopicForm) => void;
  placeholder: string;
};

const TopicForm: React.FC<TTopicFormProps> = ({ onSubmit, placeholder }) => {
  const formMethods = useForm<TTopicForm>();
  const { formState, register, handleSubmit, setValue } = formMethods;

  const submit = async (data: TTopicForm) => {
    console.log(data);
    onSubmit(data);
    setValue('message', '');
  };

  return (
    <FormProvider {...formMethods}>
      <form
        noValidate={true}
        className={styles.form}
        onSubmit={handleSubmit(submit)}
      >
        <input
          className={styles.input}
          type="text"
          placeholder={placeholder}
          {...register('message')}
          required={true}
          autoFocus={true}
        />

        <button
          className={styles.submit}
          disabled={!formState.isValid}
          type="submit"
        >
          &#62;
        </button>
      </form>
    </FormProvider>
  );
};

export default TopicForm;
