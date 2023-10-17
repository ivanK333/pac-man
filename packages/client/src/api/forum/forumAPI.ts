import { baseFetch } from '../../libs/api';
// import axios from 'axios';
import { TCreateTopic, TLeaveComment, TLeaveMessage, TTopic } from './types';
import { camelToSnake, snakeToCamel } from '../utils';

const URL_DB = 'localhost:3001/forum';

export const forumAPI = () => {
  const getTopics = async () => {
    try {
      const res = await baseFetch.get(`http://${URL_DB}/topics`);
      const resCamelCase = snakeToCamel(res);
      return resCamelCase;
    } catch (error: any) {
      return error.res?.data?.reason;
    }
  };

  const createTopic = async (data: TCreateTopic) => {
    try {
      const dataSnakeCase = camelToSnake(data);
      const res = await baseFetch.post(
        `http://${URL_DB}/topics`,
        dataSnakeCase,
      );
      const resCamelCase = snakeToCamel(res);
      return resCamelCase;
    } catch (error: any) {
      return error.res?.data?.reason;
    }
  };

  const getTopicWithMessages = async (id: string) => {
    try {
      const res = await baseFetch.get(`http://${URL_DB}/topics/${id}`);
      const resCamelCase = snakeToCamel(res);
      return resCamelCase;
    } catch (error: any) {
      return error.res?.data?.reason;
    }
  };

  const leaveMessage = async (data: TLeaveMessage) => {
    try {
      const { topicId } = data;
      const res = await baseFetch.post(
        `http://${URL_DB}/messages/${topicId}`,
        data,
      );
      const resCamelCase = snakeToCamel(res);
      return resCamelCase;
    } catch (error: any) {
      return error.res?.data?.reason;
    }
  };

  const leaveComment = async (data: TLeaveComment) => {
    try {
      const { messageId } = data;
      const res = await baseFetch.post(
        `http://${URL_DB}/comments/${messageId}`,
        data,
      );
      const resCamelCase = snakeToCamel(res);
      return resCamelCase;
    } catch (error: any) {
      return error.res?.data?.reason;
    }
  };

  const getComments = async (messageId: string) => {
    try {
      const res = await baseFetch.get(`http://${URL_DB}/comments/${messageId}`);
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
