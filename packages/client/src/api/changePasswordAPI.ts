export const checkPromise = (promise: Promise<Response>) => {
  return promise.then(res => (res.ok ? res.json() : Promise.reject(res)))
}

type TChangePasswordData = {
  oldPassword: string
  newPassword: string
}
export const changePasswordAPI = (data: TChangePasswordData) => {
  const url = 'https://ya-praktikum.tech/api/v2/user/password'

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json: charset=utf-8',
  }

  const promise = fetch(url, {
    method: 'PUT',
    headers,
    credentials: 'include',
    body: JSON.stringify(data),
  })
  return checkPromise(promise)
}
