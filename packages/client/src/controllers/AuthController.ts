import { AuthAPI, SigninData, AuthResponse, userError } from '../api/AuthAPI';

class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = new AuthAPI();
  }

  async signin(data: SigninData): Promise<AuthResponse> {
    try {
      const res = await this.api.signin(data);
      // check if errors, they come as {reason: error}
      if (res.reason) return userError(res.reason);
      localStorage.setItem('isAuthenticated', 'true');
      return await this.fetchUser();
    } catch (error: unknown) {
      return userError(error);
    }
  }

  async fetchUser(): Promise<AuthResponse> {
    try {
      const user = await this.api.read();
      // check if errors, they come as {reason: error}
      if (user.reason) return userError(user.reason);
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
      const res = await this.api.signout();
      // check if errors, they come as {error: error}
      if (res.success) {
        localStorage.setItem('isAuthenticated', 'false');
      }
      return res;
    } catch (error: unknown) {
      return userError(error);
    }
  }
}

const controller = new AuthController();

export default controller;
