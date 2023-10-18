import { baseFetch } from '../../libs/api';
import { TCreateTheme } from './types';
import { camelToSnake, snakeToCamel } from '../utils';

const URL_DB = 'localhost:3001/theme';

export const themeAPI = () => {
  const getTheme = async () => {
    try {
      const res = await baseFetch.get(`http://${URL_DB}`);
      console.log('===>', res);
      const resCamelCase = snakeToCamel(res);
      return resCamelCase;
    } catch (error: any) {
      return error.res?.data?.reason;
    }
  };

  const createTheme = async (data: TCreateTheme) => {
    try {
      const dataSnakeCase = camelToSnake(data);
      const res = await baseFetch.patch(`http://${URL_DB}`, dataSnakeCase);
      const resCamelCase = snakeToCamel(res);
      return resCamelCase;
    } catch (error: any) {
      return error.res?.data?.reason;
    }
  };

  const updateTheme = async (data: TCreateTheme) => {
    try {
      const dataSnakeCase = camelToSnake(data);
      const res = await baseFetch.post(`http://${URL_DB}`, dataSnakeCase);
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
