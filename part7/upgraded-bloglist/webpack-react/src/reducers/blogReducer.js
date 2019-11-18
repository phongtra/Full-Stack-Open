import {
  FETCH_BLOGS,
  CREATE_BLOG,
  UPDATE_BLOG,
  DELETE_BLOG
} from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_BLOGS:
      return action.payload;
    case CREATE_BLOG:
      return [...state, action.payload];
    case UPDATE_BLOG:
      return state.map(blog =>
        blog.id === action.payload.id ? action.payload : blog
      );
    case DELETE_BLOG:
      return state.filter(blog => blog.id !== action.payload);
    default:
      return state;
  }
};
