import React from 'react'
import axios from 'axios'
import _ from 'lodash'
import Layout from './components/Layout'
const API_URL = '/api/v1/users/'

class App extends React.Component {
  constructor() {
    super();
    var self = this;
    this.state = {
      users: [],
      responseInfo: {
        url: '',
        status: '',
        statusText: ''
      }
     };
  }
  getUsers() {
    axios.get(API_URL)
      .then((response) => {
      this.setState({
        users: response.data,
        responseInfo: {
          url:'GET /api/v1/users/',
          status: response.status,
          statusText: response.statusText
        }
      })});
  }
  componentDidMount () {
    this.getUsers();
  }

  deleteUser(reference) {
    var userId = parseInt(reference.target.id);
    axios.delete(`${API_URL}/${userId}`)
      .then((response) => this.setState({
          users: this.state.users
            .filter(user => {
                return user.id !== userId
              }),
          responseInfo:{
            url:`DELETE ${API_URL}${userId}`,
            status: response.status,
            statusText: response.statusText
            }
          })
        );
  }

  render () {
    const functions = {
      deleteUser: this.deleteUser.bind(this)
    }
    return (
      <div>
        <Layout users={this.state.users} functions={functions}  responseInfo={this.state.responseInfo}/>
      </div>
    )
  }
}

export default App;
