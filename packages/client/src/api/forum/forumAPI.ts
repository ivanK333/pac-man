import { baseFetch } from '../../libs/api';
// import axios from 'axios';
import { TCreateTopic, TLeaveComment, TLeaveMessage, TTopic } from './types';
import { camelToSnake, snakeToCamel } from './utils';

const URL_DB = 'localhost:3001/forum';

export const forumAPI = () => {
  const getTopics = async () => {
    // const res = await baseFetch.get(`http://${URL_DB}/topics`);
    // // console.log('getTopic res API', res);
    // const resCamelCase = snakeToCamel(res);
    // return resCamelCase;

    try {
      const res = await baseFetch.get(`http://${URL_DB}/topics`);
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
    // console.log('createTopic data API', id);
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
      // console.log('=====>', data);
      const res = await baseFetch.post(
        `http://${URL_DB}/comments/${messageId}`,
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
