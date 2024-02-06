import PropTypes from "prop-types";
import "../styles/adsr.css";

function ADSR({
  ADSR = { attack: 0, decay: 0, sustain: 0, release: 0 },
  handleAttackChange,
  handleDecayChange,
  handleSustainChange,
  handleReleaseChange,
}) {
  const { attack, decay, sustain, release } = ADSR;

  const handleWheel = (event, handleChange) => {
    let newValue = event.target.value - event.deltaY / 2000;
    newValue = Math.max(0, Math.min(newValue, 1));
    newValue = Number(newValue.toFixed(2));
    handleChange({ target: { value: newValue } });
  };

  return (
    <div className="adsrBox box">
      <div className="adsr">
        <div className="attack indvBox">
          <div className="infoBox">
            {" "}
            <span className="attack-value">{attack}</span>
          </div>

          <div className="inputBox">
            {" "}
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={attack}
              onChange={handleAttackChange}
              onWheel={(event) => handleWheel(event, handleAttackChange)}
              className="attack-slider"
            />
          </div>

          <p>ATK</p>
        </div>
        <div className="decay indvBox">
          <div className="infoBox">
            {" "}
            <span className="decay-value">{decay}</span>
          </div>

          <div className="inputBox">
            {" "}
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={decay}
              onChange={handleDecayChange}
              onWheel={(event) => handleWheel(event, handleDecayChange)}
              className="decay-slider"
            />
          </div>

          <p>DEC</p>
        </div>
        <div className="sustain indvBox">
          <div className="infoBox">
            {" "}
            <span className="sustain-value">{sustain}</span>
          </div>
          <div className="inputBox">
            {" "}
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={sustain}
              onChange={handleSustainChange}
              onWheel={(event) => handleWheel(event, handleSustainChange)}
              className="sustain-slider"
            />
          </div>

          <p>SUS</p>
        </div>
        <div className="release indvBox">
          <div className="infoBox">
            {" "}
            <span className="release-value">{release}</span>
          </div>
          <div className="inputBox">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={release}
              onChange={handleReleaseChange}
              onWheel={(event) => handleWheel(event, handleReleaseChange)}
              className="release-slider"
            />
          </div>

          <p>REL</p>
        </div>
      </div>
    </div>
  );
}

ADSR.propTypes = {
  ADSR: PropTypes.shape({
    attack: PropTypes.number,
    decay: PropTypes.number,
    sustain: PropTypes.number,
    release: PropTypes.number,
  }).isRequired,
  handleAttackChange: PropTypes.func.isRequired,
  handleDecayChange: PropTypes.func.isRequired,
  handleSustainChange: PropTypes.func.isRequired,
  handleReleaseChange: PropTypes.func.isRequired,
};

export default ADSR;
