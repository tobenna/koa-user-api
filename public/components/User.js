import React from 'react'

const User = React.createClass({

  render () {

    var user = this.props.user
    const functions = this.props.functions
    return (
      <div className="user">
        <div className="user-info">
          <div className="name">
            {user.forename} {user.surname}
          </div>
          <div className="email">
            {user.email}
          </div>
        </div>
        <div>
          <a className="delete-button" onClick={functions.deleteUser} id={user.id}>
            Delete
          </a>
        </div>
      </div>
    );
  }
});

export default User;
