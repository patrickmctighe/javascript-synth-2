import PropTypes from "prop-types";
import "../styles/echo.css";

function Echo({
  echo = { feedback: 0.5, time: 0.5, maxDuration: 1 },
  handleTimeChange,
  handleFeedbackChange,
  handleMaxDurationChange,
}) {
  const { time, feedback, maxDuration } = echo;

  const handleWheel = (event, handleChange) => {
    let newValue = parseFloat(event.target.value) - event.deltaY / 2000;
    newValue = Math.max(0, Math.min(newValue, 1));
    newValue = Number(newValue.toFixed(2));
    handleChange({ target: { value: newValue } });
  };

  return (
    <div className="echoBox box">
      <div className="echo">
        <div className="time indvBox">
          <div className="infoBox">
            {" "}
            <span className="time-value">{time}</span>
          </div>
          <div className="inputBox">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={time}
              onChange={handleTimeChange}
              onWheel={(event) => handleWheel(event, handleTimeChange)}
              className="time-slider"
            />
          </div>

          <p>T M</p>
        </div>
        <div className="feedback indvBox">
          <div className="infoBox">
            {" "}
            <span className="feedback-value">{feedback}</span>
          </div>
          <div className="inputBox">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={feedback}
              onChange={handleFeedbackChange}
              onWheel={(event) => handleWheel(event, handleFeedbackChange)}
              className="feedback-slider"
            />
          </div>

          <p>F B K</p>
        </div>
        <div className="maxDuration indvBox">
          <div className="infoBox">
            {" "}
            <span className="maxDuration-value">{maxDuration}</span>
          </div>
          <div className="inputBox">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={maxDuration}
              onChange={handleMaxDurationChange}
              onWheel={(event) => handleWheel(event, handleMaxDurationChange)}
              className="maxDuration-slider"
            />
          </div>

          <p>M A X</p>
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
