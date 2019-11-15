export const setNotification = (message, second) => async dispatch => {
  dispatch({ type: 'SET_NOTIFICATION', data: message });
  setTimeout(
    () => dispatch({ type: 'REMOVE_NOTIFICATION', data: '' }),
    second * 1000
  );
};

export default (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data;
    case 'REMOVE_NOTIFICATION':
      return action.data;
    default:
      return state;
  }
};
