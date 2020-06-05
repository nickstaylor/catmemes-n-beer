import React, { Component } from "react";
import "./Login.css";
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      zipCode: "80202",
      completedForm: false,
      loginError: ''
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  validateUser = (event) => {
    event.preventDefault()

    if (this.state.userName === '' || this.state.zipCode.length !== 5){
      this.setState({loginError: "One moment Daddy-O.  Please complete the inputs"})
    } else {
    this.setState({completedForm: true,
                  loginError: ''})
    const user = {user: this.state.userName, zipCode: this.state.zipCode}
    this.props.addUser(user)
    }
  }


  render(){
    return (
      <section className="login-form-background">
        <div className="login-content">
            <h1 className="main-title">A Little Getaway for Kitty-Loving Dads</h1>
          <form className="login-form" onSubmit = {(e)=> this.validateUser(e)}>
            {
              this.state.loginError
              && <p className="login-error">{this.state.loginError}</p>
            }
            <div className="login-form-item">
              <label htmlFor="userName">Name</label>
              <input
                type="text"
                name="userName"
                placeholder="name"
                value={this.state.userName}
                onChange={this.handleChange}
              />
            </div>
            <div className="login-form-item">
              <label htmlFor="zipCode">Zip Code</label>
              <input
                type="text"
                name="zipCode"
                maxLength="5"
                placeholder="80202"
                value={this.state.zipCode}
                onChange={this.handleChange}
              />
            </div>
            <button className="login-btn">MEOW!</button>
          </form>
          {this.state.completedForm && <Redirect to="/landing" />}
        </div>
      </section>
    )
  }
}

export default Login
