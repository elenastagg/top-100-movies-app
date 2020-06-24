import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TokenManager from '../utils/token-manager';
import '../styles/button.scss';
import '../styles/navbar.scss';

const Navbar = ({ isLoggedIn, onLogout }) => (
  <nav className="navbar">
    {isLoggedIn && (
      <Fragment>
        <div>
          <button className="button nav-item" type="button">
            <Link to="/search">Search</Link>
          </button>
        </div>
        <div>
          <button className="button nav-item" type="button">
            <Link to={`/profile/${TokenManager.getTokenPayLoad().id}`}>My Profile</Link>
          </button>
        </div>
        <div>
          <button className="button nav-item" type="button" onClick={onLogout}>
            Log out
          </button>
        </div>
      </Fragment>
    )}
  </nav>
);

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Navbar;
