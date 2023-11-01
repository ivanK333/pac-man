import { leaderboardAPI, authAPI, TEAM_NAME } from '../api';
import { IGetLeaderboardData } from '../pages/Leaderboard/Leaderboard';

export const leaderboardController = () => {
  const api = leaderboardAPI();
  const { getUser } = authAPI();

  const addUserToLeaderboard = async (score: number) => {
    try {
      const userInfo = await getUser();

      if (!userInfo) return;

      const userData = {
        data: {
          name: userInfo.data.first_name,
          avatar: userInfo.data.avatar,
          score,
        },
        ratingFieldName: 'score',
        teamName: TEAM_NAME,
      };

      const response = await api.addUserToLeaderboard(userData);
      return response;
    } catch (error: any) {
      return error.response?.data?.reason;
    }
  };

  const getTeamLeaderboard = async () => {
    try {
      const response = await api.getTeamLeaderboard();

      response.data.forEach((item: IGetLeaderboardData, i: number) => {
        item.data.id = i + 1;
        item.data.index = i + 1;
      });

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
