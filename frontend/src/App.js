import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],

      activeItem: {
        id: null,
        title: "",
        completed: false,
      },

      editing: false,
    };

    this.fetchTasks = this.fetchTasks.bind(this);
  }

  componentWillMount() {
    this.fetchTasks();
  }

  fetchTasks() {
    console.log("Fetching...");
    axios
      .get("http://127.0.0.1:8000/api/task-list/")
      .then((response) => {
        this.setState({
          todoList: response.data,
        });
      })
      .catch((error) => console.log(error));
  }

  handleChange = (event) => {
    this.setState({
      activeItem: {
        ...this.state.activeItem,
        title: event.target.value,
      },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { activeItem, editing } = this.state;
    let url = "http://127.0.0.1:8000/api/task-create/";

    if (editing === true) {
      url = `http://127.0.0.1:8000/api/task-update/${activeItem.id}/`;
      axios
        .put(url, activeItem)
        .then((response) => {
          this.fetchTasks();
          this.setState({
            activeItem: {
              id: null,
              title: "",
              completed: false,
            },
            editing: false,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post(url, activeItem)
        .then((response) => {
          this.fetchTasks();
          this.setState({
            activeItem: {
              id: null,
              title: "",
              completed: false,
            },
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  handleEdit = (task) => {
    this.setState({
      activeItem: task,
      editing: true,
    });
  };

  handleDelete = (task) => {
    axios
      .delete(`http://127.0.0.1:8000/api/task-delete/${task.id}/`)
      .then((response) => {
        this.fetchTasks();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleMarkAsDone = (task) => {
    const { activeItem } = this.state;
    task.completed = !task.completed;
    this.setState({
      activeItem: task,
    });
    this.setState({
      activeItem: {
        ...this.state.activeItem,
        completed: task.completed,
      },
    });
    axios
      .delete(`http://127.0.0.1:8000/api/task-update/${task.id}/`, {
        activeItem,
      })
      .then((response) => {
        this.setState({
          activeItem: {
            id: null,
            title: "",
            completed: false,
          },
        });
        this.fetchTasks();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { todoList, activeItem } = this.state;
    return (
      <div className="container">
        <div id="task-container">
          <div id="form-wrapper">
            <form id="form" onSubmit={this.handleSubmit}>
              <div className="flex-wrapper">
                <div style={{ flex: 6 }}>
                  <input
                    className="form-control"
                    id="title"
                    type="text"
                    name="title"
                    placeholder="Add task"
                    value={activeItem.title}
                    onChange={this.handleChange}
                  />
                </div>
                &nbsp;&nbsp;&nbsp;
                <div style={{ flex: 2 }}>
                  <button
                    className="btn btn-primary"
                    id="submit"
                    type="submit"
                    name="Add"
                    value="Submit"
                  >
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      className="bi bi-plus-square"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                      />
                    </svg>
                    &nbsp; To Do
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="list-wrapper">
            {todoList.map((task) => (
              <div key={task.id} className="task-wrapper flex-wrapper">
                <div style={{ flex: 6 }}>
                  {task.completed === false ? (
                    <span>{task.title}</span>
                  ) : (
                    <strike>
                      <span>{task.title}</span>
                    </strike>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <button
                    className="btn btn-sm btn-outline-success"
                    onClick={() => this.handleMarkAsDone(task)}
                  >
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      className="bi bi-check2-square"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M15.354 2.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L8 9.293l6.646-6.647a.5.5 0 0 1 .708 0z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M1.5 13A1.5 1.5 0 0 0 3 14.5h10a1.5 1.5 0 0 0 1.5-1.5V8a.5.5 0 0 0-1 0v5a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V3a.5.5 0 0 1 .5-.5h8a.5.5 0 0 0 0-1H3A1.5 1.5 0 0 0 1.5 3v10z"
                      />
                    </svg>
                  </button>
                </div>
                <div style={{ flex: 1 }}>
                  <button
                    className="btn btn-sm btn-outline-info"
                    onClick={() => this.handleEdit(task)}
                  >
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      className="bi bi-pencil-square"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fill-rule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                      />
                    </svg>
                  </button>
                </div>
                <div style={{ flex: 1 }}>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => this.handleDelete(task)}
                  >
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      className="bi bi-x-square"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
