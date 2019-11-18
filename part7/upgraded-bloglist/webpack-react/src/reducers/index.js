import { combineReducers } from 'redux';

import blogs from './blogReducer';
import notification from './notificationReducer';
import user from './userReducer';
import errorMessage from './errorReducer';

export default combineReducers({
  blogs,
  notification,
  user,
  errorMessage
});
