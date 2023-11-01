export const API_URL = 'https://16bitgames.ya-praktikum.tech/api/v2';

export const RESOURCES_URL = `${API_URL}/resources`;

export const REDIRECT_URI =
  typeof window === 'undefined' ? '' : window.location.origin;
