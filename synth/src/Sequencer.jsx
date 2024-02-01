import React, { useState, useEffect, useRef } from 'react';
import { playNote } from './playFunction';
import './styles/sequencer.css';

const notes = ["c-4", "d-4", "e-4", "f-4", "g-4", "a-4", "b-4", "c-5", "c#4", "d#4", "f#4", "g#4", "a#4", "silent"];

function Sequencer({noteKey, waveform, ADSR, frequency, q, volume, actx, noteWidth, time, feedback, maxDuration}) {
  const [sequence, setSequence] = useState(Array(16).fill('c-4'));
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(500); // New state variable for playback speed
  const noteIndexRef = useRef(0);
  const sequenceRef = useRef(sequence);

  useEffect(() => {
    sequenceRef.current = sequence;
  }, [sequence]);

  const playSequence = () => {
    return setInterval(() => {
      const note = sequenceRef.current[noteIndexRef.current];
      const { attack, decay, sustain, release } = ADSR;
      playNote(note, waveform, { attack, decay, sustain, release }, frequency, q, volume, actx, noteWidth, time, feedback, maxDuration);
      noteIndexRef.current = (noteIndexRef.current + 1) % sequence.length;
    }, playbackSpeed); // Use playbackSpeed state variable here
  };

  useEffect(() => {
    let intervalId;
    if (isPlaying) {
      intervalId = playSequence();
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPlaying, waveform, ADSR, frequency, q, volume, actx, noteWidth, time, feedback, maxDuration, playbackSpeed]); // Added playbackSpeed to dependencies

  const handleNoteChange = (index, note) => {
    const newSequence = [...sequence];
    newSequence[index] = note;
    setSequence(newSequence);
  };

  const addNote = () => { // New function to add a note to the sequence
    setSequence(prevSequence => [...prevSequence, 'c-4']);
  };

  const removeNote = () => { // New function to remove a note from the sequence
    setSequence(prevSequence => prevSequence.slice(0, -1));
  };

  return (
    <div>
      <div className="seqSteps">
      {sequence.map((note, index) => (
        
        <select key={index} value={note} onChange={event => handleNoteChange(index, event.target.value)}>
          {notes.map(noteOption => (
            <option key={noteOption} value={noteOption}>{noteOption}</option>
          ))}
        </select>
      ))}</div>
      <button onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? 'Stop' : 'Start'}</button>
      <button onClick={addNote}>Add Note</button> {/* New button to add a note */}
      <button onClick={removeNote}>Remove Note</button> {/* New button to remove a note */}
      <div>
        <label>Playback Speed: </label>
        <input type="number" value={playbackSpeed} onChange={event => setPlaybackSpeed(Number(event.target.value))} /> {/* New input to adjust playback speed */}
      </div>
    </div>
  );
}

export default Sequencer;