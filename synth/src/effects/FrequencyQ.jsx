import React from 'react';
import PropTypes from 'prop-types';

function FrequencyQ({ frequency = 10, q = 0.0001, handleFrequencyChange, handleQChange }) {
  return (
    <div>
      <div className="lowpass">
        <div className="frq">
          <p>FRQ: <span className="frq-value">{frequency}</span></p>
          <input
            type="range"
            min="0.01"
            max="1"
            step="0.01"
            value={frequency}
            onChange={handleFrequencyChange}
            className="frequency-slider"
          />
        </div>
        <div className="Q">
          <p>Q: <span className="q-value">{q}</span></p>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={q}
            onChange={handleQChange}
            className="q-slider"
          />
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