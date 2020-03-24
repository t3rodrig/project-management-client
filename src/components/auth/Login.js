import React, { Component } from 'react';
import AuthService from './auth-service';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: ''};
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    this.service.login(username, password)
    .then(response => {
      this.setState({username: '', password: ''});
      this.props.getUser(response);
    })
    .catch(err =>  console.log(err));
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({[name]: value});
  }

  render(){
    return (
    <div>
      <form onSubmit={this.handleFormSubmit}>
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
          name="password"
          value={this.state.password}
          onChange={event => this.handleChange(event)}
        />
        <input type="submit" value="Login"/>
      </form>
      <p>Don't have account? <Link to="/signup">Signup</Link></p>
    </div>
    );
  }
}

export default Login;