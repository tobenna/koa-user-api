import React from 'react'

const RequestInfo = React.createClass({
  render () {
    return (
      <div>{this.props.responseInfo.url}</div>
    )
  }
})

export default RequestInfo
