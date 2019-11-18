import {
  SET_NOTIFICATION,
  REMOVE_NOTIFICATION,
  SET_ERROR_MESSAGE,
  REMOVE_ERROR_MESSAGE
} from './types';
export const setNotification = message => dispatch => {
  dispatch({ type: SET_NOTIFICATION, payload: message });
  setTimeout(() => dispatch({ type: REMOVE_NOTIFICATION, payload: '' }), 5000);
};
export const setErrorMessage = message => dispatch => {
  dispatch({ type: SET_ERROR_MESSAGE, payload: message });
  setTimeout(() => dispatch({ type: REMOVE_ERROR_MESSAGE, payload: '' }), 5000);
};
