import React from 'react';
import PropTypes from 'prop-types';
import "../styles/echo.css";
function Echo({ echo = { feedback: 0.5, time: 0.5, maxDuration: 1 }, handleTimeChange, handleFeedbackChange, handleMaxDurationChange }) {
  const { time, feedback, maxDuration } = echo;

  return (
    <div>
      <div className="echo">
        <div className="time">
         
           <span className="time-value">{time}</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={time}
            onChange={handleTimeChange}
            className="time-slider"
          />
           <p>
            T
          </p>
        </div>
        <div className="feedback">
        
          <span className="feedback-value">{feedback}</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={feedback}
            onChange={handleFeedbackChange}
            className="feedback-slider"
          />
            <p>
            F
          </p>
        </div>
        <div className="maxDuration">
         
          <span className="maxDuration-value">{maxDuration}</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={maxDuration}
            onChange={handleMaxDurationChange}
            className="maxDuration-slider"
          />
           <p>
            M
          </p>
        </div>
      </div>
    </div>
  );
}

Echo.propTypes = {
  echo: PropTypes.shape({
    feedback: PropTypes.number,
    time: PropTypes.number,
    maxDuration: PropTypes.number,
  }).isRequired,
  handleTimeChange: PropTypes.func.isRequired,
  handleFeedbackChange: PropTypes.func.isRequired,
  handleMaxDurationChange: PropTypes.func.isRequired,
};

export default Echo;