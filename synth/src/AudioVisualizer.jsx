import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import "./styles/audioVisualizer.css";

const AudioVisualizer = ({ analyser }) => {
  const canvasRef = useRef(null);
  const dataArrayRef = useRef(null);
  const animationFrameIdRef = useRef(null);

  useEffect(() => {
    if (!analyser) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reducedBinCount = analyser.frequencyBinCount / 2;

    if (!dataArrayRef.current) {
      dataArrayRef.current = new Uint8Array(reducedBinCount);
    }
    const dataArray = dataArrayRef.current;

    const draw = () => {
      animationFrameIdRef.current = requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / reducedBinCount) * 2.5;
      let x = 0;

      for(let i = 0; i < reducedBinCount; i++) {
        const barHeight = dataArray[i] / 255 * canvas.height;

        ctx.fillStyle = `rgba(${barHeight + 100}, ${50 + barHeight}, 150, 1)`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    };

    draw();

    return () => cancelAnimationFrame(animationFrameIdRef.current);
  }, [analyser]);

  return (
    <div className="canvas">
      <canvas
        ref={canvasRef}
        className="audioCanvas"
        id="audioCanvas"
        width={400} // Adjusted canvas width
        height={100} // Adjusted canvas height
      />
    </div>
  );
};

AudioVisualizer.propTypes = {
  analyser: PropTypes.shape({
    frequencyBinCount: PropTypes.number,
    getByteFrequencyData: PropTypes.func,
  }).isRequired,
};

export default AudioVisualizer;