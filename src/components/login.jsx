import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import '../styles/intro-page.scss';
import '../styles/button.scss';
import PropTypes from 'prop-types';
import axios from 'axios';
import TokenManager from '../utils/token-manager';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const { email, password } = this.state;
    const { onLogin, history } = this.props;
    event.preventDefault();
    axios
      .post(`${process.env.API_URL}/users/login`, {
        email,
        password,
      })
      .then((response) => {
        TokenManager.setToken(response.data.token);
        onLogin();
        history.push(`/profile/${TokenManager.getTokenPayLoad().id}`);
      })
      .catch((error) => {
        this.setState({ errorMessage: error.message });
      });
  };

  render() {
    const { email, password, errorMessage } = this.state;
    return (
      <Fragment>
        <main className="main-logged-out">
          <h1 className="title">Top 100 Movies List</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="form">
              <h2 className="secondary-title">Please login</h2>
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                className="input-field"
                id="email"
                name="email"
                value={email}
                type="email"
                onChange={this.handleChange}
                placeholder="email"
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
              <button type="submit" className="submit-button button">
                Login
              </button>
              <div className="link">
                Or
                <Link to="/signup"> Signup</Link>
              </div>
              {errorMessage && <span>{errorMessage}</span>}
            </div>
          </form>
        </main>
      </Fragment>
    );
  }
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
