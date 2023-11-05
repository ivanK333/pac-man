import { baseFetch } from '../../libs/api';
import { TCreateTheme } from './types';
import { camelToSnake, snakeToCamel } from '../utils';
const localhost = 'http://localhost:3005';

const API_URL = `${localhost}/theme`;
export const themeAPI = () => {
  const getTheme = async (id: string) => {
    try {
      const res = await baseFetch.get(`${API_URL}/${id}`);
      const resCamelCase = snakeToCamel(res);
      return resCamelCase;
    } catch (error: any) {
      return error.res?.data?.reason;
    }
  };

  const createTheme = async (id: string) => {
    try {
      const res = await baseFetch.post(`${API_URL}/${id}`);
      const resCamelCase = snakeToCamel(res);
      return resCamelCase;
    } catch (error: any) {
      return error.res?.data?.reason;
    }
  };

  const updateTheme = async (data: TCreateTheme) => {
    try {
      const { id, lightTheme } = data;
      const dataSnakeCase = camelToSnake({ lightTheme });
      const res = await baseFetch.patch(`${API_URL}/${id}`, dataSnakeCase);
      const resCamelCase = snakeToCamel(res);
      return resCamelCase;
    } catch (error: any) {
      return error.res?.data?.reason;
    }
  };

  return {
    getTheme,
    createTheme,
    updateTheme,
  };
};
