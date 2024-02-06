import  { useEffect, useRef } from 'react';
import "./styles/audioVisualizer.css";
import PropTypes from 'prop-types';
const AudioVisualizer = ({ analyser }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!analyser) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reducedBinCount = analyser.frequencyBinCount / 2;
    const dataArray = new Uint8Array(reducedBinCount);

    const draw = () => {
      requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / reducedBinCount) * 2.5;
      let barHeight;
      let x = 0;

      for(let i = 0; i < reducedBinCount; i++) {
        barHeight = dataArray[i]/255 * canvas.height;

        ctx.fillStyle = `rgba(${barHeight + 100}, ${50 + barHeight}, 150, 1)`;

        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    };

    draw();
  }, [analyser]);

  return (
    <div className="canvas">
    <canvas
      ref={canvasRef}
      className="audioCanvas"
      id="audioCanvas"
      width={900} // 90em converted to pixels
      height={100} // 10em converted to pixels
    /></div>
  );
};
AudioVisualizer.propTypes = {
  analyser: PropTypes.shape({
    frequencyBinCount: PropTypes.number,
    getByteFrequencyData: PropTypes.func,
  }).isRequired,
};
export default AudioVisualizer;