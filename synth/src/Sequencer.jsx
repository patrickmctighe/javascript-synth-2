import { useState, useEffect, useRef, useCallback } from "react";
import { playNote } from "./playFunction";
import "./styles/sequencer.css";
import PropTypes from "prop-types";

const notes = [
  "c-4",
  "d-4",
  "e-4",
  "f-4",
  "g-4",
  "a-4",
  "b-4",
  "c-5",
  "c#4",
  "d#4",
  "f#4",
  "g#4",
  "a#4",
  "silent",
];

function Sequencer({
  waveform,
  ADSR,
  frequency,
  q,
  volume,
  actx,
  noteWidth,
  time,
  feedback,
  maxDuration,
  setSequencerAnalyser,
}) {
  const [sequencerWaveform, setSequencerWaveform] = useState(waveform);
  const [sequencerADSR, setSequencerADSR] = useState(ADSR);
  const [sequencerFrequency, setSequencerFrequency] = useState(frequency);
  const [sequencerQ, setSequencerQ] = useState(q);
  const [sequencerVolume, setSequencerVolume] = useState(volume);
  const [sequencerNoteWidth, setSequencerNoteWidth] = useState(noteWidth);
  const [sequencerTime, setSequencerTime] = useState(time);
  const [sequencerFeedback, setSequencerFeedback] = useState(feedback);
  const [sequencerMaxDuration, setSequencerMaxDuration] = useState(maxDuration);
  const [sequencerActx, setSequencerActx] = useState(actx);

  const updateSequencerSettings = () => {
    setSequencerWaveform(waveform);
    setSequencerADSR(ADSR);
    setSequencerFrequency(frequency);
    setSequencerQ(q);
    setSequencerVolume(volume);
    setSequencerNoteWidth(noteWidth);
    setSequencerTime(time);
    setSequencerFeedback(feedback);
    setSequencerMaxDuration(maxDuration);
  };

  const [currentNoteIndex, setCurrentNoteIndex] = useState(0); // New state variable for current note index
  const [isPlaying, setIsPlaying] = useState(false);
  const [sequence, setSequence] = useState(Array(16).fill("silent"));
  const [playbackSpeed, setPlaybackSpeed] = useState(500);

  const noteIndexRef = useRef(0);
  const sequenceRef = useRef(sequence);

  useEffect(() => {
    sequenceRef.current = sequence;
  }, [sequence]);
  const playSequence = useCallback(() => {
    return setInterval(() => {
      const note = sequenceRef.current[noteIndexRef.current];
      if (note !== "silent") {
        const source = playNote(
          note,
          sequencerWaveform,
          sequencerADSR,
          sequencerFrequency,
          sequencerQ,
          sequencerVolume,
          sequencerActx,
          sequencerNoteWidth,
          sequencerTime,
          sequencerFeedback,
          sequencerMaxDuration
        );

        const analyser = sequencerActx.createAnalyser();
        source.connect(analyser);
        analyser.connect(sequencerActx.destination);
        setSequencerAnalyser(analyser);
      }

      noteIndexRef.current = (noteIndexRef.current + 1) % sequence.length;
      setCurrentNoteIndex(noteIndexRef.current);
    }, playbackSpeed);
  }, [
    sequencerWaveform,
    sequencerADSR,
    sequencerFrequency,
    sequencerQ,
    sequencerVolume,
    sequencerActx,
    sequencerNoteWidth,
    sequencerTime,
    sequencerFeedback,
    sequencerMaxDuration,
    playbackSpeed,
    setSequencerAnalyser,
    sequence.length
  ]);
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
  }, [isPlaying, playSequence, playbackSpeed]);
  const handleNoteChange = (index, note) => {
    const newSequence = [...sequence];
    newSequence[index] = note;
    setSequence(newSequence);
  };

  useEffect(() => {
    setSequencerActx(actx);
  }, [actx]);

  return (
    <div className="seqBody">
      <div className="seqSteps">
        {sequence.map((note, index) => (
          <div key={index} className="indvStep">
            <div
              className={
                isPlaying && currentNoteIndex === index ? "lightOn" : "lightOff"
              }
            ></div>
            <select
              className="dropDown"
              key={index}
              value={note}
              onChange={(event) => handleNoteChange(index, event.target.value)}
            >
              {notes.map((noteOption) => (
                <option key={noteOption} value={noteOption}>
                  {noteOption}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <div className="controlButtons">
        <div className="startStopSpeed">
          <div className="startAndUpdate">
            {" "}
            <button
              className="startStopBtn"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? "Stop" : "Start"}
            </button>
            <button className="update" onClick={updateSequencerSettings}>
              Update
            </button>
          </div>

          <div className="speed">
            <label> SPEED </label>
            <span className="speedDisplay">{playbackSpeed}</span>
            <input
              type="range"
              min="100"
              max="1500"
              value={playbackSpeed}
              onChange={(event) => setPlaybackSpeed(Number(event.target.value))}
              onWheel={(event) => {
                let newValue = playbackSpeed - event.deltaY / 10;
                newValue = Math.round(newValue);
                newValue = Math.max(100, Math.min(newValue, 1500));
                setPlaybackSpeed(newValue);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

Sequencer.propTypes = {
  waveform: PropTypes.string.isRequired,
  ADSR: PropTypes.object.isRequired,
  frequency: PropTypes.number.isRequired,
  q: PropTypes.number.isRequired,
  volume: PropTypes.number.isRequired,
  actx: PropTypes.object.isRequired,
  noteWidth: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
  feedback: PropTypes.number.isRequired,
  maxDuration: PropTypes.number.isRequired,
  setSequencerAnalyser: PropTypes.func.isRequired,
};

export default Sequencer;
