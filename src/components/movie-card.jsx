import React from 'react';
import PropTypes from 'prop-types';

const MovieCard = ({ movie, genres }) => (
  <div className="movie-container">
    <img className="image" alt="movie" src={`http://image.tmdb.org/t/p/w92/${movie.poster_path}`} />
    <h1 className="move-title">{movie.original_title}</h1>
    <div className="facts">
      <span className="genres">
        {movie.genre_ids
          // eslint-disable-next-line react/prop-types
          .map((genreId) => genres.find((genre) => genre.id === genreId).name)
          .join(', ')}
      </span>
      <span className="release-date">{movie.release_date}</span>
    </div>
    <h3 className="subheading">Overview</h3>
    <div className="overview">{movie.overview}</div>
  </div>
);

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    original_title: PropTypes.string,
    poster_path: PropTypes.string,
    genre_ids: PropTypes.array,
    overview: PropTypes.string,
    release_date: PropTypes.string,
  }).isRequired,
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ).isRequired,
};

export default MovieCard;
