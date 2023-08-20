import { AuthAPI, SigninData, AuthResponse } from '../api/AuthAPI';

const userError = (error: unknown) => ({
  success: false,
  error,
});

class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = new AuthAPI();
  }

  async signin(data: SigninData): Promise<AuthResponse> {
    try {
      const res = await this.api.signin(data);
      // console.log(res);
      // check if errors, they come as {reason: error}
      if (res.reason) return userError(res.reason);
      localStorage.setItem('isAuthenticated', 'false');
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
      // check if errors, they come as {reason: error}
      if (res.reason) return userError(res.reason);
      localStorage.setItem('isAuthenticated', 'false');
      return await this.fetchUser();
    } catch (error: unknown) {
      return userError(error);
    }
  }

  // async signup(data: SignupData) {
  //   try {
  //     await this.api.signup(data);
  //     const user = await this.fetchUser();
  //     return {
  //       success: true,
  //       user: user.user,
  //     };
  //   } catch (error: unknown) {
  //     return userError(error);
  //   }
  // }
}

const controller = new AuthController();

export default controller;
