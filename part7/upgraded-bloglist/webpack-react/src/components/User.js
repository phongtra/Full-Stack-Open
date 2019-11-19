import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const User = ({ users }) => {
  if (!users) {
    return <div>...Loading</div>;
  }
  return (
    <>
      <h2 style={{ textAlign: 'center' }} className="ui blue header">
        Users
      </h2>
      <table className="ui celled table">
        <thead>
          <tr>
            <th>users</th>
            <th>names</th>
            <th>blog created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.username}</Link>
                </td>
                <td>{user.name ? user.name : 'NA'}</td>
                <td>{user.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

const mapStateToProps = ({ user }) => {
  return { users: user.users };
};

export default connect(mapStateToProps)(User);
