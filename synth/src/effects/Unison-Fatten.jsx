
import PropTypes from 'prop-types';
import "../styles/unison-fatten.css";

function Unison({ noteWidth = 0, handleWidthChange }) {
 
  const handleWheel = (event) => {
    // event.preventDefault();
    let newValue = noteWidth - event.deltaY / 100;
    newValue = Math.max(0, Math.min(newValue, 50)); // Adjusted the range here
    newValue = Number(newValue.toFixed(2));
    handleWidthChange({ target: { value: newValue } });
  };

  return (
    <div className='widthBox box'>
      <div className="width">
        <div className="infoBox"><span className="width-value">{noteWidth}</span></div>
        <div className="inputBox">     <input
          type="range"
          min="0"
          max="50"
          step="0.01"
          value={noteWidth}
          onWheel={handleWheel}
          onChange={handleWidthChange}
          className="width-slider"
        /></div>
   
        <p>U / F</p>
      </div>
    </div>
  );
}

Unison.propTypes = {
  noteWidth: PropTypes.number.isRequired,
  handleWidthChange: PropTypes.func.isRequired,
};

export default Unison;