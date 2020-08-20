import React, { Component } from "react";


export default class SignUp extends Component {
  state = {
    credentials: {
      name:"",
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

v

  render(){
    return(
          <form onSubmit={this.signup}>
            <h3>Sign Up</h3>

            <div className="form-group">
                <label>Name</label>
                <input 
                type="text" 
                className="form-control" 
                placeholder="Name" 
                name="name"
                value={this.state.credentials.name}
                onChange={this.handleChange}
                />
            </div>

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

            <button type="submit" className="btn btn-primary btn-block btn-african">Sign Up</button>
            <p className="forgot-password text-right">
                Already registered <a href="#">sign in?</a>
            </p>
          </form> 
    );
  }
}