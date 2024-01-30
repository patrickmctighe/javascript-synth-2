import PropTypes from 'prop-types';

function Volume({ volume, onVolumeChange }) {
  return (
    <div className="volume">
      <p>Volume: <span className="volume-value">{volume}</span></p>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={onVolumeChange}
        className="volume-slider"
      />
    </div>
  );
}

Volume.propTypes = {
  volume: PropTypes.number.isRequired,
  onVolumeChange: PropTypes.func.isRequired,
};

export default Volume;