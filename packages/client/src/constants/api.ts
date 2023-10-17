export const API_URL = 'http://localhost:3005/api/v2';

export const RESOURCES_URL = `${API_URL}/resources`;

export const REDIRECT_URI =
  typeof window === 'undefined' ? '' : window.location.origin;
