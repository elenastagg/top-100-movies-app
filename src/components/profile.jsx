import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import TokenManager from '../utils/token-manager';
import '../styles/main-logged-in.scss';
import '../styles/movie-card.scss';
import MovieCard from './movie-card';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      movies: [],
      errorMessage: '',
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    this.getProfile(id);
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props;
    const { id } = match.params;
    if (prevProps.match.params.id !== id) {
      this.getProfile(id);
    }
  }

  getProfile(id) {
    const token = TokenManager.getToken();

    axios
      .get(`${process.env.API_URL}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const { username } = response.data;
        this.setState({
          username,
        });
      })
      .catch((error) => {
        this.setState({ errorMessage: error.response.data.message });
      });

    axios
      .get(`${process.env.API_URL}/users/${id}/favourites`, {
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

  handleDeleteMovie = (id) => {
    const token = TokenManager.getToken();
    axios
      .delete(`${process.env.API_URL}/favourites/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        const { movies } = this.state;
        const isNotDeletedMovie = (movie) => movie.id !== id;
        const notDeletedMovies = movies.filter(isNotDeletedMovie);
        this.setState({
          movies: notDeletedMovies,
        });
      })
      .catch((error) => {
        this.setState({ errorMessage: error.response.data.message });
      });
  };

  handleAddMovie = (id) => {
    const { movies } = this.state;
    const token = TokenManager.getToken();
    if (token !== null) {
      axios
        .post(
          `${process.env.API_URL}/favourites`,
          {
            movie_id: `${id}`,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )
        .then(() => {
          this.setState({
            movies: movies.map((movie) => {
              if (movie.id === id) {
                return {
                  ...movie,
                  isAdded: true,
                };
              }
              return movie;
            }),
          });
        })
        .catch((error) => {
          this.setState({ errorMessage: error.response.data.message });
        });
    }
  };

  render() {
    const { username, errorMessage, movies } = this.state;
    const { match } = this.props;
    const { id } = match.params;
    return (
      <Fragment>
        <main className="main-logged-in">
          <div className="header">
            <h2>
              {parseInt(id, 10) === TokenManager.getTokenPayLoad().id
                ? `Welcome ${username}`
                : `${username}'s profile`}
            </h2>
            <div>
              <button className="button search" type="button">
                <Link to="/search"> Search for your favourite movies</Link>
              </button>
            </div>
            {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
            <h1 className="title">
              {parseInt(id, 10) === TokenManager.getTokenPayLoad().id
                ? `Here are your Top ${movies.length} Movies...`
                : `${username}'s Top ${movies.length} Movies...`}
            </h1>
            {errorMessage && <div>{errorMessage}</div>}
          </div>
          <div className="movies-container">
            {errorMessage && <div>{errorMessage}</div>}
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onDelete={this.handleDeleteMovie}
                handleAddMovie={this.handleAddMovie}
                id={id}
              />
            ))}
          </div>
        </main>
      </Fragment>
    );
  }
}

Profile.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Profile;
