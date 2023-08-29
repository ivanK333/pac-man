import { useEffect } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import styles from './styles.module.scss';
import { TTopicForm } from '../../pages/Topic/Topic';
import { validation } from '../../assets/constants/formValidation';

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
    console.log(formMethods.formState.isValid);
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
          {...formMethods.register('message', validation.message)}
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
