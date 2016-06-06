import React from 'react'
import Header from './Header';
import RequestInfo from './RequestInfo';
import Body from './Body';


const Layout = React.createClass({
  render () {
    console.log(this.props);
    return (
      <div>
        <Header />
        <RequestInfo />
        <Body users={this.props.users} functions={this.props.functions}/>
      </div>
    )
  }
})


export default Layout
