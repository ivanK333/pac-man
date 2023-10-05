import { baseFetch } from '../../libs/api';
import {
  BASE_URL_LEADEERBOARD,
  URL_LEADEERBOARD_ALL,
  URL_LEADEERBOARD_TEAM,
  getLeadterboardData,
} from '.';

type AddUserData = {
  data: object;
  ratingFieldName: string;
  teamName: string;
};

export const leaderboardAPI = () => {
  const addUserToLeaderboard = async (data: AddUserData) =>
    await baseFetch.post(BASE_URL_LEADEERBOARD, data, {
      withCredentials: true,
    });

  const getAllLeaderboard = async () =>
    await baseFetch.post(URL_LEADEERBOARD_ALL, getLeadterboardData, {
      withCredentials: true,
    });

  const getTeamLeaderboard = async () =>
    await baseFetch.post(URL_LEADEERBOARD_TEAM, getLeadterboardData, {
      withCredentials: true,
    });

  return {
    addUserToLeaderboard,
    getAllLeaderboard,
    getTeamLeaderboard,
  };
};
