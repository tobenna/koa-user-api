import React from 'react'

const User = React.createClass({

  render () {

    var user = this.props.user
    const functions = this.props.functions
    return (
      <div className="user">
        <div>
          {user.forename} {user.surname}
        </div>
        <div>
          {user.email}
        </div>
        <div>
          {user.id}
        </div>
        <div>
          {user.created}
        </div>
        <button className="button" onClick={functions.deleteUser} id={user.id}>
          Delete
        </button>
      </div>
    );
  }
});

export default User;
