export const API_URL = 'http://16bitgames.ya-praktikum.tech/api';

export const RESOURCES_URL = `${API_URL}/resources`;

export const REDIRECT_URI =
  typeof window === 'undefined' ? '' : window.location.origin;
