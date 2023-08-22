import { useLayoutEffect, useState } from 'react';

import styles from './styles.module.scss';
import Avatar from '../../components/Avatar/Avatar';
import ProfileForm from '../../components/ProfileForms/ProfileForm';
import ChangePasswordForm from '../../components/ProfileForms/ChangePasswordForm';
import { ProfileAPI } from '../../api/ProfileAPI';

type TUserResponse = {
  avatar: string;
  display_name: string;
  email: string;
  first_name: string;
  id: string;
  login: string;
  phone: string;
  second_name: string;
};

const initialState = {
  avatar: '',
  display_name: '',
  email: '',
  first_name: '',
  id: '',
  login: '',
  phone: '',
  second_name: '',
};

const Profile = () => {
  const [isPasswordEdit, setIsPasswordEdit] = useState<boolean>(true);
  const [user, setUser] = useState<TUserResponse>(initialState);

  const { getUser } = ProfileAPI();
  const handleShowProfile = () => {
    setIsPasswordEdit(true);
  };
  const handleShowPasswordEdit = () => {
    setIsPasswordEdit(false);
  };

  const { first_name, display_name, second_name, email, phone, login } = user;

  useLayoutEffect(() => {
    getUser()
      .then((data) => setUser(data))
      .catch((e) => console.error(e));
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.avatarContainer}>
        <Avatar avatar={user.avatar} />
        <p className={styles.username}>Username</p>
      </div>
      <div className={styles.formContainer}>
        {isPasswordEdit ? (
          <ProfileForm
            user={{
              first_name,
              display_name,
              second_name,
              email,
              phone,
              login,
            }}
            handleSwitch={handleShowPasswordEdit}
          />
        ) : (
          <ChangePasswordForm handleSwitch={handleShowProfile} />
        )}
      </div>
    </div>
  );
};

export default Profile;
