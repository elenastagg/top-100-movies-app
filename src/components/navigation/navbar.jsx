import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TokenManager from '../../utils/token-manager';
import '../../styles/navigation/navbar.scss';
import NavToggleButton from './nav-toggle-button';

const Navbar = ({ isLoggedIn, onLogout, onToggleMobileNav }) => (
  <nav className="navbar">
    {isLoggedIn && (
      <Fragment>
        <div className="hamburger-menu">
          <NavToggleButton click={onToggleMobileNav} />
        </div>
        <ul className="nav-items">
          <li>
            <button className="button nav-item" type="button">
              <Link to="/search">Search Movies</Link>
            </button>
          </li>
          <li>
            <button className="button nav-item" type="button">
              <Link to={`/profile/${TokenManager.getTokenPayLoad().id}`}>My Profile</Link>
            </button>
          </li>
          <li>
            <button className="button nav-item" type="button" onClick={onLogout}>
              Log out
            </button>
          </li>
        </ul>
      </Fragment>
    )}
  </nav>
);

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
  onToggleMobileNav: PropTypes.func.isRequired,
};

export default Navbar;
