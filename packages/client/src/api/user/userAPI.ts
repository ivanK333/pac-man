import {
  URL_USER_PROFILE,
  URL_USER_PASSWORD,
  URL_USER_PROFILE_AVATAR,
  BASE_URL_USER,
  TProfileForm,
  TChangePasswordData,
  TUpdateTheme,
} from '.';
import { baseFetch } from '../../libs/api';
import { camelToSnake, snakeToCamel } from '../utils';
import { BASE_URL } from '../../constants/api';

export const userAPI = () => {
  const changeProfile = async (data: TProfileForm) =>
    await baseFetch.put(URL_USER_PROFILE, data, { withCredentials: true });

  const changePassword = async (data: TChangePasswordData) =>
    await baseFetch.put(URL_USER_PASSWORD, data, { withCredentials: true });

  const changeAvatar = async (data: FormData) =>
    await baseFetch.put(URL_USER_PROFILE_AVATAR, data, {
      withCredentials: true,
      headers: undefined,
      transformRequest: [(data) => data],
    });

  const getUserOurDB = async (id: string) => {
    try {
      const res = await baseFetch.get(`${BASE_URL}/user/${id}`);
      const resCamelCase = snakeToCamel(res);
      return resCamelCase;
    } catch (error: any) {
      return error.res?.data?.reason;
    }
  };

  const updateTheme = async (data: TUpdateTheme) => {
    try {
      const { id, lightTheme } = data;
      const dataSnakeCase = camelToSnake({ lightTheme });
      const res = await baseFetch.patch(
        `${BASE_URL}/user/${id}/theme`,
        dataSnakeCase,
      );
      const resCamelCase = snakeToCamel(res);
      return resCamelCase;
    } catch (error: any) {
      return error.res?.data?.reason;
    }
  };
  return {
    changeAvatar,
    changePassword,
    changeProfile,
    getUserOurDB,
    updateTheme,
  };
};
