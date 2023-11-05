import { LOCAL_API_URL } from '../../constants/api';

export const TEAM_NAME = '16-bit_games';

export const BASE_URL_LEADEERBOARD = `${LOCAL_API_URL}/leaderboard`;

export const URL_LEADEERBOARD_ALL = `${BASE_URL_LEADEERBOARD}/all`;

export const URL_LEADEERBOARD_TEAM = `${BASE_URL_LEADEERBOARD}/${TEAM_NAME}`;

export const getLeadterboardData = {
  ratingFieldName: 'score',
  cursor: 0,
  limit: 10,
};
