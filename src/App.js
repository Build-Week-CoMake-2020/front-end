import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from './components/Login'

import SignUp from "./components/SignUp";




function App() {
  return (
    <Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
              </li>
              <li>
                <a className='nav-link' href={"/"}>Home Page</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route path="/sign-up" component={SignUp} />
            <Route path="/sign-in" component={Login} />
            <Route exact path='/' component={Login} />
          
          
          
          </Switch>
        </div>
      </div>

       
    </div>
    </Router>
  );
}

export default App;
