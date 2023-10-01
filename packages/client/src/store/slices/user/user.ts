import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '../../../api';

const initialState: User = {
  id: 0,
  first_name: '',
  second_name: '',
  display_name: '',
  login: '',
  email: '',
  password: '',
  phone: '',
  avatar: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (_: unknown, action: PayloadAction<User>) => action.payload,
    delUser: () => initialState,
  },
});

export const { addUser, delUser } = userSlice.actions;

export default userSlice.reducer;
