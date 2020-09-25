import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/navigation/backdrop.scss';

const Backdrop = ({ onCloseNav }) => (
  <div className="drop-down-backdrop" onClick={onCloseNav} role="presentation" />
);

Backdrop.propTypes = {
  onCloseNav: PropTypes.func.isRequired,
};

export default Backdrop;
