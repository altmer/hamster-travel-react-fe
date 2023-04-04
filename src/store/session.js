import client from '../api/client';

export const isAuthenticated = () => !!localStorage.getItem('token');

export const getToken = () => localStorage.getItem('token');

export const getCurrentUser = () => {
  const currentUserString = localStorage.getItem('currentUser');
  if (currentUserString) {
    return JSON.parse(currentUserString);
  }
  return null;
};

export const localCurrentUser = (data, loading) => {
  if (loading) {
    if (isAuthenticated()) return getCurrentUser();
    return null;
  }
  if (data) {
    return data.currentUser;
  }
  return null;
};

export const storeToken = token => localStorage.setItem('token', token);

export const storeUser = currentUser =>
  localStorage.setItem('currentUser', JSON.stringify(currentUser));

export const storeLogin = ({ token, currentUser }) => {
  storeToken(token);
  storeUser(currentUser);
  client.resetStore();
};

export const storeLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('currentUser');
  client.resetStore();
};
