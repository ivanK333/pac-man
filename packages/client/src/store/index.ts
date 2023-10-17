import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { URL_AUTH_LOGOUT, User } from '../api';
import { removeItemLocalStorage } from '../utils/useReadLocalStorage';
import { baseFetch } from '../libs/api';
// import { ThemeSlice } from './slice/themeSlice';
// import ThemeReducer from './slice/themeSlice';

interface IUserService {
  getCurrentUser(): Promise<User>;
}

const loadMe = createAsyncThunk<User>(
  'root/loadGreeting',
  async (_, thunkApi) => {
    const service: IUserService = thunkApi.extra as IUserService;
    return service.getCurrentUser();
  },
);

const logout = createAsyncThunk('root/logout', async () => {
  try {
    const response = await baseFetch.post(URL_AUTH_LOGOUT, undefined, {
      withCredentials: true,
    });
    removeItemLocalStorage('isAuthenticated');
    return response;
  } catch (error: any) {
    return error.response?.data?.reason;
  }
});

interface UserSlice {
  profile: User | null;
  isLoaded: boolean;
}

export interface StoreState {
  user: UserSlice;
  // isLightTheme: ThemeSlice;
}

function createStore(service: IUserService, initialState?: StoreState) {
  const rootSlice = createSlice({
    name: 'user',
    initialState: {
      profile: null,
      isLoaded: false,
    } as UserSlice,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(logout.fulfilled, (store) => {
        store.isLoaded = true;
        store.profile = null;
      });
      builder.addCase(loadMe.pending, (store) => {
        store.isLoaded = false;
      });
      builder.addCase(loadMe.rejected, (store) => {
        store.isLoaded = true;
        store.profile = null;
      });
      builder.addCase(loadMe.fulfilled, (store, action) => {
        const { payload } = action;
        store.profile = payload;
        store.isLoaded = true;
      });
    },
  });

  return configureStore({
    reducer: {
      user: rootSlice.reducer,
      // isLightTheme: ThemeReducer,
    },
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        thunk: {
          extraArgument: service,
        },
      });
    },
  });
}

export type AppDispatch = ReturnType<typeof createStore>['dispatch'];
export const useAppDispatch: () => AppDispatch = useDispatch;

export { createStore, loadMe, logout };
