import React, { useEffect, useState } from 'react';
import "../styles/keyboard.css";

function Keyboard({ playNote }) {
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

  const [activeKeys, setActiveKeys] = useState({});

  useEffect(() => {
    const handleKeyDown = (event) => {
      const note = keyNoteMap[event.key];
      if (note) {
        setActiveKeys(prevKeys => ({ ...prevKeys, [note]: (prevKeys[note] || 0) + 1 }));
        playNote(note);
      }
    };

    const handleKeyUp = (event) => {
      const note = keyNoteMap[event.key];
      if (note) {
        setActiveKeys(prevKeys => ({ ...prevKeys, [note]: prevKeys[note] > 0 ? prevKeys[note] - 1 : 0 }));
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
    {Object.keys(keyNoteMap).map(key => {
      const note = keyNoteMap[key];
      return (
        <button
          key={note}
          className={`noteKey ${activeKeys[note] && activeKeys[note] > 0 ? 'noteKeyActive' : ''}`}
          data-note={note}
          onClick={() => playNote(note)}
        >
          {note.toUpperCase()}
        </button>
      );
    })}
  </div>
  );
}

export default Keyboard;