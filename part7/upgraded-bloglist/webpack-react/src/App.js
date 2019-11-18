import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';

import blogsService from './services/blogs';

import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';

const App = ({ fetchBlogs, notification, errorMessage, checkUser, user }) => {
  const blogFormRef = React.createRef();
  useEffect(() => {
    fetchBlogs();
  }, []);
  useEffect(() => {
    const userLoggedIn = window.localStorage.getItem('user');
    if (userLoggedIn) {
      const userToCheck = JSON.parse(userLoggedIn);
      checkUser(userToCheck);
    }
  }, []);

  return (
    <div className="App">
      {errorMessage ? <h1 style={{ color: 'red' }}>{errorMessage}</h1> : ''}
      {notification ? <h1 style={{ color: 'green' }}>{notification}</h1> : ''}
      {!user ? <LoginForm /> : <Blogs blogFormRef={blogFormRef} />}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    notification: state.notification,
    errorMessage: state.errorMessage,
    user: state.user
  };
};

export default connect(mapStateToProps, actions)(App);
