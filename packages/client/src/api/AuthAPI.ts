import { API_URL } from './config';

type TLoginData = {
  login: string;
  password: string;
};
export const LoginAPI = async (data: TLoginData) => {
  const url = `${API_URL}/auth/signin`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json: charset=utf-8',
  };

  const response = await fetch(url, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify(data),
  });

  return response;
};

export const LogoutAPI = async () => {
  const url = `${API_URL}/auth/signout`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json: charset=utf-8',
  };

  const response = await fetch(url, {
    method: 'POST',
    headers,
    credentials: 'include',
  });

  return response;
};
// test login
//   RandomHero
//   !QAZ2wsx
