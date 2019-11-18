import blogsService from '../services/blogs';
import { FETCH_BLOGS, CREATE_BLOG, UPDATE_BLOG, DELETE_BLOG } from './types';

import { setErrorMessage, setNotification } from './notificationActions';

export const fetchBlogs = () => async dispatch => {
  const blogsData = await blogsService.getAll();
  return dispatch({ type: FETCH_BLOGS, payload: blogsData });
};

export const createNewBlog = newBlog => async (dispatch, getState) => {
  try {
    blogsService.setToken(getState().user.token);
    const blog = await blogsService.create(newBlog);
    dispatch(
      setNotification(`a new blog ${blog.title} by ${blog.author} added`)
    );
    return dispatch({ type: CREATE_BLOG, payload: blog });
  } catch (e) {
    return dispatch(setErrorMessage('require url and title'));
  }
};

export const updateCurrentBlog = (updateBlog, id) => async (
  dispatch,
  getState
) => {
  blogsService.setToken(getState().user.token);
  try {
    const update = await blogsService.update(updateBlog, id);
    dispatch(setNotification('like added'));
    return dispatch({ type: UPDATE_BLOG, payload: update });
  } catch (e) {
    return dispatch(setErrorMessage('cannot add like'));
  }
};

export const deleteCurrentBlog = (id, blog) => async (dispatch, getState) => {
  try {
    blogsService.setToken(getState().user.token);
    const result = window.confirm(
      `remove blog ${blog.title} by ${blog.author}`
    );
    if (result) {
      await blogsService.deleteBlog(id);
      dispatch({ type: DELETE_BLOG, payload: id });
      return dispatch(setNotification(`blog removed`));
    }
  } catch (e) {
    return dispatch(setErrorMessage('cannot delete blog'));
  }
};
