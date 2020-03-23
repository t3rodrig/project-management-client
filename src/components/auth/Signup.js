import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from './auth-service';

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: '' };
    this.service = new AuthService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    this.service.signup(username, password)
    .then(response => {
      this.setState({
        username: '',
        password: ''
      });
      this.props.getUser(response)
    })
    .catch(err => console.log(err));
  }
  
  handleChange = event => {
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
          <input type="submit" value="Signup"/>
        </form>
        <p>Already hava accout? <Link to="/">Login</Link></p>
      </div>
    );
  }
}

export default Signup;