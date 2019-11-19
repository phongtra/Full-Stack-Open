import './LoginForm.css';
import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';
import { useField } from '../hooks';

const LoginForm = ({ loginUser }) => {
  const [username, usernameReset] = useField('text');
  const [password, passwordReset] = useField('password');
  const handleLogin = async event => {
    event.preventDefault();
    loginUser({
      username: username.value,
      password: password.value
    });
    usernameReset();
    passwordReset();
  };
  return (
    <div className="vertical-align">
      <h2 style={{ textAlign: 'center' }} className="ui green header">
        log in to the application
      </h2>
      <form className="login ui large form" onSubmit={handleLogin}>
        <div className="two fields">
          <div className="field">
            <label>username</label>
            <input {...username} name="Username" />
          </div>
          <div className="field">
            <label>password</label>
            <input {...password} name="Password" />
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <button className="ui blue button" type="submit">
            login
          </button>
        </div>
      </form>
    </div>
  );
};

export default connect(null, actions)(LoginForm);
