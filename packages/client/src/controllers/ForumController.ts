import { forumAPI, TCreateTopic, TLeaveComment, TLeaveMessage } from '../api';
// import { readLocalStorage } from '../utils/useReadLocalStorage';
// import { logout, useAppDispatch } from '../store';

export const forumController = () => {
  const api = forumAPI();
  //   const dispatch = useAppDispatch();

  const getTopics = async () => {
    try {
      const res = await api.getTopics();
      return res;
    } catch (error: any) {
      return error.res?.data?.reason;
    }
  };

  const getTopicWithMessages = async (id: string) => {
    try {
      const res = await api.getTopicWithMessages(id);
      return res;
    } catch (error: any) {
      return error.res?.data?.reason;
    }
  };

  const createTopic = async (data: TCreateTopic) => {
    console.log('createTopic===>', data);
    try {
      const res = await api.createTopic(data);
      return res;
    } catch (error: any) {
      return error.res?.data?.reason;
    }
  };

  const leaveMessage = async (data: TLeaveMessage) => {
    try {
      const res = await api.leaveMessage(data);
      return res;
    } catch (error: any) {
      return error.res?.data?.reason;
    }
  };

  const leaveComment = async (data: TLeaveComment) => {
    try {
      const res = await api.leaveComment(data);
      return res;
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
  };
};
