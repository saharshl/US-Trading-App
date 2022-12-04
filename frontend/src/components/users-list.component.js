import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const User = props => (
  <tr>
    <td>{props.user.username}</td>
    <td><Link to={"/portfolio/"+props.user._id}>View</Link> </td>
    <td><Link to={"/edit/"+props.user._id}>ADD / WITHDRAW</Link> </td>
    <td><Link to={"/trade/"+props.user._id}>Trading</Link> </td>
  </tr>
)

export default class UsersList extends Component {
  constructor(props) {
    super(props);


    this.state = {users: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        this.setState({ users: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  

  usersList() {
    return this.state.users.map(currentuser => {
      return <User user={currentuser} key={currentuser._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Registered Users</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Portfolio</th>
              <th>Wallet</th>
              <th>Stocks</th>
            </tr>
          </thead>
          <tbody>
            { this.usersList() }
          </tbody>
        </table>
      </div>
    )
  }
}