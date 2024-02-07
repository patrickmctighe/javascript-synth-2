import  { useEffect, useRef } from 'react';
import "./styles/audioVisualizer2.css";
import PropTypes from 'prop-types';

const AudioVisualizer2 = ({ sequencerAnalyser }) => {
  const canvasRef = useRef(null);
  const dataArrayRef = useRef(null);
  const animationFrameIdRef = useRef(null);

  useEffect(() => {
    if (!sequencerAnalyser) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!dataArrayRef.current) {
      dataArrayRef.current = new Uint8Array(sequencerAnalyser.frequencyBinCount);
    }
    const dataArray = dataArrayRef.current;

    const sliceWidth = canvas.width * 1.0 / sequencerAnalyser.frequencyBinCount;

    const draw = () => {
      animationFrameIdRef.current = requestAnimationFrame(draw);

      sequencerAnalyser.getByteTimeDomainData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgb(0, 255, 0)';

      ctx.beginPath();

      let x = 0;

      for(let i = 0; i < sequencerAnalyser.frequencyBinCount; i++) {
        const v = dataArray[i] / 128.0;
        const y = v * canvas.height/2;

        if(i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height/2);
      ctx.stroke();
    };

    draw();

    return () => cancelAnimationFrame(animationFrameIdRef.current);
  }, [sequencerAnalyser]);

  return (
    <div className="canvas2">
      <canvas
        ref={canvasRef}
        className="audioCanvas2"
        id="audioCanvas2"
        width={900} 
        height={100} 
      />
    </div>
  );
};

AudioVisualizer2.propTypes = {
  sequencerAnalyser: PropTypes.shape({
    frequencyBinCount: PropTypes.number,
    getByteTimeDomainData: PropTypes.func,
  }).isRequired,
};

export default AudioVisualizer2;