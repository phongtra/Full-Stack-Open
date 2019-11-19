import './LoginInfo.css';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../actions';

const LoginInfo = ({ user, logoutUser }) => {
  if (user === null) {
    return <div>Loading ...</div>;
  }
  if (user === false) {
    return <div></div>;
  }
  return (
    <>
      <div className="ui two item menu">
        <Link className="item" to="/users">
          users
        </Link>
        <Link className="item" to="/">
          blogs
        </Link>
      </div>
      <h2 style={{ textAlign: 'center' }} className="ui green header">
        Blogs
      </h2>
      <div className="user-credential">
        {user.userCredential.username} has logged in
      </div>
      <div style={{ textAlign: 'center' }}>
        <button
          className="ui basic red button"
          onClick={() => {
            logoutUser();
          }}
        >
          logout
        </button>
      </div>
      <br />
    </>
  );
};

const mapStateToProps = ({ user }) => {
  return { user: user.currentUser };
};

export default connect(mapStateToProps, actions)(LoginInfo);
