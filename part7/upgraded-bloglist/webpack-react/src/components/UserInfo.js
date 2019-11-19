import React from 'react';
import { connect } from 'react-redux';

const UserInfo = ({ user }) => {
  if (!user) {
    return <div>...Loading</div>;
  }
  console.log(user);
  return (
    <div>
      <h2 className="ui blue header" style={{ textAlign: 'center' }}>
        {user.username}
      </h2>
      <h4 className="ui orange header" style={{ textAlign: 'center' }}>
        added blogs
      </h4>

      <div className="ui relaxed divided list">
        {user.blogs.map(blog => {
          return (
            <div className="item" key={blog.id}>
              <div
                style={{ textAlign: 'center', fontSize: '3vh' }}
                className="header"
              >
                {blog.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = ({ user }, ownProps) => {
  return {
    user: user.users.find(user => user.id === ownProps.match.params.id)
  };
};

export default connect(mapStateToProps)(UserInfo);
