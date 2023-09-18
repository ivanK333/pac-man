import { baseFetch } from '../../libs/api';
import {
  URL_AUTH_SIGN_IN,
  URL_AUTH_SIGN_UP,
  URL_AUTH_LOGOUT,
  URL_AUTH_USER,
  SignInData,
  SignUpData,
} from '.';

export const authAPI = () => {
  const signIn = async (data: SignInData) =>
    await baseFetch.post(URL_AUTH_SIGN_IN, data, {
      withCredentials: true,
    });

  const signUp = async (data: SignUpData) =>
    await baseFetch.post(URL_AUTH_SIGN_UP, data, {
      withCredentials: true,
    });

  const logout = async () =>
    await baseFetch.post(URL_AUTH_LOGOUT, undefined, { withCredentials: true });

  const getUser = async () =>
    await baseFetch.get(URL_AUTH_USER, {
      withCredentials: true,
    });

  return {
    getUser,
    logout,
    signUp,
    signIn,
  };
};
