import PropTypes from 'prop-types';
import "../styles/volume.css";

function Volume({ volume, onVolumeChange }) {
  return (
    <div className="volumeBox box">
    <div className="volume">
      <div className="infoBox"> <span className="volume-value">{volume}</span></div>
     
      <div className="volInput"> <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={onVolumeChange}
        className="volume-slider"
      /></div>
      <p>VOL</p>
    </div>
    </div>
  );
}

Volume.propTypes = {
  volume: PropTypes.number.isRequired,
  onVolumeChange: PropTypes.func.isRequired,
};

export default Volume;