import React from 'react';
import PropTypes from 'prop-types';
import '../styles/movie-card.scss';

const MovieCard = ({ movie, handleAddMovie }) => (
  <div className="movie-container">
    <img
      className="image"
      alt="movie"
      src={`http://image.tmdb.org/t/p/w154/${movie.poster_path}`}
    />
    <button onClick={() => handleAddMovie(movie.id)} type="button" className="button add">
      Add ★
    </button>
    <div className="movie-details">
      <h2 className="move-title">{movie.original_title}</h2>
      <div className="release-date">{movie.release_date}</div>
      <div className="genres">{movie.genres.join(', ')}</div>
      <h3 className="subheading">Overview</h3>
    </div>
    <div className="overview">{movie.overview}</div>
  </div>
);

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    original_title: PropTypes.string,
    poster_path: PropTypes.string,
    genres: PropTypes.array,
    overview: PropTypes.string,
    release_date: PropTypes.string,
  }).isRequired,
  handleAddMovie: PropTypes.func,
};

MovieCard.defaultProps = {
  handleAddMovie: () => {},
};

export default MovieCard;
