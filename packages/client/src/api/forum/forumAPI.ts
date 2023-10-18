import { baseFetch } from '../../libs/api';
// import axios from 'axios';
import { TCreateTopic, TLeaveComment, TLeaveMessage } from './types';
import { camelToSnake, snakeToCamel } from '../utils';

const host = 'http://localhost:3005';
const URL_DB = `${host}/forum`;

export const forumAPI = () => {
  const getTopics = async () => {
    try {
      const res = await baseFetch.get(`${URL_DB}/topics`);
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
      const res = await baseFetch.post(`${URL_DB}/topics`, dataSnakeCase);
      const resCamelCase = snakeToCamel(res);
      return resCamelCase;
    } catch (error: any) {
      return error.res?.data?.reason;
    }
  };

  const getTopicWithMessages = async (id: string) => {
    // console.log('createTopic data API', id);
    try {
      const res = await baseFetch.get(`${URL_DB}/topics/${id}`);
      const resCamelCase = snakeToCamel(res);
      return resCamelCase;
    } catch (error: any) {
      return error.res?.data?.reason;
    }
  };

  const leaveMessage = async (data: TLeaveMessage) => {
    try {
      const { topicId, text } = data;
      const res = await baseFetch.post(`${URL_DB}/messages/${topicId}`, {
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
      const res = await baseFetch.post(`${URL_DB}/comments/${messageId}`, {
        message_id: messageId,
        text,
      });
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
      const res = await baseFetch.get(`${URL_DB}/comments/${messageId}`);
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
