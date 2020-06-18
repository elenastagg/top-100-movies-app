import React, { Fragment } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import MovieCard from './movie-card';
import TokenManager from '../utils/token-manager';
import '../styles/button.scss';
import '../styles/search.scss';
import '../styles/page-banner.scss';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      movies: [],
      errorMessage: '',
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSearch = () => {
    const { search } = this.state;
    const token = TokenManager.getToken();
    const searchEnc = encodeURI(search);
    axios
      .get(`${process.env.API_URL}/movies/search?query=${searchEnc}`, {
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
    const { search, movies, errorMessage, message } = this.state;
    return (
      <Fragment>
        <div className="page-banner">
          <h1 className="header">Find your Favourite Movies</h1>
          <div className="search-bar">
            <input
              className="button search-input"
              type="text"
              name="search"
              value={search}
              onChange={this.handleChange}
              placeholder="Search for a movie"
            />
            <button type="button" className="button" onClick={this.handleSearch}>
              search
            </button>
          </div>
        </div>
        <div className="movies">
          {errorMessage && <span className="message">{errorMessage}</span>}
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              handleAddMovie={this.handleAddMovie}
              message={message}
            />
          ))}
        </div>
      </Fragment>
    );
  }
}

Search.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Search;
