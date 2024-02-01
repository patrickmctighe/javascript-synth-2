import React, { useState, useEffect, useRef } from 'react';
import { playNote } from './playFunction';
import './styles/sequencer.css';

const notes = ["c-4", "d-4", "e-4", "f-4", "g-4", "a-4", "b-4", "c-5", "c#4", "d#4", "f#4", "g#4", "a#4", "silent"];

function Sequencer({noteKey, waveform, ADSR, frequency, q, volume, actx, noteWidth, time, feedback, maxDuration, isPlaying, setIsPlaying, sequence, setSequence, playbackSpeed, setPlaybackSpeed}) {
  
  
  
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0); // New state variable for current note index

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
      setCurrentNoteIndex(noteIndexRef.current); // Update current note index state
    }, playbackSpeed);
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

 

  return (
    <div>
      <div className="seqSteps" >
      {sequence.map((note, index) => (
        <div key={index} className="indvStep">
          <div className={isPlaying && currentNoteIndex === index ? "lightOn" : "lightOff"}></div>
        <select key={index} value={note} onChange={event => handleNoteChange(index, event.target.value)}>
          {notes.map(noteOption => (
            <option key={noteOption} value={noteOption}>{noteOption}</option>
          ))}
        </select></div>

      ))}</div>
    
    </div>
  );
}

export default Sequencer;