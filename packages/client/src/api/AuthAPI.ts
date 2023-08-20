import { API_URL } from '../constants/APIconfig';

export type AuthResponse = {
  success: boolean;
  user?: User | null;
  users?: User[] | null;
  error: unknown | null | string;
  reason?: string;
};
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

  async signin(data: SigninData): Promise<AuthResponse> {
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

  async signout(): Promise<AuthResponse> {
    const url = `${this.baseUrl}/logout`;

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      Accept: 'application/json: charset=utf-8',
    };

    const response = await fetch(url, {
      method: 'POST',
      headers,
      credentials: 'include',
    });

    if (response.status === 200)
      return {
        success: true,
        error: null,
      };

    return {
      success: false,
      error: 'Unexpected error',
    };
  }

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

  create = undefined;
  // async createp(data: SignupData): Promise<{ id: number }> {
  //   return this.http.post('/signup', data);
  // }

  // update = undefined;
  // delete = undefined;
}

export default new AuthAPI();

// test login
//   RandomHero
//   !QAZ2wsx
