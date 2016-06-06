import React from 'react'

const User = React.createClass({
  render () {
    var user = this.props.user
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
      </div>
    );
  }
});

export default User;
