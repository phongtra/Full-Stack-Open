import { SET_NOTIFICATION, REMOVE_NOTIFICATION } from '../actions/types';

export default (state = '', action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return action.payload;
    case REMOVE_NOTIFICATION:
      return action.payload;
    default:
      return state;
  }
};
