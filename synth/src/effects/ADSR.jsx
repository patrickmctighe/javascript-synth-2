import React from 'react';
import PropTypes from 'prop-types';
import "../styles/adsr.css";

function ADSR({ ADSR = { attack: 0, decay: 0, sustain: 0, release: 0 }, handleAttackChange, handleDecayChange, handleSustainChange, handleReleaseChange }) {
  const { attack, decay, sustain, release } = ADSR;

  return (
    <div>
      <div className="adsr">
        <div className="attack">
        <span className="attack-value">{attack}</span>
        
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={attack}
            onChange={handleAttackChange}
            className="attack-slider"
          />
         <p>
            ATK
          </p>
        </div>
        <div className="decay">
          
          <span className="decay-value">{decay}</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={decay}
            onChange={handleDecayChange}
            className="decay-slider"
          />
          <p>
            DEC 
          </p>
        </div>
        <div className="sustain">
         
          <span className="sustain-value">{sustain}</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={sustain}
            onChange={handleSustainChange}
            className="sustain-slider"
          />
           <p>
            SUS
          </p>
        </div>
        <div className="release">
         
          <span className="release-value">{release}</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={release}
            onChange={handleReleaseChange}
            className="release-slider"
          />
           <p>
            REL
          </p>
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