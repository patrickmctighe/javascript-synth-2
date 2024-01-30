import PropTypes from 'prop-types';

function Wave({ wave, onWaveChange }) {
  const waveforms = ["sine", "square", "sawtooth", "triangle"];

  const handleWaveformChange = (event) => {
    const { value } = event.target;
    const newWaveform = waveforms[parseInt(value, 10)];
    onWaveChange(newWaveform);
  };

  return (
    <div className="waves">
      <p>Waveform: <span className="wave-value">{wave}</span></p>
      <input
        type="range"
        min="0"
        max="3"
        value={waveforms.indexOf(wave)}
        onChange={handleWaveformChange}
        className="waveform-slider"
      />
    </div>
  );
}

Wave.propTypes = {
  wave: PropTypes.string.isRequired,
  onWaveChange: PropTypes.func.isRequired,
};

export default Wave;