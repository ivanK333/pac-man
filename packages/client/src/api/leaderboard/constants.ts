const localhost = 'http://localhost:3005';

export const TEAM_NAME = '16-bit_games';

export const BASE_URL_LEADEERBOARD = `${localhost}/leaderboard`;

export const URL_LEADEERBOARD_ALL = `${BASE_URL_LEADEERBOARD}/all`;

export const URL_LEADEERBOARD_TEAM = `${BASE_URL_LEADEERBOARD}/${TEAM_NAME}`;

export const getLeadterboardData = {
  ratingFieldName: 'score',
  cursor: 0,
  limit: 10,
};
