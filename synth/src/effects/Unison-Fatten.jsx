import React from 'react';
import PropTypes from 'prop-types';
import "../styles/unison-fatten.css";

function Unison({ noteWidth = 0, handleWidthChange }) {
  console.log('Unison noteWidth:', noteWidth);
  return (
    <div>
      <div className="width">
        
        <span className="width-value">{noteWidth}</span>
        <input
          type="range"
          min="0"
          max="50"
          step="0.01"
          value={noteWidth}
          onChange={handleWidthChange}
          className="width-slider"
        />
        <p>U / F</p>
      </div>
    </div>
  );
}

Unison.propTypes = {
  noteWidth: PropTypes.number.isRequired,
  handleWidthChange: PropTypes.func.isRequired,
};

export default Unison;