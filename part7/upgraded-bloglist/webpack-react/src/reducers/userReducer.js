import { LOGIN_USER, LOGOUT } from '../actions/types';

export default (state = null, action) => {
  console.log(action.type);
  console.log(action.payload);
  switch (action.type) {
    case LOGIN_USER:
      return action.payload;
    case LOGOUT:
      return null;
    default:
      return state;
  }
};
