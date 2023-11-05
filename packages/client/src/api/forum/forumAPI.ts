import { baseFetch } from '../../libs/api';
import { TCreateTopic, TLeaveComment, TLeaveMessage } from './types';
import { camelToSnake, snakeToCamel } from '../utils';
import { BASE_URL } from '../../constants/api';

export const forumAPI = () => {
  const getTopics = async () => {
    try {
      const res = await baseFetch.get(`${BASE_URL}/topics`);
      const resCamelCase = snakeToCamel(res);
      return resCamelCase;
    } catch (error: any) {
      return error.res?.data?.reason;
    }
  };

  const createTopic = async (data: TCreateTopic) => {
    try {
      const dataSnakeCase = camelToSnake(data);
      const res = await baseFetch.post(`${BASE_URL}/topics`, dataSnakeCase);
      const resCamelCase = snakeToCamel(res);
      return resCamelCase;
    } catch (error: any) {
      return error.res?.data?.reason;
    }
  };

  const getTopicWithMessages = async (id: string) => {
    try {
      const res = await baseFetch.get(`${BASE_URL}/topics/${id}`);
      const resCamelCase = snakeToCamel(res);
      return resCamelCase;
    } catch (error: any) {
      return error.res?.data?.reason;
    }
  };

  const leaveMessage = async (data: TLeaveMessage) => {
    try {
      const { topicId, text } = data;
      const res = await baseFetch.post(`${BASE_URL}/messages/${topicId}`, {
        topic_id: topicId,
        text,
      });
      const resCamelCase = snakeToCamel(res);
      return resCamelCase;
    } catch (error: any) {
      return error.res?.data?.reason;
    }
  };

  const leaveComment = async (data: TLeaveComment) => {
    try {
      const { messageId, text } = data;
      // console.log('=====>', data);
      const res = await baseFetch.post(`${BASE_URL}/comments/${messageId}`, {
        message_id: messageId,
        text,
      });
      const resCamelCase = snakeToCamel(res);
      return resCamelCase;
    } catch (error: any) {
      return error.res?.data?.reason;
    }
  };

  const getComments = async (messageId: string) => {
    try {
      const res = await baseFetch.get(`${BASE_URL}/comments/${messageId}`);
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
