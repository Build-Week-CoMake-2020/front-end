import React, { Component } from "react";


export default class Login extends Component {
  state = {
    credentials: {
      email: "",
      password: ""
    }
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value   
      }
    });
  };

  

  render(){
    return(
      <form onSubmit={this.login}>
        <h3>Sign In</h3>

        <div className="form-group">
            <label>Email address</label>
            <input 
            type="email" 
            className="form-control" 
            placeholder="Enter email" 
            name="email"
            value={this.state.credentials.email}
            onChange={this.handleChange}
            />
        </div>

        <div className="form-group">
            <label>Password</label>
            <input 
            type="password" 
            className="form-control" 
            placeholder="Enter password"
            name="password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
            />
        </div>

        <div className="form-group">
            <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
            </div>
        </div>

        <button type="submit" className="btn btn-primary btn-block btn-african">Submit</button>
        <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
        </p>
      </form>

    );
  }
}