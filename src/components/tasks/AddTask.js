import React, { Component } from 'react';
import axios from 'axios';

class AddTask extends Component {
  constructor(props){
    super(props)
    this.state = {
      title: "",
      description: "",
      isShowing: false // will help us to toggle add task form
    };
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { title, description } = this.state;
    const projectId = this.props.theProject._id;
    axios.post("http://localhost:5000/api/tasks", {// this is 'req.body' that will be received on the server
      title,
      description,
      projectId
    })
    .then(() => {
      this.props.getTheProject(); // after submitting the form, retrieve project one more time so the new task is displayed as well
      this.setState({title: "", description: ""});
    })
    .catch(err => console.log(err));
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
  
  toggleForm = () => {
    if(!this.state.isShowing){
      this.setState({isShowing: true});
    } else {
      this.setState({isShowing: false});
    }
  }

  showAddTaskForm = () => {
    if(this.state.isShowing){
      return (
        <div>
          <h3>Add Task</h3>
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
              onChange={event => this.handleChange(event)}
            />
            <input type="submit" value="Submit"/>
          </form>
        </div>
      );
    }
  }
  
  render(){
    return (
      <div>
        <hr/>
        <button onClick={() => this.toggleForm()}>
          Add task
        </button>
        {this.showAddTaskForm()}
      </div>
    );
  }

}

export default AddTask;