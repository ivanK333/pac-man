import styles from './styles.module.scss';

type TModalSubmitButtonProps = {
  text: string;
  disabled: boolean;
  exitButtonText: string;
  exitParagraphText: string;
  handleClose: () => void;
};

const ModalSubmitButton: React.FC<TModalSubmitButtonProps> = ({
  text,
  disabled,
  exitButtonText,
  exitParagraphText,
  handleClose,
}) => {
  return (
    <div className={styles.container}>
      <button className={styles.button} type="submit" disabled={disabled}>
        {text}
      </button>
      <p className={styles.paragraph}>
        {exitParagraphText}
        <button
          type="button"
          className={styles.exitButton}
          onClick={handleClose}
        >
          {exitButtonText}
        </button>
      </p>
    </div>
  );
};

export default ModalSubmitButton;
