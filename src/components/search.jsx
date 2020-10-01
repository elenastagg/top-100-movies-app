import React, { Fragment } from 'react';
import axios from 'axios';
import loadable from '@loadable/component';
import PropTypes from 'prop-types';
import TokenManager from '../utils/token-manager';
import '../styles/button.scss';
import '../styles/search.scss';
import '../styles/main-logged-in.scss';

const MovieCard = loadable(() => import('./movie-card'));

class Search extends React.Component {
  constructor(props) {
    super(props);
    const { location } = props;
    const searchParams = new URLSearchParams(location.search);
    this.state = {
      search: searchParams.has('query') ? searchParams.get('query') : '',
      movies: [],
      errorMessage: '',
    };
  }

  componentDidMount() {
    const { location } = this.props;
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.has('query')) {
      this.handleSearch();
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSearch = () => {
    const { search } = this.state;
    const { history } = this.props;
    const token = TokenManager.getToken();
    const searchEnc = encodeURI(search);

    history.push({
      search: `query=${searchEnc}`,
    });
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
          this.setState({ errorMessage: error.response.data });
        });
    }
  };

  render() {
    const { search, movies, errorMessage, message } = this.state;
    return (
      <Fragment>
        <main className="main-logged-in">
          <div className="header">
            <h1 className="title">Find your Favourite Movies</h1>
            <div className="search-bar">
              <label className="form-label" htmlFor="search">
                Search
              </label>
              <input
                className="button search-input"
                id="search"
                type="text"
                name="search"
                value={search}
                onChange={this.handleChange}
                placeholder="Search for a movie"
              />
              <button
                aria-label="search button"
                type="button"
                className="button search"
                onClick={this.handleSearch}
              >
                <span className="search-button-text-1">
                  <i className="fas fa-angle-double-right" />
                </span>
                <span className="search-button-text-2">search</span>
              </button>
            </div>
          </div>
          <div className="movies">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                handleAddMovie={this.handleAddMovie}
                message={message}
                errorMessage={errorMessage}
              />
            ))}
          </div>
        </main>
      </Fragment>
    );
  }
}

Search.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Search;
