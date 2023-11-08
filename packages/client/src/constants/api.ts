export const BASE_URL = 'https://16bitgames.ya-praktikum.tech';
export const API_URL = `${BASE_URL}/api/v2`;
export const WS_URL = `ws://16bitgames.ya-praktikum.tech/api/ws`;

export const RESOURCES_URL = `${API_URL}/resources`;

export const REDIRECT_URI =
  typeof window === 'undefined' ? '' : window.location.origin;
