import React, { Fragment } from 'react';
import '../styles/signup.scss';
import '../styles/button.scss';
import PropTypes from 'prop-types';
import axios from 'axios';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      errorMessage: '',
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    const { firstName, lastName, username, email, password } = this.state;
    const { history } = this.props;
    event.preventDefault();
    axios
      .post(`${process.env.API_URL}/users/signup`, {
        first_name: firstName,
        last_name: lastName,
        username,
        email,
        password,
      })
      .then(() => {
        history.push('/');
      })
      .catch((error) => {
        this.setState({ errorMessage: error.response.data.message });
      });
  };

  render() {
    const { firstName, lastName, username, email, password, errorMessage } = this.state;
    return (
      <Fragment>
        <h1>Top 100 Movies List</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form">
            <h2 className="cta-box">Sign up to start now</h2>
            <input
              className="input-field"
              name="firstName"
              value={firstName}
              type="text"
              onChange={this.handleChange}
              placeholder="First Name"
            />
            <input
              className="input-field"
              name="lastName"
              value={lastName}
              type="text"
              onChange={this.handleChange}
              placeholder="Last Name"
            />
            <input
              className="input-field"
              name="username"
              value={username}
              type="text"
              onChange={this.handleChange}
              placeholder="Username"
            />
            <input
              className="input-field"
              name="email"
              value={email}
              type="email"
              onChange={this.handleChange}
              placeholder="email"
            />
            <input
              className="input-field password"
              name="password"
              value={password}
              type="password"
              onChange={this.handleChange}
              placeholder="Password"
            />
            <button type="submit" className="sign-up-button button">
              Sign Up
            </button>
            {errorMessage && <span>{errorMessage}</span>}
          </div>
        </form>
      </Fragment>
    );
  }
}

Signup.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Signup;
