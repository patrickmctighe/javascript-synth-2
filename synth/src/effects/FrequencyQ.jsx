import React from 'react';
import PropTypes from 'prop-types';
import "../styles/frequencyQ.css";


function FrequencyQ({ frequency = 10, q = 0.0001, handleFrequencyChange, handleQChange }) {
  return (
    <div>
      <div className="lowpass">
        <div className="frq">
          
          <span className="frq-value">{frequency}</span>
          <input
            type="range"
            min="0.01"
            max="1"
            step="0.01"
            value={frequency}
            onChange={handleFrequencyChange}
            className="frequency-slider"
          />
          <p>FRQ</p>
        </div>
        <div className="Q">
         
          <span className="q-value">{q}</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={q}
            onChange={handleQChange}
            className="q-slider"
          />
           <p>Q</p>
        </div>
      </div>
    </div>
  );
}

FrequencyQ.propTypes = {
  frequency: PropTypes.number.isRequired,
  q: PropTypes.number.isRequired,
  handleFrequencyChange: PropTypes.func.isRequired,
  handleQChange: PropTypes.func.isRequired,
};

export default FrequencyQ;