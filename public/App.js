import React from 'react'
import axios from 'axios'
import _ from 'lodash'
import Layout from './components/Layout'
const API_URL = 'http://localhost:3001/users/'
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      users: []
     };
  }
  getUsers() {
    console.log("tobenna Mounted");
    axios.get(API_URL)
      .then((response) => this.setState({
        users: response.data
      }));
  }
  componentDidMount () {
    this.getUsers();
  }

  deleteUser(id) {
    this.setState({
      users: this.state.users
        .filter(user => user.id !== id)
    });
  }

  setRequestMessage(message) {
    this.setState({
      messsage: ''
    });
  }

  render () {
    const functions = {
      deleteUser: this.deleteUser,
      setRequestMessage: this.setRequestMessage
    }
    return (
      <div>
        <Layout users={this.state.users} functions={functions}  />
      </div>
    )
  }
}

export default App;
