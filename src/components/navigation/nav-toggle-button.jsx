import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/navigation/nav-toggle-button.scss';

const navToggleButton = ({ click }) => (
  <button type="button" className="toggle-button" onClick={click}>
    <div className="toggle-button-line" />
    <div className="toggle-button-line" />
    <div className="toggle-button-line" />
  </button>
);

navToggleButton.propTypes = {
  click: PropTypes.func.isRequired,
};

export default navToggleButton;
