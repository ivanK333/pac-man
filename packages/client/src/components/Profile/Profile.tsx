// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';

import styles from './styles.module.css';
import Avatar from '../Avatar/Avatar';

const Profile = () => {
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <Avatar />
        <div className={styles.formContainer}></div>
      </div>
    </div>
  );
};

export default Profile;
