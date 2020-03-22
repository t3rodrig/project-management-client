import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from './auth-service';

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: '' };
    this.service = new AuthService();
  }
  // handleChange() and handleSubmit() will be added here

  render(){
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={event => this.handleChange(event)}
          />
          <label>Password:</label>
          <input 
            type="password"
            value={this.state.password}
            onChange={event => this.handleChange(event)}
          />
        </form>
        <p>Already hava accout? <Link to="/">Login</Link></p>
      </div>
    );
  }
}

export default Signup;