export const BASE_URL = 'https://16bitgames.ya-praktikum.tech';
export const API_URL = `${BASE_URL}/api/v2`;
//export const LOCAL_API_URL = 'http://localhost:3005';
//export const localhost = `${LOCAL_API_URL}/api/v2`;
export const RESOURCES_URL = `${API_URL}/resources`;

export const REDIRECT_URI =
  typeof window === 'undefined' ? '' : window.location.origin;
