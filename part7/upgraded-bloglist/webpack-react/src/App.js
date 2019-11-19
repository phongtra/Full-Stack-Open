import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions';

import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';
import User from './components/User';
import LoginInfo from './components/LoginInfo';
import UserInfo from './components/UserInfo';
import BlogInfo from './components/BlogInfo';

const App = ({
  fetchBlogs,
  notification,
  errorMessage,
  checkUser,
  user,
  fetchUsers
}) => {
  const blogFormRef = React.createRef();
  useEffect(() => {
    fetchBlogs();
  }, []);
  useEffect(() => {
    fetchUsers();
  }, []);
  useEffect(() => {
    const userLoggedIn = window.localStorage.getItem('user');
    if (userLoggedIn) {
      const userToCheck = JSON.parse(userLoggedIn);
      checkUser(userToCheck);
    } else {
      checkUser(false);
    }
  }, []);

  const renderMainPage = () =>
    !user ? <LoginForm /> : <Blogs blogFormRef={blogFormRef} />;

  return (
    <div className="ui container">
      <BrowserRouter>
        {errorMessage ? <h1 style={{ color: 'red' }}>{errorMessage}</h1> : ''}
        {notification ? <h1 style={{ color: 'green' }}>{notification}</h1> : ''}
        <LoginInfo />
        <Switch>
          <Route path="/" exact component={renderMainPage} />
          <Route path="/users" exact component={User} />
          <Route path="/users/:id" exact component={UserInfo} />
          <Route path="/blogs/:id" exact component={BlogInfo} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    notification: state.notification,
    errorMessage: state.errorMessage,
    user: state.user.currentUser
  };
};

export default connect(mapStateToProps, actions)(App);
