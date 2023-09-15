import {
  URL_USER_PROFILE,
  URL_USER_PASSWORD,
  URL_USER_PROFILE_AVATAR,
  TProfileForm,
  TChangePasswordData,
} from '.';
import { baseFetch } from '../../libs/api';

export const userAPI = () => {
  const changeProfile = async (data: TProfileForm) =>
    await baseFetch.put(URL_USER_PROFILE, data, { withCredentials: true });

  const changePassword = async (data: TChangePasswordData) =>
    await baseFetch.put(URL_USER_PASSWORD, data, { withCredentials: true });

  const changeAvatar = async (data: FormData) =>
    await baseFetch.put(URL_USER_PROFILE_AVATAR, data, {
      withCredentials: true,
    });

  return { changeAvatar, changePassword, changeProfile };
};
