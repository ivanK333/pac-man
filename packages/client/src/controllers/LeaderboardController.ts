import { leaderboardAPI, authAPI, TEAM_NAME } from '../api';

export const leaderboardController = () => {
  const api = leaderboardAPI();
  const { getUser } = authAPI();

  const getUserInfo = async () => {
    const response = await getUser();

    if (response?.data) {
      return response.data;
    }
  };

  const addUserToLeaderboard = async (score: number) => {
    const { first_name, avatar } = await getUserInfo();

    const userData = {
      data: {
        name: first_name,
        avatar,
        score,
      },
      ratingFieldName: 'score',
      teamName: TEAM_NAME,
    };

    try {
      const response = await api.addUserToLeaderboard(userData);
      return response;
    } catch (error: any) {
      return error.response?.data?.reason;
    }
  };

  const getTeamLeaderboard = async () => {
    try {
      const response = await api.getTeamLeaderboard();
      return response;
    } catch (error: any) {
      return error.response?.data?.reason;
    }
  };

  const getAllLeaderboard = async () => {
    try {
      const response = await api.getAllLeaderboard();
      return response;
    } catch (error: any) {
      return error.response?.data?.reason;
    }
  };

  return { addUserToLeaderboard, getTeamLeaderboard, getAllLeaderboard };
};
