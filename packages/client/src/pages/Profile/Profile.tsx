import { useEffect, useState } from 'react';

import styles from './styles.module.scss';
import Avatar from '../../components/Avatar/Avatar';
import ProfileForm from './components/ProfileForms/ProfileForm';
import ChangePasswordForm from './components/ProfileForms/ChangePasswordForm';
import { User } from '../../api';
import { authController } from '../../controllers/AuthController';
import Modal from '../../components/Modal/Modal';
import AvatarForm from './components/ProfileForms/AvatarForm';

const initialState = {
  avatar: '',
  display_name: '',
  password: '',
  email: '',
  first_name: '',
  id: 0,
  login: '',
  phone: '',
  second_name: '',
};

const Profile = () => {
  const [isPasswordEdit, setIsPasswordEdit] = useState<boolean>(true);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [user, setUser] = useState<User>(initialState);

  const { getUser } = authController();
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

  const refreshUserData = (data: User) => {
    setUser(data);
  };

  const getUserInfo = async () => {
    const response = await getUser();
    if (response?.data) {
      setUser(response.data);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.avatarContainer}>
        <Avatar avatar={user.avatar} handleOpenModal={handleOpenModal} />
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
      {isOpenModal && (
        <Modal>
          <AvatarForm
            handleClose={handleCloseModal}
            avatar={user.avatar}
            refreshUserData={refreshUserData}
          />
        </Modal>
      )}
    </div>
  );
};

export default Profile;
