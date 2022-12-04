import React, { Component } from 'react';
import axios from 'axios';
import {Button} from 'react-bootstrap';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeBank = this.onChangeBank.bind(this);
    this.onChangePassword= this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleShow=this.toggleShow.bind(this);

    this.state = {
      username: '',
      password:'',
      bankAccount:'',
      hidden: true
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangeBank(e){
    this.setState({
      bankAccount: e.target.value
    });
  }

  toggleShow(e) {
    this.setState({ hidden: !this.state.hidden });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      bankAcct: this.state.bankAccount,
      password: this.state.password
    }

    console.log(user);

    axios.post('http://localhost:5000/users/add', user)
      .then(res => console.log(res.data));

    this.setState({
      username: '',
      bankAccount:'',
      password:''
    })
  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label style={{color:'rgb(29,79,145,1)'}}>Username: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                />
          </div>

          <div className="form-group"> 
            <label style={{color:'rgb(29,79,145,1)'}}>Password: </label>
            <input
                  type={this.state.hidden ? "password" : "text"}
                  required
                  className= "form-control"
                  value={this.state.password}
                  onInput={this.onChangePassword}
                  />
                  <Button variant="link" size="sm" onClick={this.toggleShow}>Show / Hide</Button>
          </div>

          <div className="form-group"> 
            <label style={{color:'rgb(29,79,145,1)'}}>Bank Account: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.bankAccount}
                onChange={this.onChangeBank}
                />
          </div>

          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}