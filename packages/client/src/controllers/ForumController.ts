import { forumAPI, TCreateTopic, TLeaveComment, TLeaveMessage } from '../api';
import { readLocalStorage } from '../utils/useReadLocalStorage';
import { logout, useAppDispatch } from '../store';

const convertKeysToCamelCase = (
  obj: Record<string, any>,
): Record<string, any> => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => convertKeysToCamelCase(item));
  }

  const camelCaseObj: Record<string, any> = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const camelCaseKey = key.replace(/_(\w)/g, (_, letter) => {
        return letter.toUpperCase();
      });
      camelCaseObj[camelCaseKey] = convertKeysToCamelCase(obj[key]);
    }
  }

  return camelCaseObj;
};

export const forumController = () => {
  const api = forumAPI();
  //   const dispatch = useAppDispatch();

  const getAllTopics = async () => {
    try {
      const response = await api.getAllTopics();
      response.data = response.data.map((data: Record<string, any>) =>
        convertKeysToCamelCase(data),
      );
      return response;
    } catch (error: any) {
      return error.response?.data?.reason;
    }
  };

  const getTopicById = async (id: string) => {
    try {
      const response = await api.getTopicById(id);
      return response;
    } catch (error: any) {
      return error.response?.data?.reason;
    }
  };

  const createTopic = async (data: TCreateTopic) => {
    try {
      const response = await api.createTopic(data);
      return response;
    } catch (error: any) {
      return error.response?.data?.reason;
    }
  };

  const leaveMessage = async (data: TLeaveMessage) => {
    try {
      const response = await api.leaveMessage(data);
      return response;
    } catch (error: any) {
      return error.response?.data?.reason;
    }
  };

  const leaveComment = async (data: TLeaveComment) => {
    try {
      const response = await api.leaveComment(data);
      return response;
    } catch (error: any) {
      return error.response?.data?.reason;
    }
  };
  return {
    createTopic,
    getAllTopics,
    getTopicById,
    leaveMessage,
    leaveComment,
  };
};
