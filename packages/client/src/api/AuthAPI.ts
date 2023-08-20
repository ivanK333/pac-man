import { API_URL } from '../constants/APIconfig';

export interface SigninData {
  login: string;
  password: string;
}

export interface SignupData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface User {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
  reason?: string;
}

export class AuthAPI {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${API_URL}/auth`;
  }

  async signin(data: SigninData): Promise<any> {
    const url = `${this.baseUrl}/signin`;

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

    if (response.status === 200)
      return {
        success: true,
        error: null,
      };

    return response.json();
  }

  // async signup(data: SignupData): Promise<{ id: number }> {
  //   return this.http.post('/signup', data);
  // }

  async read(): Promise<User> {
    const url = `${this.baseUrl}/user`;

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      Accept: 'application/json: charset=utf-8',
    };

    const response = await fetch(url, {
      method: 'GET',
      headers,
      credentials: 'include',
    });

    return response.json();
  }

  // async logout() {
  //   return this.http.post('/logout');
  // }

  create = undefined;
  update = undefined;
  delete = undefined;
}

export default new AuthAPI();

// type TLoginData = {
//   login: string;
//   password: string;
// };

// export interface SignupData {
//   first_name: string;
//   second_name: string;
//   login: string;
//   email: string;
//   password: string;
//   phone: string;
// }

// export interface User {
//   id: number;
//   first_name: string;
//   second_name: string;
//   display_name: string;
//   login: string;
//   email: string;
//   password: string;
//   phone: string;
//   avatar: string;
// }

// export const AuthAPI = async (data: TLoginData) => {
//   const url = `${API_URL}/auth/signin`;

//   const headers: HeadersInit = {
//     'Content-Type': 'application/json',
//     Accept: 'application/json: charset=utf-8',
//   };

//   const response = await fetch(url, {
//     method: 'POST',
//     headers,
//     credentials: 'include',
//     body: JSON.stringify(data),
//   });

//   return response;
// };

// export const LogoutAPI = async () => {
//   const url = `${API_URL}/auth/signout`;

//   const headers: HeadersInit = {
//     'Content-Type': 'application/json',
//     Accept: 'application/json: charset=utf-8',
//   };

//   const response = await fetch(url, {
//     method: 'POST',
//     headers,
//     credentials: 'include',
//   });

//   return response;
// };

// test login
//   RandomHero
//   !QAZ2wsx
