import { useState } from 'react';

import styles from './styles.module.scss';
import Avatar from '../Avatar/Avatar';
import ProfileForm from '../ProfileForms/ProfileForm';
import ChangePasswordForm from '../ProfileForms/ChangePasswordForm';

const Profile = () => {
  const [isPasswordEdit, setIsPasswordEdit] = useState<boolean>(true);
  const handleShowProfile = () => {
    setIsPasswordEdit(true);
  };
  const handleShowPasswordEdit = () => {
    setIsPasswordEdit(false);
  };
  return (
    <div className={styles.container}>
      <div className={styles.avatarContainer}>
        <Avatar />
        <p className={styles.username}>Username</p>
      </div>
      <div className={styles.formContainer}>
        {isPasswordEdit ? (
          <ProfileForm handleSwitch={handleShowPasswordEdit} />
        ) : (
          <ChangePasswordForm handleSwitch={handleShowProfile} />
        )}
      </div>
    </div>
  );
};

export default Profile;
