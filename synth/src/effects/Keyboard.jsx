import React from 'react';


function Keyboard({ playNote, waveform, attack, decay, sustain, release, frequency, q, time, feedback, maxDuration, volume, width}) {


  return (
    <div className="keyboard">
      <button className="noteKey" data-note="c-4" onClick={() => playNote('c-4')}>C-4</button>
      <button className="noteKey" data-note="d-4" onClick={() => playNote('d-4')}>D-4</button>
      <button className="noteKey" data-note="e-4" onClick={() => playNote('e-4')}>E-4</button>
      <button className="noteKey" data-note="f-4" onClick={() => playNote('f-4')}>F-4</button>
      <button className="noteKey" data-note="g-4" onClick={() => playNote('g-4')}>G-4</button>
      <button className="noteKey" data-note="a-4" onClick={() => playNote('a-4')}>A-4</button>
      <button className="noteKey" data-note="b-4" onClick={() => playNote('b-4')}>B-4</button>
      <button className="noteKey" data-note="c-5" onClick={() => playNote('c-5')}>C-5</button>
      <button className="noteKey" data-note="c#4" onClick={() => playNote('c#4')}>C#4</button>
      <button className="noteKey" data-note="d#4" onClick={() => playNote('d#4')}>D#4</button>
      <button className="noteKey" data-note="f#4" onClick={() => playNote('f#4')}>F#4</button>
      <button className="noteKey" data-note="g#4" onClick={() => playNote('g#4')}>G#4</button>
      <button className="noteKey" data-note="a#4" onClick={() => playNote('a#4')}>A#4</button>
    </div>
  );
}

export default Keyboard;