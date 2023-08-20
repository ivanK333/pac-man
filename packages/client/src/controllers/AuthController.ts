import { AuthAPI, SigninData, User } from '../api/AuthAPI';

type UserResponse = {
  success: boolean;
  user?: User | null;
  users?: User[] | null;
  error: unknown | null | string;
};

const userError = (error: unknown) => ({
  success: false,
  user: null,
  error,
});

class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = new AuthAPI();
  }

  async signin(data: SigninData): Promise<UserResponse> {
    try {
      const res = await this.api.signin(data);
      // console.log(res);
      // check if errors, they come as {reason: error}
      if (res.reason) return userError(res.reason);
      localStorage.setItem('isAuthenticated', 'false');
      return await this.fetchUser();
    } catch (error: unknown) {
      return {
        success: false,
        user: null,
        error,
      };
    }
  }

  // async signup(data: SignupData) {
  //   try {
  //     await this.api.signup(data);
  //     const user = await this.fetchUser();
  //     return {
  //       success: true,
  //       user: user.user,
  //       error: null,
  //     };
  //   } catch (error: unknown) {
  //     return {
  //       success: false,
  //       user: null,
  //       error,
  //     };
  //   }
  // }

  async fetchUser(): Promise<UserResponse> {
    try {
      const user = await this.api.read();
      if (user.reason) return userError(user.reason);
      return {
        success: true,
        user,
        error: null,
      };
    } catch (error: unknown) {
      return userError(error);
    }
  }

  // async logout() {
  //   try {
  //     MessagesController.closeAll();
  //     await this.api.logout();
  //     router.go('/');
  //   } catch (e: unknown) {
  //     console.error(e);
  //   }
  // }
}

const controller = new AuthController();

export default controller;
