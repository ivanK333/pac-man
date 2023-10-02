import axios from 'axios';

import { API_URL } from '../constants/api';
import { UserRepository } from '../api/auth/UserService';
import { User } from '../api';

export class YandexAPIRepository implements UserRepository {
  async getCurrent(): Promise<User> {
    const { data } = await axios.get(`${API_URL}/auth/user`, {
      withCredentials: true,
    });
    return data;
  }
}
