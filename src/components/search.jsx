import React, { Fragment } from 'react';
import axios from 'axios';
import MovieCard from './movie-card';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      movies: [],
      genres: [],
      errorMessage: '',
    };
  }

  componentDidMount() {
    axios
      .get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}`)
      .then((response) => {
        this.setState({
          genres: response.data.genres,
        });
      });
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
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${searchEnc}&append_to_response=genre`,
      )
      .then((response) => {
        this.setState({
          movies: response.data.results,
        });
      })
      .catch((error) => {
        this.setState({ errorMessage: error.response.data.message });
      });
  };

  render() {
    const { genres, search, movies, errorMessage } = this.state;
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
        <div className="Movies">
          <h1>Movies</h1>
          {errorMessage && <span>{errorMessage}</span>}
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} genres={genres} />
          ))}
        </div>
      </Fragment>
    );
  }
}

export default Search;
