import { LOGIN_USER, LOGOUT, FETCH_USERS } from '../actions/types';

export default (state = { currentUser: null, users: [] }, action) => {
  console.log(action.type);
  console.log(action.payload);
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, currentUser: action.payload };
    case LOGOUT:
      return { ...state, currentUser: false };
    case FETCH_USERS:
      return { ...state, users: action.payload };
    default:
      return state;
  }
};
