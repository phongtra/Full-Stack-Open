import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ handleLogin, username, password }) => {
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
LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.array.isRequired
};

export default LoginForm;
