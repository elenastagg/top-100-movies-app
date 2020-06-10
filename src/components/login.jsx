import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import '../styles/signup.scss';
import '../styles/button.scss';
import PropTypes from 'prop-types';
import axios from 'axios';
import TokenManager from '../utils/token-manager';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'michael@gmail.com',
      password: 'ilovelamp',
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
    const { history } = this.props;
    event.preventDefault();
    axios
      .post(`${process.env.API_URL}/users/login`, {
        email,
        password,
      })
      .then((response) => {
        TokenManager.setToken(response.data.token);
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
        <h1>Top 100 Movies List</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form">
            <h2 className="cta-box">Please login</h2>
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
              Login
            </button>
            <div className="link">
              Or
              <Link to="/signup"> Signup</Link>
            </div>
            {errorMessage && <span>{errorMessage}</span>}
          </div>
        </form>
      </Fragment>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
