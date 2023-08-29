import { useEffect } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import styles from './styles.module.scss';
import { TTopicForm } from '../../pages/Topic/Topic';

type TTopicFormProps = {
  onSubmit: (data: TTopicForm) => void;
  placeholder: string;
  autoFocus: boolean;
};

const TopicForm: React.FC<TTopicFormProps> = ({
  onSubmit,
  placeholder,
  autoFocus,
}) => {
  const formMethods = useForm<TTopicForm>();
  const handleSubmit = (data: TTopicForm) => {
    formMethods.formState.isValid && onSubmit(data);
  };
  useEffect(() => {
    autoFocus && formMethods.setFocus('message');
  }, [formMethods.setFocus]);
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
