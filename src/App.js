import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import ProjectList from './components/projects/ProjectList';
import ProjectDetails from './components/projects/ProjectDetails';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import AuthService from './components/auth/auth-service';
import ProtectedRoute from './components/auth/protected-route';

class App extends Component {
  constructor(props){
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  fetchUser(){
    if (this.state.loggedInUser === null) {
      this.service.loggedin()
      .then(response => {
        this.setState({loggedInUser: response});
      })
      .catch(err => this.setState({loggedInUser: false}));
    }
  }

  getTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  render() {
    this.fetchUser()
    if (this.state.loggedInUser) {
      return (
        <div className="App">
         <Navbar userInSession={this.state.loggedInUser} getUser={this.getTheUser} />
          <Switch>
            <ProtectedRoute
              path="/projects/:id"
              component={ProjectDetails}
              user={this.state.loggedInUser}
            />
            <ProtectedRoute
              path="/projects"
              component={ProjectList}
              user={this.state.loggedInUser}
            />
          </Switch>
        </div>
      );
    } else {
      return (
        <div className="App">
         <Navbar userInSession={this.state.loggedInUser} getUser={this.getTheUser} />
          <Switch>
            <Route exact path="/" render={() => <Login getUser={this.getTheUser} />} />
            <Route exact path="/signup" render={() => <Signup getUser={this.getTheUser}/>} />
            <ProtectedRoute
              path="/projects/:id"
              component={ProjectDetails}
              user={this.state.loggedInUser}
            />
            <ProtectedRoute
              path="/projects"
              component={ProjectList}
              user={this.state.loggedInUser}
            />
          </Switch>
        </div>
      );
    }
  }
}

export default App;
