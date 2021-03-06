import React from 'react';
import PropTypes from 'prop-types';
import '../styles/movie-card.scss';
import TokenManager from '../utils/token-manager';

const MovieCard = ({ movie, handleAddMovie, onDelete, id, errorMessage }) => (
  <div
    className="movie-card-container"
    style={{
      backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}')`,
      backgroundSize: 'cover',
    }}
  >
    <div className="movie-card-content">
      <img
        className="image"
        alt="movie"
        src={`https://image.tmdb.org/t/p/w92/${movie.poster_path}`}
      />

      {parseInt(id, 10) === TokenManager.getTokenPayLoad().id ? (
        <button onClick={() => onDelete(movie.id)} type="button" className="button add-button">
          Delete
        </button>
      ) : (
        <button
          id="add"
          onClick={() => handleAddMovie(movie.id)}
          type="button"
          className="button add-button"
        >
          {movie.isAdded ? `Added ✓` : `Add ★`}
        </button>
      )}
      {errorMessage && <span className="message white">{errorMessage}</span>}
      <div className="movie-details">
        <h2 className="movie-title">{movie.original_title}</h2>
        <div className="release-date">{movie.release_date}</div>
        <div className="genres">{movie.genres.join(', ')}</div>
      </div>
      <h3 className="subheading">Overview</h3>
      <div className="movie-overview">{movie.overview}</div>
    </div>
  </div>
);

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    original_title: PropTypes.string,
    poster_path: PropTypes.string,
    backdrop_path: PropTypes.string,
    isAdded: PropTypes.bool,
    genres: PropTypes.array,
    overview: PropTypes.string,
    release_date: PropTypes.string,
  }).isRequired,
  id: PropTypes.string,
  handleAddMovie: PropTypes.func,
  onDelete: PropTypes.func,
};

MovieCard.defaultProps = {
  id: '',
  handleAddMovie: () => {},
  onDelete: () => {},
};

export default MovieCard;
