import {
  AuthAPI,
  SigninData,
  AuthResponse,
  userError,
  SignupData,
} from '../api/AuthAPI';

class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = new AuthAPI();
  }

  async signin(data: SigninData): Promise<AuthResponse> {
    try {
      const response = await this.api.signin(data);
      // check if errors, they come as {reason: error}
      if (response.reason) {
        return userError(response.reason);
      }
      localStorage.setItem('isAuthenticated', 'true');
      return await this.fetchUser();
    } catch (error: unknown) {
      return userError(error);
    }
  }

  async signup(data: SignupData): Promise<AuthResponse> {
    try {
      const response = await this.api.signup(data);
      // check if errors, they come as {reason: error}
      if (response.reason) {
        return userError(response.reason);
      }
      localStorage.setItem('isAuthenticated', 'true');

      alert('Регистрация прошла');

      return response;
    } catch (error: unknown) {
      alert((error as Record<string, string>).reason);
      return userError(error);
    }
  }

  async fetchUser(): Promise<AuthResponse> {
    try {
      const user = await this.api.read();
      // check if errors, they come as {reason: error}
      if (user.reason) {
        return userError(user.reason);
      }
      return {
        success: true,
        user,
      };
    } catch (error: unknown) {
      return userError(error);
    }
  }

  async signout() {
    try {
      const response = await this.api.signout();
      // check if errors, they come as {error: error}
      if (response.success) {
        localStorage.setItem('isAuthenticated', 'false');
      }
      return response;
    } catch (error: unknown) {
      return userError(error);
    }
  }
}

const controller = new AuthController();

export default controller;
