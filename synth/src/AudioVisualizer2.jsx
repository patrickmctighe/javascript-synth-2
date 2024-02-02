import React, { useEffect, useRef } from 'react';
import "./styles/audioVisualizer2.css";

const AudioVisualizer2 = ({ analyser }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!analyser) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const draw = () => {
      requestAnimationFrame(draw);

      analyser.getByteTimeDomainData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgb(0, 255, 0)';

      ctx.beginPath();

      const sliceWidth = canvas.width * 1.0 / analyser.frequencyBinCount;
      let x = 0;

      for(let i = 0; i < analyser.frequencyBinCount; i++) {
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
  }, [analyser]);

return (
<div className="canvas2">
  <canvas
    ref={canvasRef}
    className="audioCanvas2"
    id="audioCanvas2"
    width={900} // 90em converted to pixels
    height={100} // 10em converted to pixels
  />
</div>
);
};

export default AudioVisualizer2;