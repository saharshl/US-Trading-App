import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component"
import UsersList from "./components/users-list.component";
import EditWallet from "./components/edit-wallet.component";
import Portfolio from "./components/Portfolio";
import CreateUser from "./components/create-user.component";
import Symbols from './components/Symbolview';
import Trading from './components/Trading';

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={UsersList} />
      <Route path="/edit/:id" component={EditWallet} />
      <Route path="/portfolio/:id" component={Portfolio} />
      <Route path="/user" component={CreateUser} />
      <Route path="/symbol" component={Symbols} />
      <Route path="/trade/:id" component={Trading} />
      </div>
    </Router>
  );
}

export default App;
 