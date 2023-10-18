import { baseFetch } from '../../libs/api';
import { TCreateTopic, TLeaveComment, TLeaveMessage } from './types';
import { camelToSnake, snakeToCamel } from './utils';

const port = __SERVER_PORT__ || 3005;
const baseUrl = `http://localhost:${port}/forum`;

export const forumAPI = () => {
  const getTopics = async () => {
    try {
      const res = await baseFetch.get(`${baseUrl}/topics`);
      const resCamelCase = snakeToCamel(res);
      return resCamelCase;
    } catch (error: any) {
      return error.res?.data?.reason;
    }
  };

  const createTopic = async (data: TCreateTopic) => {
    // console.log('createTopic data API', data);
    try {
      const dataSnakeCase = camelToSnake(data);
      const res = await baseFetch.post(`${baseUrl}/topics`, dataSnakeCase);
      const resCamelCase = snakeToCamel(res);
      return resCamelCase;
    } catch (error: any) {
      return error.res?.data?.reason;
    }
  };

  const getTopicWithMessages = async (id: string) => {
    // console.log('createTopic data API', id);
    try {
      const res = await baseFetch.get(`${baseUrl}/topics/${id}`);
      const resCamelCase = snakeToCamel(res);
      return resCamelCase;
    } catch (error: any) {
      return error.res?.data?.reason;
    }
  };

  const leaveMessage = async (data: TLeaveMessage) => {
    try {
      const { topicId } = data;
      const res = await baseFetch.post(`${baseUrl}/messages/${topicId}`, data);
      const resCamelCase = snakeToCamel(res);
      return resCamelCase;
    } catch (error: any) {
      return error.res?.data?.reason;
    }
  };

  const leaveComment = async (data: TLeaveComment) => {
    try {
      const { messageId } = data;
      // console.log('=====>', data);
      const res = await baseFetch.post(
        `${baseUrl}/comments/${messageId}`,
        data,
      );
      const resCamelCase = snakeToCamel(res);
      // console.log('+++++>', resCamelCase);
      return resCamelCase;
    } catch (error: any) {
      return error.res?.data?.reason;
    }
  };

  const getComments = async (messageId: string) => {
    // console.log('getComments data API', messageId);
    try {
      const res = await baseFetch.get(`${baseUrl}/comments/${messageId}`);
      const resCamelCase = snakeToCamel(res);
      return resCamelCase;
    } catch (error: any) {
      return error.res?.data?.reason;
    }
  };

  return {
    createTopic,
    getTopics,
    getTopicWithMessages,
    leaveMessage,
    leaveComment,
    getComments,
  };
};
