import { baseFetch } from '../../libs/api';
// import axios from 'axios';
import { TCreateTopic, TLeaveComment, TLeaveMessage, TTopic } from './types';
import image1 from '../../../src/assets/images/сорри.jpg';
import { camelToSnake, snakeToCamel } from './utils';
// import { ApiRequestResponse, apiRequest } from './utils';

const URL_DB = 'localhost:3001/forum';

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const forumAPI = () => {
  const getTopics = async () => {
    const res = await baseFetch.get(`http://${URL_DB}/topics`);
    // console.log('getTopic res API', res);
    const resCamelCase = snakeToCamel(res);
    return resCamelCase;
  };

  const createTopic = async (data: TCreateTopic) => {
    // console.log('createTopic data API', data);
    const dataSnakeCase = camelToSnake(data);
    const res = await baseFetch.post(`http://${URL_DB}/topics`, dataSnakeCase);
    const resCamelCase = snakeToCamel(res);
    return resCamelCase;
  };

  const getTopicWithMessages = async (id: string) => {
    // console.log('createTopic data API', id);
    const res = await baseFetch.get(`http://${URL_DB}/topics/${id}`);
    const resCamelCase = snakeToCamel(res);
    return resCamelCase;
  };

  const leaveMessage = async (data: TLeaveMessage) => {
    const { topicId } = data;
    console.log('-->', data);
    const res = await baseFetch.post(
      `http://${URL_DB}/messages/${topicId}`,
      data,
    );
    console.log(res);
    const resCamelCase = snakeToCamel(res);
    return resCamelCase;
  };

  const leaveComment = async (data: TLeaveComment) => {
    const mockResponse = {
      status: 200,
      data: {
        comment: data.message,
        createdAt: '12:33',
        user: {
          name: '20LETTERSLOGINLENGTH',
          avatar: image1,
          id: '234254',
        },
        likes: [],
        emojis: [],
        id: getRandomInt(1000),
      },
    };
    return await mockResponse;
  };

  return {
    createTopic,
    getTopics,
    getTopicWithMessages,
    leaveMessage,
    leaveComment,
  };
};

// // Example usage:
// const fetchData = async (url: string) => {
//   const response = await apiRequest(url, 'GET');
//   return response;
// };

// const postData = async (url: string, data: any) => {
//   const response = await apiRequest(url, 'POST', data);
//   return response;
// };

// const updateData = async (url: string, data: any) => {
//   const response = await apiRequest(url, 'PUT', data);
//   return response;
// };

// const deleteData = async (url: string) => {
//   const response = await apiRequest(url, 'DELETE');
//   return response;
// };
