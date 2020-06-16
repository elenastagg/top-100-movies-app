import decode from 'jwt-decode';

const setToken = (token) => {
  window.localStorage.setItem('apiToken', token);
};

const getToken = () => window.localStorage.getItem('apiToken');

const getTokenPayLoad = () => {
  const token = getToken();

  return token && decode(token);
};

const tokenExists = (t) => {
  return Boolean(t);
};

const tokenHasNotExpired = (t) => {
  const now = Date.now() / 1000;

  return !t.exp || t.exp > now;
};

const isTokenValid = () => {
  const token = getTokenPayLoad();

  return tokenExists(token) && tokenHasNotExpired(token);
};

const removeToken = () => {
  window.localStorage.removeItem('apiToken');
};

export default {
  setToken,
  getToken,
  getTokenPayLoad,
  isTokenValid,
  removeToken,
};
