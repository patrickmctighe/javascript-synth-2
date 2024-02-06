import PropTypes from "prop-types";
import "../styles/frequencyQ.css";

function FrequencyQ({
  frequency = 10,
  q = 0.0001,
  handleFrequencyChange,
  handleQChange,
}) {
  const handleWheel = (event, handleChange) => {
    let newValue = parseFloat(event.target.value) - event.deltaY / 2000;
    newValue = Math.max(0.01, Math.min(newValue, 1));
    newValue = Number(newValue.toFixed(2));
    handleChange({ target: { value: newValue } });
  };

  return (
    <div className="freqQBox box">
      <div className="lowpass">
        <div className="frq indvBox">
          <div className="infoBox">
            {" "}
            <span className="frq-value">{frequency}</span>
          </div>
          <div className="inputBox">
            <input
              type="range"
              min="0.01"
              max="1"
              step="0.01"
              value={frequency}
              onChange={handleFrequencyChange}
              onWheel={(event) => handleWheel(event, handleFrequencyChange)}
              className="frequency-slider"
            />
          </div>

          <p>FRQ</p>
        </div>
        <div className="Q indvBox">
          <div className="infoBox">
            <span className="q-value ">{q}</span>
          </div>
          <div className="inputBox">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={q}
              onChange={handleQChange}
              onWheel={(event) => handleWheel(event, handleQChange)}
              className="q-slider"
            />
          </div>

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
