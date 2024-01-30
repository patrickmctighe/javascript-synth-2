import React from 'react';
import PropTypes from 'prop-types';

function ADSR({ ADSR = { attack: 0, decay: 0, sustain: 0, release: 0 }, handleAttackChange, handleDecayChange, handleSustainChange, handleReleaseChange }) {
  const { attack, decay, sustain, release } = ADSR;

  return (
    <div>
      <div className="adsr">
        <div className="attack">
          <p>
            Attack: <span className="attack-value">{attack}</span>
          </p>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={attack}
            onChange={handleAttackChange}
            className="attack-slider"
          />
        </div>
        <div className="decay">
          <p>
            Decay: <span className="decay-value">{decay}</span>
          </p>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={decay}
            onChange={handleDecayChange}
            className="decay-slider"
          />
        </div>
        <div className="sustain">
          <p>
            Sustain: <span className="sustain-value">{sustain}</span>
          </p>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={sustain}
            onChange={handleSustainChange}
            className="sustain-slider"
          />
        </div>
        <div className="release">
          <p>
            Release: <span className="release-value">{release}</span>
          </p>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={release}
            onChange={handleReleaseChange}
            className="release-slider"
          />
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