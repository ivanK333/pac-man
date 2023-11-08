export type TChangePasswordData = {
  oldPassword: string;
  newPassword: string;
};

export type TProfileForm = {
  id?: string | number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

export type TUpdateTheme = {
  id: string;
  lightTheme: boolean;
};
