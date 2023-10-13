// import { baseFetch } from '../../libs/api';
import axios from 'axios';

import { TCreateTopic, TLeaveComment, TLeaveMessage } from './types';
import { fakeTopics } from '../../constants/fakeTopics';
import image1 from '../../../src/assets/images/сорри.jpg';

const URL_DB = 'localhost:3001/forum';

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};
const fetchData = async (url: string) => {
  try {
    const response = await axios.get(url);
    return { status: 200, data: response.data };
  } catch (error) {
    console.error('Error:', error);
    return { error };
  }
};

export const forumAPI = () => {
  const getAllTopics = async () => {
    const res = await fetchData(`http://${URL_DB}/topics`);
    console.log('res API', res);
    return res;
  };

  const getTopicById = async (id: string) => {
    const topic = await fakeTopics.find((topic) => topic.id === id);
    return { status: 200, data: topic };
  };

  const createTopic = async (data: TCreateTopic) => {
    const mockResponse = {
      status: 200,
      data: {
        topicName: data.title,
        count: 0,
        id: getRandomInt(1000),
      },
    };

    return await mockResponse;
    //   await baseFetch.put(URL, data, { withCredentials: true });
  };

  const leaveMessage = async (data: TLeaveMessage) => {
    const mockResponse = {
      status: 200,
      data: {
        message: data.message,
        createdAt: '12:33',
        user: {
          name: '20lettersloginlength',
          avatar: image1,
          id: '234234',
        },
        id: getRandomInt(1000),
        comments: [],
        likes: [],
        emojis: [],
      },
    };
    return await mockResponse;
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
    getAllTopics,
    getTopicById,
    leaveMessage,
    leaveComment,
  };
};
