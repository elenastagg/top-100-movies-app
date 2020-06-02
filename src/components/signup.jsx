import React, { Fragment } from 'react';
import '../styles/signup.scss';
import PropTypes from 'prop-types';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { firstName, lastName, email, password } = this.state;
  };

  render() {
    const { firstName, lastName, email, password } = this.state;
    return (
      <Fragment>
        <h1>Top 100 Movies List</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="signup-form">
            <h2 className="cta-box">Sign up to start now</h2>
            <input
              className="input-field"
              name="firstName"
              value={firstName}
              type="text"
              onChange={this.handleChange}
            />
            <input
              className="input-field"
              name="lastName"
              value={lastName}
              type="text"
              onChange={this.handleChange}
            />
            <input
              className="input-field"
              name="email"
              value={email}
              type="email"
              onChange={this.handleChange}
            />
            <input
              className="input-field password"
              name="password"
              value={password}
              type="password"
              onChange={this.handleChange}
            />
            <button type="submit" className="signup-button">
              Sign Up
            </button>
          </div>
        </form>
      </Fragment>
    );
  }
}

// MovieCard.propTypes = {
//   movie: PropTypes.shape({
//     id: PropTypes.number,
//     original_title: PropTypes.string,
//     poster_path: PropTypes.string,
//     genres: PropTypes.array,
//     overview: PropTypes.string,
//     release_date: PropTypes.string,
//   }).isRequired,
// };

export default Signup;
