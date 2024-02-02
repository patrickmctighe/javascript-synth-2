import React, { useEffect, useRef } from 'react';
import "./styles/audioVisualizer.css";

const AudioVisualizer = ({ analyser }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!analyser) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const draw = () => {
      requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / analyser.frequencyBinCount) * 2.5;
      let barHeight;
      let x = 0;

      for(let i = 0; i < analyser.frequencyBinCount; i++) {
        barHeight = dataArray[i]/255 * canvas.height;

        const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);
        gradient.addColorStop(0, `rgba(${barHeight + 100}, ${50 + barHeight}, 150, 1)`);
        gradient.addColorStop(1, `rgba(${barHeight + 100}, ${50 + barHeight}, 150, 0)`);

        ctx.fillStyle = gradient;
        ctx.shadowBlur = barHeight * 0.5;
        ctx.shadowColor = `rgba(${barHeight + 100}, ${50 + barHeight}, 150, 1)`;

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

export default AudioVisualizer;