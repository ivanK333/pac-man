import { useLayoutEffect, useState } from 'react';

import styles from './styles.module.scss';
import Avatar from '../../components/Avatar/Avatar';
import ProfileForm from '../../components/ProfileForms/ProfileForm';
import ChangePasswordForm from '../../components/ProfileForms/ChangePasswordForm';
import { ProfileAPI, TUserResponse } from '../../api/ProfileAPI';
import Modal from '../../components/Modal/Modal';
import AvatarForm from '../../components/ProfileForms/AvatarForm';

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
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [user, setUser] = useState<TUserResponse>(initialState);

  const { getUser } = ProfileAPI();
  const handleShowProfile = () => {
    setIsPasswordEdit(true);
  };
  const handleShowPasswordEdit = () => {
    setIsPasswordEdit(false);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const { first_name, display_name, second_name, email, phone, login } = user;

  const refreshUserData = (data: TUserResponse) => {
    setUser(data);
  };

  useLayoutEffect(() => {
    getUser()
      .then((data) => setUser(data))
      .catch((e) => console.error(e));
  }, []);

  console.log(user.avatar);
  return (
    <div className={styles.container}>
      <div className={styles.avatarContainer}>
        <Avatar avatar={'null'} handleOpenModal={handleOpenModal} />
        <p className={styles.username}>{user.login}</p>
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
      {isOpenModal ? (
        <Modal handleClose={handleCloseModal}>
          <AvatarForm
            handleClose={handleCloseModal}
            avatar={user.avatar}
            refreshUserData={refreshUserData}
          />
        </Modal>
      ) : null}
    </div>
  );
};

export default Profile;
