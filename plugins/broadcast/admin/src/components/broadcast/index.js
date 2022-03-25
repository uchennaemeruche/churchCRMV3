import React, { Component } from "react";
import axios from "axios";

class Broadcast extends Component {
  constructor(props) {
    super(props);
    this.state = { emailAddress: "", emailBody: "" };
  }

  handleChange = (event) => {
    axios
      .post("http://localhost:1337/email/create", {
        emailAddress: this.state.emailAddress,
        emailBody: this.state.emailBody,
      })
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    event.preventDefault();
  };
  bindEmailEvent = (event) => {
    this.setState({ emailAddress: event.target.value });
  };
  bindBodyEvent = (event) => {
    this.setState({ emailBody: event.target.value });
  };
  render() {
    return (
      <div className="App container pt-5">
        <h2>Message Broadcast</h2>
        <p>{this.state.value}</p>
        <form onSubmit={this.handleChange}>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Email address</label>
            <input
              type="email"
              class="form-control"
              value={this.state.emailAddress}
              onChange={this.bindEmailEvent}
              placeholder="name@example.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">
              Example textarea
            </label>
            <textarea
              class="form-control"
              value={this.state.emailBody}
              onChange={this.bindBodyEvent}
              rows="3"
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary">
            Send Email
          </button>
        </form>
      </div>
    );
  }
}
export default Broadcast;
