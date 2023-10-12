import { forumAPI, TCreateTopic, TLeaveComment, TLeaveMessage } from '../api';
import { readLocalStorage } from '../utils/useReadLocalStorage';
import { logout, useAppDispatch } from '../store';

export const forumController = () => {
  const api = forumAPI();
  //   const dispatch = useAppDispatch();

  const getAllTopics = async () => {
    try {
      const response = await api.getAllTopics();
      return response;
    } catch (error: any) {
      return error.response?.data?.reason;
    }
  };

  const getAllTopicsHeaders = async () => {
    try {
      const response = await api.getAllTopicsHeaders();
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
    getAllTopicsHeaders,
    leaveComment,
  };
};
