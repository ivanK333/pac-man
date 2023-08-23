import { ReactNode } from 'react';

import styles from './styles.module.scss';

type TModal = {
  handleClose: () => void;
  children: ReactNode;
};

const Modal: React.FC<TModal> = ({ handleClose, children }) => {
  return (
    <div className={styles.container} onClick={handleClose}>
      <div
        className={styles.contentContainer}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
