import { SET_ERROR_MESSAGE, REMOVE_ERROR_MESSAGE } from '../actions/types';

export default (state = '', action) => {
  switch (action.type) {
    case SET_ERROR_MESSAGE:
      return action.payload;
    case REMOVE_ERROR_MESSAGE:
      return action.payload;
    default:
      return state;
  }
};
