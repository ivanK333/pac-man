import { HEADERS } from '../../constants/api';
import {
  URL_USER_PROFILE,
  URL_USER_PASSWORD,
  URL_USER_PROFILE_AVATAR,
  TProfileForm,
  TChangePasswordData,
} from '.';

export const userAPI = () => {
  const changeProfile = async (data: TProfileForm): Promise<TProfileForm> => {
    const response = await fetch(URL_USER_PROFILE, {
      method: 'PUT',
      headers: HEADERS,
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (response.status === 200)
      return {
        success: true,
        error: null,
      };

    return response.json();
  };
  const changePassword = async (data: TChangePasswordData) => {
    const response = await fetch(URL_USER_PASSWORD, {
      method: 'PUT',
      headers: HEADERS,
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (response.status === 200)
      return {
        success: true,
        error: null,
      };

    return response.json();
  };
  const changeAvatar = async (data: FormData) => {
    const response = await fetch(URL_USER_PROFILE_AVATAR, {
      method: 'PUT',
      credentials: 'include',
      body: data,
    });

    if (response.status === 200)
      return {
        success: true,
        error: null,
      };

    return response.json();
  };

  return { changeAvatar, changePassword, changeProfile };
};
