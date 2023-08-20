import {
  USER_PROFILE_URL,
  USER_PASSWORD_URL,
  USER_PROFILE_AVATAR_URL,
} from './config';

export const checkPromise = (promise: Promise<Response>) => {
  return promise.then((res) => (res.ok ? res.json() : Promise.reject(res)));
};

const headers: HeadersInit = {
  'Content-Type': 'application/json',
  Accept: 'application/json: charset=utf-8',
};

type TChangePasswordData = {
  oldPassword: string;
  newPassword: string;
};

export const ChangeProfileAPI = (data: TChangePasswordData) => {
  const promise = fetch(USER_PROFILE_URL, {
    method: 'PUT',
    headers,
    credentials: 'include',
    body: JSON.stringify(data),
  });
  return checkPromise(promise);
};
export const ChangePasswordAPI = (data: TChangePasswordData) => {
  const promise = fetch(USER_PASSWORD_URL, {
    method: 'PUT',
    headers,
    credentials: 'include',
    body: JSON.stringify(data),
  });
  return checkPromise(promise);
};
export const ChangeAvatarAPI = (data: FormData) => {
  const promise = fetch(USER_PROFILE_AVATAR_URL, {
    method: 'PUT',
    credentials: 'include',
    body: data,
  });
  return checkPromise(promise);
};
