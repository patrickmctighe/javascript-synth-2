import React from 'react';
import {useEffect, useRef} from 'react';

function Keyboard({ playNote}) {

   const keyNoteMap = {
    'a': 'c-4',
    's': 'd-4',
    'd': 'e-4',
    'f': 'f-4',
    'z': 'g-4',
    'x': 'a-4',
    'c': 'b-4',
    'v': 'c-5',
    'q': 'c#4',
    'w': 'd#4',
    'e': 'f#4',
    'r': 'g#4',
    't': 'a#4'
  };

  


  const activeNotes = useRef({});

  useEffect(() => {
    const handleKeyDown = (event) => {
      const note = keyNoteMap[event.key];
      if (note) {
        if (!activeNotes.current[note]) {
          console.log(`Starting note: ${note}`);
          activeNotes.current[note] = playNote(note);
        }
      }
    };

    const handleKeyUp = (event) => {
      const note = keyNoteMap[event.key];
      if (note && activeNotes.current[note]) {
        console.log(`Stopping note: ${note}`);
        activeNotes.current[note]();
        delete activeNotes.current[note];
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [playNote, keyNoteMap]);
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