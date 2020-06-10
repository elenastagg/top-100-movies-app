import React, { Fragment } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import TokenManager from '../utils/token-manager';
import '../styles/button.scss';
import MovieCard from './movie-card';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      movies: [],
      errorMessage: '',
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const token = TokenManager.getToken();
    axios
      .get(`${process.env.API_URL}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const { firstName, lastName } = response.data;
        this.setState({
          firstName,
          lastName,
        });
      })
      .catch((error) => {
        this.setState({ errorMessage: error.response.data.message });
      });

    axios
      .get(`${process.env.API_URL}/favourites`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        this.setState({ errorMessage: error.response.data.message });
      });
  }

  handleSearch = () => {
    const { history } = this.props;
    history.push('/search');
  };

  render() {
    const { firstName, lastName, errorMessage, movies } = this.state;
    return (
      <Fragment>
        <div className="profile">
          <div className="profile-info-container">
            <div className="info-container">
              <div>{`${firstName} ${lastName} `}</div>
              {errorMessage && <div>{errorMessage}</div>}
            </div>
            <button className="button" type="button" onClick={this.handleSearch}>
              Search for your favourite movies
            </button>
            <div className="movies-container">
              {errorMessage && <div>{errorMessage}</div>}
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Profile;
