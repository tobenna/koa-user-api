import React from 'react'
import User from './User'

const Body = React.createClass({
  render () {
    var functions = this.props.functions;
    var users = this.props.users.map(function (user) {
      return (<User user={user} key={user.id} functions={functions}/>);
    });
    users.each
    return (
      <div>
        {users}
      </div>
    )
  }
})

export default Body
