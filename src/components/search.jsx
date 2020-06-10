import React, { Fragment } from 'react';
import axios from 'axios';
import MovieCard from './movie-card';

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
    const searchEnc = encodeURI(search);
    axios
      .get(`${process.env.API_URL}/search?query=${searchEnc}`)
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        this.setState({ errorMessage: error.response.data.message });
      });
  };

  render() {
    const { search, movies, errorMessage } = this.state;
    return (
      <Fragment>
        <div className="search-bar">
          <input
            type="text"
            name="search"
            value={search}
            onChange={this.handleChange}
            placeholder="Search for a movie"
          />
          <button type="button" onClick={this.handleSearch}>
            search
          </button>
        </div>
        <div className="movies">
          <h1>Movies</h1>
          {errorMessage && <span>{errorMessage}</span>}
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </Fragment>
    );
  }
}

export default Search;
