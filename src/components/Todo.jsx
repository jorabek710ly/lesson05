import {
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

import { Component } from "react";
import "./Todo.css";

export default class Todo extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      formOpening: false,
      data: [],
      editingId: null,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.firstName.trim()) return null;
    if (!this.state.lastName.trim()) return null;
    if (!this.state.email.trim()) return null;
    if (!this.state.password.trim()) return null;

    const { editingId, data, firstName, lastName, email, password } =
      this.state;

    if (editingId) {
      const updatedData = data.map((item) =>
        item.id === editingId
          ? { ...item, firstName, lastName, email, password }
          : item
      );
      this.setState({
        data: updatedData,
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        formOpening: false,
        editingId: null,
      });
    } else {
      const newTodo = {
        id: Date.now(),
        firstName,
        lastName,
        email,
        password,
      };
      this.setState({
        data: [...data, newTodo],
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        formOpening: false,
      });
    }
  };

  handleDelete = (id) => {
    const filteredData = this.state.data.filter((item) => item.id !== id);
    this.setState({ data: filteredData });
  };

  handleEdit = (item) => {
    this.setState({
      formOpening: true,
      editingId: item.id,
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      password: item.password,
    });
  };

  render() {
    return (
      <div className="todo-wrapper">
        <div className="container">
          <div className="todo-header">
            <h1 className="todo-title">User List Panel</h1>
            <button
              onClick={() =>
                this.setState({ formOpening: true, editingId: null })
              }
              className="todo-add-btn"
            >
              <UserAddOutlined style={{ marginRight: "8px" }} />
              New User
            </button>
          </div>

          <div className="todo-table">
            <table className="todo-new-table">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Edit / Delete</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data?.map((item) => (
                  <tr key={item.id}>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.email}</td>
                    <td>{"•".repeat(item.password.length)}</td>
                    <td className="actions">
                      <button
                        onClick={() => this.handleEdit(item)}
                        className="action-btn edit-btn"
                      >
                        <EditOutlined
                          style={{ color: "blue", fontSize: "18px" }}
                        />
                      </button>
                      <button
                        onClick={() => this.handleDelete(item.id)}
                        className="action-btn delete-btn"
                      >
                        <DeleteOutlined
                          style={{ color: "red", fontSize: "18px" }}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
                {this.state.data.length === 0 && (
                  <tr>
                    <td colSpan={5} className="no-data">
                      It looks like you haven’t added any users yet. Click the
                      "Add New User" button to create your first user profile
                      and get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {this.state.formOpening && (
            <div className="todo-modal">
              <div className="todo-modal-content">
                <div className="modal-header">
                  <h2 className="modal-title">
                    {this.state.editingId ? "Edit User" : "New User"}
                  </h2>
                  <button
                    onClick={() =>
                      this.setState({ formOpening: false, editingId: null })
                    }
                    className="modal-close"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={this.handleSubmit} className="modal-form">
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "16px",
                    }}
                  >
                    <div>
                      <label>First Name</label>
                      <input
                        required
                        placeholder="First Name"
                        value={this.state.firstName}
                        onChange={(e) =>
                          this.setState({ firstName: e.target.value })
                        }
                        type="text"
                      />
                    </div>
                    <div>
                      <label>Last Name</label>
                      <input
                        required
                        placeholder="Last Name"
                        value={this.state.lastName}
                        onChange={(e) =>
                          this.setState({ lastName: e.target.value })
                        }
                        type="text"
                      />
                    </div>
                  </div>

                  <div>
                    <label>Email</label>
                    <input
                      required
                      placeholder="Email"
                      value={this.state.email}
                      onChange={(e) => this.setState({ email: e.target.value })}
                      type="text"
                    />
                  </div>

                  <div>
                    <label>Password</label>
                    <input
                      required
                      placeholder="Password"
                      value={this.state.password}
                      onChange={(e) =>
                        this.setState({ password: e.target.value })
                      }
                      type="password"
                    />
                  </div>

                  <div className="modal-actions">
                    <button
                      type="button"
                      onClick={() =>
                        this.setState({ formOpening: false, editingId: null })
                      }
                      className="cancel-btn"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="add-btn">
                      {this.state.editingId ? "Update User" : "Add User"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
