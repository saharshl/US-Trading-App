import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark navbar-expand-lg" style={{backgroundColor:'#31b0d5'}}>
        <Link to="/" className="navbar-brand" style={{color:'white',fontSize:30}}><em>TradeHunt</em></Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link" style={{color:'white', fontSize:20}}><b>Users</b></Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link" style={{color:'white', fontSize:20}}><b>Create User</b></Link>
          </li>
          <li className="navbar-item">
          <Link to="/symbol" className="nav-link" style={{color:'white', fontSize:20}}><b>Stock Symbols</b></Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}