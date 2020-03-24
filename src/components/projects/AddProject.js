import React, { Component } from 'react';
import axios from 'axios';

class AddProject extends Component {
  constructor(props){
    super(props);
    this.state = { title: "", description: ""};
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { title, description } = this.state;
    axios.post("http://localhost:5000/api/projects", { 
      title, 
      description
    }, { 
      withCredentials: true 
    })
    .then(() => {
        this.props.getData();
        this.setState({title: "", description: ""});
    })
    .catch(err => console.log(err));
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({[name]: value});
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Title:</label>
          <input 
            type="text" 
            name="title" 
            value={this.state.title}
            onChange={event => this.handleChange(event)}
          />
          <br/>
          <label>Description:</label>
          <textarea 
            name="description" 
            value={this.state.description} 
            onChange={event => this.handleChange(event)}
          />
          <br/>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

export default AddProject;