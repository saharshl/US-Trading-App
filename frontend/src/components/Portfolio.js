import React from 'react';
import axios from 'axios';
import {Button} from 'react-bootstrap';
import UserStocks from './UserStocks';
import { Link } from 'react-router-dom';

const Show = props => {
    if(props.userPassword===props.password){
        return (
          <div>
            <hr style={{borderColor:'black'}}/>  
            <h2>Wallet(USD): {props.wallet.toFixed(3)}</h2>
            <UserStocks id={props.id}/>
          </div>   
        );
      }
      if(props.password===''){
        return <div><em>Note: You will not be able to to access your Portfolio without the password</em></div>
    
      }
      return (
       <div>
        <h5>Incorrect Password</h5>
        <div><em>Note: You will not be able to to access your Portfolio without the password</em></div>
       </div>   
      )
}

export default class Portfolio extends React.Component{
    
    constructor(props){
        super(props);

        this.onChangePassword= this.onChangePassword.bind(this);
        this.toggleShow=this.toggleShow.bind(this);
        this.onSubmit=this.onSubmit.bind(this);

        this.state = {
        username: '',
        userPassword: '',
        enterPassword:'',
        password:'',
        wallet:0,
        hidden: true
        } 
    }

    componentDidMount(){
        axios.get('http://localhost:5000/users/'+this.props.match.params.id)
        .then(response => {
            this.setState({
                username: response.data.username,
                userPassword: response.data.password,
                wallet: response.data.wallet
            })   
        })
        .catch(function (error) {
            console.log(error);
      })
    }

    onChangePassword(e){
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

    render(){
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
                                onInput={this.onChangePassword}
                            />
                        <Button variant="link" size="sm" onClick={this.toggleShow}>Show / Hide</Button>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary" />
                    </div>
                </form>

                <div>
                    <Show userPassword={this.state.userPassword} password={this.state.password} wallet={this.state.wallet} id={this.props.match.params.id}/>
                </div>
                <hr/>
                <Button variant='outline-info' style={{float:'right'}}><Link to={"/"}>Logout</Link></Button>

            </div>
          
        )
    }


}