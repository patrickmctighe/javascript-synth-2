import React from 'react';
import PropTypes from 'prop-types';

function Unison({ noteWidth = 0, handleWidthChange }) {
  console.log('Unison noteWidth:', noteWidth);
  return (
    <div>
      <div className="width">
        <p>Width: <span className="width-value">{noteWidth}</span></p>
        <input
          type="range"
          min="0"
          max="50"
          step="0.01"
          value={noteWidth}
          onChange={handleWidthChange}
          className="width-slider"
        />
      </div>
    </div>
  );
}

Unison.propTypes = {
  noteWidth: PropTypes.number.isRequired,
  handleWidthChange: PropTypes.func.isRequired,
};

export default Unison;