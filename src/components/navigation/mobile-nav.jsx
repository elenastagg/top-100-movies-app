import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TokenManager from '../../utils/token-manager';
import '../../styles/navigation/mobile-nav.scss';

const MobileNav = ({ isLoggedIn, onCloseNav, onLogout }) => (
  <nav className="mobile-nav">
    {isLoggedIn && (
      <Fragment>
        <ul className="mobile-nav-items">
          <li>
            <button className="mobile-nav-item" type="button" onClick={onCloseNav}>
              <Link to="/search">Search Movies</Link>
            </button>
          </li>
          <li>
            <button className="mobile-nav-item" type="button" onClick={onCloseNav}>
              <Link to={`/profile/${TokenManager.getTokenPayLoad().id}`}>My Profile</Link>
            </button>
          </li>
          <li>
            <button className="mobile-nav-item" type="button" onClick={onLogout}>
              Log out
            </button>
          </li>
        </ul>
      </Fragment>
    )}
  </nav>
);
MobileNav.propTypes = {
  onLogout: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  onCloseNav: PropTypes.func.isRequired,
};

export default MobileNav;
