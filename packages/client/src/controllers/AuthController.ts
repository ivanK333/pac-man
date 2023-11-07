import { authAPI, SignInData, SignUpData } from '../api';
import { setLocalStorage } from '../utils/useReadLocalStorage';
import { logout, useAppDispatch } from '../store';
import { userAPI } from '../api/user';

const { getUserOurDB } = userAPI();

export const authController = () => {
  const api = authAPI();
  const dispatch = useAppDispatch();

  const signIn = async (data: SignInData) => {
    try {
      const response = await api.signIn(data);
      getUser();
      return response;
    } catch (error: any) {
      // если юзер залогинен выполнеем перелогин, иначе сыпятся ошибки
      if (error.response?.data?.reason === 'User already in system') {
        await dispatch(logout());
        const res = await api.signIn(data);
        getUser();
        return res;
      }
      return error.response?.data?.reason;
    }
  };

  const getUser = async () => {
    setLocalStorage('isAuthenticated', 'true');
    try {
      const res = await api.getUser();
      const userId = res.data.id;
      setLocalStorage('userId', userId);
      // приходится добавлять запрос к нашей базе, что бы взять theme юзера
      const user = await getUserOurDB(userId);
      const isLightTheme = user.data.lightTheme;
      setLocalStorage('isLightTheme', isLightTheme.toString());
      return res;
    } catch (error: any) {
      return error.response?.data?.reason;
    }
  };

  const signUp = async (data: SignUpData) => {
    try {
      const response = await api.signUp(data);
      getUser();
      return response;
    } catch (error: any) {
      // если юзер существует выполнеем логин
      if (error.response?.data?.reason === 'Login already exists') {
        return await signIn({ login: data.login, password: data.password });
      }
      // если юзер залогинен выполнеем перелогин, иначе сыпятся ошибки
      if (error.response?.data?.reason === 'User already in system') {
        await dispatch(logout());
        return await signIn({ login: data.login, password: data.password });
      }
      return error.response?.data?.reason;
    }
  };

  const getServiceId = async () => {
    try {
      const response = await api.getServiceId();

      const {
        data: { service_id },
      } = response;

      return service_id;
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithOAuth = async (code: string) => {
    try {
      const response = await api.OAuth(code);
      // TODO: проверить создается ли юзер в нашей базе
      getUser();
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return { signIn, signUp, getUser, logout, getServiceId, signInWithOAuth };
};
