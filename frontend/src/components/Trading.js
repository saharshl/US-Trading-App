import React from 'react';
import axios from 'axios';
import Stock from './Stock';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const Show = props => {

  if(props.userPassword===props.password){
    return (
    <div>
      <Stock wallet={props.wallet} id={props.id}/>
    </div>  
    ) ;
  }
  if(props.password===''){
    return <p> </p>
  }
  return <h5>Incorrect Password</h5>
}

export default class Trade extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onPassword= this.onPassword.bind(this);
    this.toggleShow=this.toggleShow.bind(this);

    this.state = {
      username:'',
      wallet: 0,
      userPassword: '',
      enterPassword:'',
      password:'',
      hidden:true
    }
  }

    componentDidMount() {
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

      render(){
          return(
            <div>
              
              <h3>User: {this.state.username}</h3>

              <form onSubmit={this.onSubmit}>
                <div className="form-group"> 
                    <label>Enter Password </label>
                    <input
                      type={this.state.hidden ? "password" : "text"}
                      className= "form-control"
                      value={this.state.enterPassword}
                      onChange={this.onPassword}
                    />
                    <Button variant="link" size="sm" onClick={this.toggleShow}>Show / Hide</Button>
                </div>
                <div className="form-group">
                  <input type="submit" value="Login" className="btn btn-primary" />
                </div>
              </form>
              <div><Show id={this.props.match.params.id} userPassword={this.state.userPassword} password={this.state.password} wallet={this.state.wallet}/></div>
              <hr/>
              <Button variant='outline-info' style={{float:'right'}}><Link to={"/"}>Logout</Link></Button>            
            </div>
          )
      }
  }