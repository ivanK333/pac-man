import { checkPromise } from './changePasswordAPI';

export const changeAvatarAPI = (data: FormData) => {
  const url = 'https://ya-praktikum.tech/api/v2/user/profile/avatar';

  const promise = fetch(url, {
    method: 'PUT',
    credentials: 'include',
    body: data,
  });
  return checkPromise(promise);
};
