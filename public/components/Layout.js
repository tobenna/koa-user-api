import React from 'react'
import Header from './Header';
import RequestInfo from './RequestInfo';
import Body from './Body';


const Layout = React.createClass({
  render () {
    return (
      <div>
        <Header />
        <RequestInfo responseInfo={this.props.responseInfo}/>
        <Body users={this.props.users} functions={this.props.functions}/>
      </div>
    )
  }
})


export default Layout
