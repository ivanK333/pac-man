import { authAPI, SignInData, SignUpData } from '../api';
import { setLocalStorage } from '../utils/useReadLocalStorage';
import { logout, useAppDispatch } from '../store';

export const authController = () => {
  const api = authAPI();
  const dispatch = useAppDispatch();

  const signIn = async (data: SignInData) => {
    try {
      const response = await api.signIn(data);
      setLocalStorage('isAuthenticated', 'true');
      return response;
    } catch (error: any) {
      // если юзер залогинен выполнеем перелогин, иначе сыпятся ошибки
      if (error.response?.data?.reason === 'User already in system') {
        await dispatch(logout());
        const res = await api.signIn(data);
        setLocalStorage('isAuthenticated', 'true');
        return res;
      }
      return error.response?.data?.reason;
    }
  };

  const getUser = async () => {
    try {
      return await api.getUser();
    } catch (error: any) {
      return error.response?.data?.reason;
    }
  };

  const signUp = async (data: SignUpData) => {
    try {
      return await api.signUp(data);
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
      setLocalStorage('isAuthenticated', 'true');
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return { signIn, signUp, getUser, logout, getServiceId, signInWithOAuth };
};
