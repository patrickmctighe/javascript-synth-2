import PropTypes from 'prop-types';
import "../styles/volume.css";


function Volume({ volume, onVolumeChange }) {

  const handleWheel = (event) => {
    event.preventDefault();
    let newValue = volume - event.deltaY / 2000;
    newValue = Math.max(0, Math.min(newValue, 1));
    newValue = Number(newValue.toFixed(2));
    onVolumeChange({ target: { value: newValue } });
  };

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
        onWheel={handleWheel}
        onChange={onVolumeChange}
        className="volume-slider"
      /></div>
      <p>V O L</p>
    </div>
    </div>
  );
}

Volume.propTypes = {
  volume: PropTypes.number.isRequired,
  onVolumeChange: PropTypes.func.isRequired,
};

export default Volume;