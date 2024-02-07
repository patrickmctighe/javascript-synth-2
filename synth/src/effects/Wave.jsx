import PropTypes from 'prop-types';
import "../styles/wave.css";

function Wave({ wave, onWaveChange }) {
  const waveforms = ["sine", "square", "sawtooth", "triangle"];

  const handleWheel = (event) => {
    // event.preventDefault();
    let currentIndex = waveforms.indexOf(wave);
    let newIndex = currentIndex - Math.sign(event.deltaY);
    if (newIndex < 0) newIndex = waveforms.length - 1;
    if (newIndex >= waveforms.length) newIndex = 0;
    onWaveChange(waveforms[newIndex]);
  };

  const handleWaveformChange = (event) => {
    const { value } = event.target;
    const newWaveform = waveforms[parseInt(value, 10)];
    onWaveChange(newWaveform);
  };

  let sliderText = waveforms.indexOf(wave);

  if (sliderText === 0) {
    sliderText = "SIN";
  }
  else if (sliderText === 1) {
    sliderText = "SQR";
  }
  else if (sliderText === 2) {
    sliderText = "SAW";
  }
  else if (sliderText === 3) {
    sliderText = "TRI";
  }
  
  
  return (
    <div className="waveBox box">
    <div className="waves">
      <div className="infoBox"> <span className="wave-value">{sliderText}</span></div>
      <div className="inputBox">   <input
        type="range"
        min="0"
        max="3"
        onWheel={handleWheel}
        value={waveforms.indexOf(wave)}
        onChange={handleWaveformChange}
        className="waveform-slider"
      /></div>
   
       <p>W A V </p>
    </div>
    </div>
  );
}

Wave.propTypes = {
  wave: PropTypes.string.isRequired,
  onWaveChange: PropTypes.func.isRequired,
};

export default Wave;