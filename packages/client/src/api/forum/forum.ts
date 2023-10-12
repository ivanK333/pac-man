// import { baseFetch } from '../../libs/api';
import { TCreateTopic, TLeaveComment, TLeaveMessage } from './types';
import { fakeTopics } from '../../constants/fakeTopics';
import image1 from '../../../src/assets/images/сорри.jpg';

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const forumAPI = () => {
  const getAllTopics = async () => ({ status: 200, data: fakeTopics });

  const getAllTopicsHeaders = async () => {
    // will have a query to get only this data, not all topics data
    const headers = fakeTopics.map((topic) => ({
      topicName: topic.topicName,
      count: topic.messages.length,
      id: topic.id,
    }));
    return { status: 200, data: headers };
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
    getAllTopicsHeaders,
    getTopicById,
    leaveMessage,
    leaveComment,
  };
};
