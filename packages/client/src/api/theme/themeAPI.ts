import { baseFetch } from '../../libs/api';
import { TCreateTheme } from './types';
import { camelToSnake, snakeToCamel } from '../utils';
import { BASE_URL } from '../../constants/api';

export const themeAPI = () => {
  const getTheme = async (id: string) => {
    try {
      const res = await baseFetch.get(`${BASE_URL}/theme/${id}`);
      const resCamelCase = snakeToCamel(res);
      return resCamelCase;
    } catch (error: any) {
      return error.res?.data?.reason;
    }
  };

  const createTheme = async (id: string) => {
    try {
      const res = await baseFetch.post(`${BASE_URL}/theme/${id}`);
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
      const res = await baseFetch.patch(
        `${BASE_URL}/theme/${id}`,
        dataSnakeCase,
      );
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
