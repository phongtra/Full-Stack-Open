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
    <>
      <h2>log in to the application</h2>
      <form className="login" onSubmit={handleLogin}>
        <div>
          username
          <input {...username} name="Username" />
        </div>
        <div>
          password
          <input {...password} name="Password" />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};

export default connect(null, actions)(LoginForm);
