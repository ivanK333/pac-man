import {
  USER_PROFILE_URL,
  USER_PASSWORD_URL,
  USER_PROFILE_AVATAR_URL,
  USER_INFO_URL,
} from './config';

export type TChangePasswordData = {
  oldPassword: string;
  newPassword: string;
};

export type TProfileForm = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

export type TUserResponse = {
  avatar: string;
  display_name: string;
  email: string;
  first_name: string;
  id: string;
  login: string;
  phone: string;
  second_name: string;
};

export enum emptyResponse {
  ok = 'OK',
}

export const ProfileAPI = () => {
  const checkPromise = (promise: Promise<Response>): Promise<TUserResponse> => {
    return promise.then((res) => (res.ok ? res.json() : Promise.reject(res)));
  };

  const checkEmptyDataPromise = (promise: Promise<Response>) => {
    return promise.then((res) =>
      res.ok ? emptyResponse.ok : Promise.reject(res),
    );
  };

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json: charset=utf-8',
  };

  const changeProfile = (data: TProfileForm) => {
    const promise = fetch(USER_PROFILE_URL, {
      method: 'PUT',
      headers,
      credentials: 'include',
      body: JSON.stringify(data),
    });
    return checkPromise(promise);
  };
  const changePassword = (data: TChangePasswordData) => {
    const promise = fetch(USER_PASSWORD_URL, {
      method: 'PUT',
      headers,
      credentials: 'include',
      body: JSON.stringify(data),
    });
    return checkEmptyDataPromise(promise);
  };
  const changeAvatar = (data: FormData) => {
    const promise = fetch(USER_PROFILE_AVATAR_URL, {
      method: 'PUT',
      credentials: 'include',
      body: data,
    });
    return checkPromise(promise);
  };

  const getUser = () => {
    const promise = fetch(USER_INFO_URL, {
      method: 'GET',
      headers,
      credentials: 'include',
    });
    return checkPromise(promise);
  };

  return { getUser, changeAvatar, changePassword, changeProfile };
};
