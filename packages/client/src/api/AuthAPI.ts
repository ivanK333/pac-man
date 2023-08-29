import { API_URL } from './config';

export type AuthResponse = {
  success: boolean;
  user?: User | null;
  users?: User[] | null;
  error?: unknown | null | string;
  reason?: string; // swagger error response is {reason: string}
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
  reason?: string; // swagger error response is {reason: string}
}

export const userError = (error: unknown) => ({
  success: false,
  error,
});

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

  async signup(data: SignupData): Promise<AuthResponse> {
    const url = `${this.baseUrl}/signup`;

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

    return userError('Unexpected error');
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
}

export default new AuthAPI();

// test login
//   RandomHero
//   !QAZ2wsx
