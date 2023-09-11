import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserState } from './types';

const initialState: UserState = {
  avatar: '',
  display_name: '',
  email: '',
  first_name: '',
  id: '',
  login: '',
  phone: '',
  second_name: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (_, action: PayloadAction<UserState>) => action.payload,
    delUser: () => initialState,
  },
});

export const { addUser, delUser } = userSlice.actions;

export default userSlice.reducer;
