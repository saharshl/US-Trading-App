import React, { Component } from 'react';
import axios from 'axios';
import {Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Money = props => {
  if(props.userPassword===props.password){
    return (
      <div>
      <hr style={{borderColor:'black'}}/>    
      <h4>Wallet(USD): {props.wallet.toFixed(3)}</h4>
      </div>
    );
  }
  if(props.password===''){
    return <div><em>Note: You will not be able to to access your wallet without the password</em></div>

  }
  return <h5>Incorrect Password</h5>
}
export default class EditWallet extends Component {
  constructor(props) {
    super(props);

    this.onAdd = this.onAdd.bind(this);
    this.onWithdraw=this.onWithdraw.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDeposit= this.onDeposit.bind(this);
    this.onTake= this.onTake.bind(this);
    this.onPassword= this.onPassword.bind(this);
    this.toggleShow= this.toggleShow.bind(this);

    this.state = {
      username: '',
      wallet: 0,
      in:0,
      out:0,
      userPassword: '',
      enterPassword:'',
      password:'',
      hidden: true
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          userPassword: response.data.password,
          wallet: response.data.wallet,
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

  }

  onAdd(e){
    this.setState({
      in: Number(e.target.value)
    });
  }

  onWithdraw(e){
    this.setState({
      out: Number(e.target.value) * (-1)
    });
  }

  onDeposit(e) {
    e.preventDefault();
    if(this.state.userPassword===this.state.password){
      const user = {
          wallet: this.state.wallet+this.state.in
        };

      console.log(user);

      axios.post('http://localhost:5000/users/update/' + this.props.match.params.id, user)
        .then(res => console.log(res.data));
      
      window.location = '/';
    }
    else{
      alert("Incorrect Password")
    }

  }

  onTake(e) {
    e.preventDefault();
    if(this.state.userPassword===this.state.password){
      if(this.state.out<0 && this.state.out*(-1)>this.state.wallet){
        alert("Insufficient Amount in Wallet")
      }
      else{
        const user = {
          wallet: this.state.wallet+this.state.out
        };

        console.log(user);

        axios.post('http://localhost:5000/users/update/' + this.props.match.params.id, user)
          .then(res => console.log(res.data));
      
        window.location = '/';
      }
    }
    else{
      alert("Incorrect Password")
    }
  }

  onPassword(e){
    this.setState({
      enterPassword: e.target.value
    });
  }

  toggleShow(e) {
    this.setState({ hidden: !this.state.hidden });
  }

  onSubmit(e){
    e.preventDefault();
    this.setState({
      password: this.state.enterPassword
    });
  }

  render() {
    return (
    <div>
      <h3>User: {this.state.username}</h3>

      <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
              <label>Enter Password </label>
              <input
                    type={this.state.hidden ? "password" : "text"}
                    className= "form-control"
                    value={this.state.enterPassword}
                    onInput={this.onPassword}
                  />
              <Button variant="link" size="sm" onClick={this.toggleShow}>Show / Hide</Button>
          </div>
          <div className="form-group">
              <input type="submit" value="Login" className="btn btn-primary" />
          </div>
      </form>

      <div>
        <Money userPassword={this.state.userPassword} password={this.state.password} wallet={this.state.wallet}/>
      </div>
      
      <br/>
  
      <form onSubmit={this.onDeposit}>
        <div className="form-group"> 
          <label>Add Money </label>
          <input type="number" required className= "form-control" onInput={this.onAdd} />
        </div>
        <div className="form-group">
          <input type="submit" value="Update Wallet" className="btn btn-primary" min="1" />
        </div>
      </form>

      <form onSubmit={this.onTake}>
        <div className="form-group"> 
          <label>Withdraw Money </label>
          <input type="number" required className= "form-control" onInput={this.onWithdraw} />
        </div>
        <div className="form-group">
          <input type="submit" value="Update Wallet" className="btn btn-primary" min="1" />
        </div>
      </form>
      <hr/>
      <Button variant='outline-info' style={{float:'right'}}><Link to={"/"}>Logout</Link></Button>
    </div>
    )
  }
}