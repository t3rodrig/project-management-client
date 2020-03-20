import React, { Component } from 'react';
import axios from 'axios';

class EditProject extends Component {
  constructor(props){
    super(props)
    this.state = {
      title: this.props.theProject.title, 
      description: this.props.theProject.description
    }
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { title, description } = this.state;
    axios.put(`http://localhost:5000/api/projects/${this.props.theProject._id}`, {
      title,
      description
    })
    .then(() => {
      this.props.getTheProject();
      // after submitting the form, redirect to '/projects'
      this.props.history.push('/projects');
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
        <hr/>
        <h3>Edit form</h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>Title:</label>
          <input 
            type="text"
            name="title"
            value={this.state.title}
            onChange={event => this.handleChange(event)}
          />
          <label>Description:</label>
          <textarea
            name="description"
            value={this.state.description}
            onChange={event =>  this.handleChange(event)}
          />
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

export default EditProject;