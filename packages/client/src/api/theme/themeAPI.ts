import { baseFetch } from '../../libs/api';
import { TCreateTheme } from './types';
import { camelToSnake, snakeToCamel } from '../utils';

const port = process.env.SERVER_PORT || 3005;
const baseUrl = `http://localhost:${port}/profile/theme`;

export const themeAPI = () => {
  const getTheme = async (id: string) => {
    try {
      const res = await baseFetch.get(`${baseUrl}/${id}`);
      const resCamelCase = snakeToCamel(res);
      return resCamelCase;
    } catch (error: any) {
      return error.res?.data?.reason;
    }
  };

  const createTheme = async (id: string) => {
    try {
      const res = await baseFetch.post(`${baseUrl}/${id}`);
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
      const res = await baseFetch.patch(`${baseUrl}/${id}`, dataSnakeCase);
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
