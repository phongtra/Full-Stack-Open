export const setNotification = message => {
  return {
    type: 'SET_NOTIFICATION',
    data: message
  };
};
export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
    data: ''
  };
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
