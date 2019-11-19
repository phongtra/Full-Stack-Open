import loginService from '../services/login';
import blogsService from '../services/blogs';

import { LOGIN_USER, LOGOUT, FETCH_USERS } from './types';
import { setNotification, setErrorMessage } from './notificationActions';

export const loginUser = userCredential => async dispatch => {
  try {
    const user = await loginService.login(userCredential);
    dispatch({ type: LOGIN_USER, payload: user });
    window.localStorage.setItem('user', JSON.stringify(user));
    blogsService.setToken(user.token);
    return dispatch(
      setNotification(`${user.userCredential.username} has logged in`)
    );
  } catch (e) {
    return dispatch(setErrorMessage('wrong credential'));
  }
};

export const checkUser = user => {
  return { type: LOGIN_USER, payload: user };
};

export const logoutUser = () => dispatch => {
  window.localStorage.clear();
  return dispatch({ type: LOGOUT });
};

export const fetchUsers = () => async dispatch => {
  const users = await loginService.getUsers();
  return dispatch({ type: FETCH_USERS, payload: users });
};
