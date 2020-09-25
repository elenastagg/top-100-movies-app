import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
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
      confirmPassword: '',
      errorMessage: '',
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    const { firstName, lastName, username, email, password, confirmPassword } = this.state;
    const { history } = this.props;
    event.preventDefault();
    if (password !== confirmPassword) {
      this.setState({ errorMessage: 'passwords must match' });
    } else {
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
    }
  };

  render() {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
      errorMessage,
    } = this.state;
    return (
      <Fragment>
        <main className="main-logged-out">
          <h1 className="title">Top 100 Movies List</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="form">
              <h2 className="secondary-title">Sign up to start now</h2>
              <label className="form-label" htmlFor="firstName">
                First Name
              </label>
              <input
                className="input-field"
                name="firstName"
                id="firstName"
                value={firstName}
                type="text"
                onChange={this.handleChange}
                placeholder="First Name"
              />
              <label className="form-label" htmlFor="lastName">
                Last Name
              </label>
              <input
                className="input-field"
                id="lastName"
                name="lastName"
                value={lastName}
                type="text"
                onChange={this.handleChange}
                placeholder="Last Name"
              />
              <label className="form-label" htmlFor="username">
                Username
              </label>
              <input
                className="input-field"
                name="username"
                id="username"
                value={username}
                type="text"
                onChange={this.handleChange}
                placeholder="Username"
              />
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                className="input-field"
                name="email"
                id="email"
                value={email}
                type="email"
                onChange={this.handleChange}
                placeholder="Email"
              />
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                className="input-field password"
                name="password"
                id="password"
                value={password}
                type="password"
                onChange={this.handleChange}
                placeholder="Password"
              />
              <label className="form-label" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                className="input-field password"
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                type="password"
                onChange={this.handleChange}
                placeholder="Confirm Password"
              />
              <button type="submit" className="submit-button button">
                Sign Up
              </button>
              <div className="link">
                Or
                <Link to="/"> Log in</Link>
              </div>
              {errorMessage && <span>{errorMessage}</span>}
            </div>
          </form>
        </main>
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
