import React from 'react';
import PropTypes from 'prop-types';

function Echo({ echo = { feedback: 0.5, time: 0.5, maxDuration: 1 }, handleTimeChange, handleFeedbackChange, handleMaxDurationChange }) {
  const { time, feedback, maxDuration } = echo;

  return (
    <div>
      <div className="echo">
        <div className="time">
          <p>
            Time: <span className="time-value">{time}</span>
          </p>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={time}
            onChange={handleTimeChange}
            className="time-slider"
          />
        </div>
        <div className="feedback">
          <p>
            Feedback: <span className="feedback-value">{feedback}</span>
          </p>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={feedback}
            onChange={handleFeedbackChange}
            className="feedback-slider"
          />
        </div>
        <div className="maxDuration">
          <p>
            Max Duration: <span className="maxDuration-value">{maxDuration}</span>
          </p>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={maxDuration}
            onChange={handleMaxDurationChange}
            className="maxDuration-slider"
          />
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