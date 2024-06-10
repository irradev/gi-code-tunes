const TOKEN_STORAGE_NAME = 'clon-spotify-token';

export const saveToken = (token: string) => {
  localStorage.setItem(TOKEN_STORAGE_NAME, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_STORAGE_NAME);
};
