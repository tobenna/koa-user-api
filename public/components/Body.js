import React from 'react'
import User from './User'

const Body = React.createClass({
  render () {
    console.log(this.props.users);
    var users = this.props.users.map(function (user) {
      return (<User user={user} key={user.id}/>);
    });
    console.log(users);
    users.each
    return (
      <div>
        {users}
      </div>
    )
  }
})

export default Body
