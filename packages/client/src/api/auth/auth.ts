import { baseFetch } from '../../libs/api';
import {
  URL_AUTH_SIGN_IN,
  URL_AUTH_SIGN_UP,
  URL_AUTH_LOGOUT,
  URL_AUTH_USER,
  URL_OAUTH_SERVICE_ID,
  URL_OAUTH_YANDEX,
  SignInData,
  SignUpData,
} from '.';
import { REDIRECT_URI } from '../../constants/api';

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

  const getServiceId = async () =>
    await baseFetch.get(URL_OAUTH_SERVICE_ID, {
      withCredentials: true,
    });

  const OAuth = async (code: string) =>
    await baseFetch.post(
      URL_OAUTH_YANDEX,
      {
        code,
        redirect_uri: REDIRECT_URI,
      },
      {
        withCredentials: true,
      },
    );

  return {
    getUser,
    getServiceId,
    logout,
    signUp,
    signIn,
    OAuth,
  };
};
