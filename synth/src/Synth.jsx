import React, { useState, useEffect } from "react";
import Volume from "./effects/Volume";
import Wave from "./effects/Wave";
import Unison from "./effects/Unison-Fatten";
import ADSR from "./effects/ADSR";
import FrequencyQ from "./effects/FrequencyQ";
import Echo from "./effects/Echo";
import Keyboard from "./effects/Keyboard";
import Sequencer from "./Sequencer";
import { playNote } from "./playFunction.jsx";

import "./styles/synth.css";

const Synth = React.forwardRef((props, ref) => {
  const [actx, setActx] = useState(null);

  const [volume, setVolume] = useState(1);
  const [waveform, setWaveform] = useState("sine");
  const [noteWidth, setNoteWidth] = useState(0);

  const [attack, setAttack] = useState(0.5);
  const [decay, setDecay] = useState(0.5);
  const [sustain, setSustain] = useState(0.5);
  const [release, setRelease] = useState(0.5);
  const [frequency, setFrequency] = useState(0.5);
  const [q, setQ] = useState(0.5);
  const [time, setTime] = useState(0.5);
  const [feedback, setFeedback] = useState(0.5);
  const [maxDuration, setMaxDuration] = useState(2);

  const [isPlaying, setIsPlaying] = useState(false);
  const [sequence, setSequence] = useState(Array(16).fill("c-4"));
  const [playbackSpeed, setPlaybackSpeed] = useState(500);

  const addNote = () => {
    setSequence((prevSequence) => [...prevSequence, "c-4"]);
  };

  const removeNote = () => {
    setSequence((prevSequence) => prevSequence.slice(0, -1));
  };

  const handleVolumeChange = (event) =>
    setVolume(parseFloat(event.target.value));
  const handleWaveformChange = (newValue) => {
    setWaveform(newValue);
  };
  const handleWidthChange = (event) =>
    setNoteWidth(parseFloat(event.target.value));
  const handleAttackChange = (event) =>
    setAttack(parseFloat(event.target.value));
  const handleDecayChange = (event) => setDecay(parseFloat(event.target.value));
  const handleSustainChange = (event) =>
    setSustain(parseFloat(event.target.value));
  const handleReleaseChange = (event) =>
    setRelease(parseFloat(event.target.value));
  const handleFrequencyChange = (event) =>
    setFrequency(parseFloat(event.target.value));
  const handleQChange = (event) => setQ(parseFloat(event.target.value));
  const handleTimeChange = (event) => setTime(parseFloat(event.target.value));
  const handleFeedbackChange = (event) =>
    setFeedback(parseFloat(event.target.value));
  const handleMaxDurationChange = (event) =>
    setMaxDuration(parseFloat(event.target.value));

  useEffect(() => {
    const context = new (AudioContext || webkitAudioContext)();
    setActx(context);
    console.log("actx after set:", actx);
    return () => {
      if (context.state !== "closed") {
        context
          .close()
          .catch((error) =>
            console.error("Error closing AudioContext:", error)
          );
      }
    };
  }, []);

  useEffect(() => {
    console.log(`Volume changed to ${volume}`);
  }, [volume]);
  const handlePlayNote = (noteName) => {
    event.stopPropagation();
    const filter = {
      type: "lowpass",
      frequency: parseFloat(frequency),
      Q: parseFloat(q),
    };
    const ADSR = { attack, decay, sustain, release };

    console.log("ADSR:", ADSR);
    console.log("Filter:", filter);

    if (actx) {
      if (actx.state === "suspended") {
        actx.resume();
      }
      console.log("actx in handlePlayNote:", actx);
      playNote(
        noteName,
        waveform,
        ADSR,
        frequency,
        q,
        volume,
        actx,
        noteWidth,
        time,
        feedback,
        maxDuration
      );
    } else {
      console.log("AudioContext not initialized yet");
    }
  };
  return (
    <div className="synthBody">
      <div className="keysSlidersButtons">
        <div className="effectSliders">
          {" "}
          <Volume volume={volume} onVolumeChange={handleVolumeChange} />
          <Wave wave={waveform} onWaveChange={handleWaveformChange} />
          <Unison noteWidth={noteWidth} handleWidthChange={handleWidthChange} />
          <ADSR
            ADSR={{ attack, decay, sustain, release }}
            handleAttackChange={handleAttackChange}
            handleDecayChange={handleDecayChange}
            handleSustainChange={handleSustainChange}
            handleReleaseChange={handleReleaseChange}
          />
          <FrequencyQ
            frequency={frequency}
            q={q}
            handleFrequencyChange={handleFrequencyChange}
            handleQChange={handleQChange}
          />
          <Echo
            echo={{ time, feedback, maxDuration }}
            handleTimeChange={handleTimeChange}
            handleFeedbackChange={handleFeedbackChange}
            handleMaxDurationChange={handleMaxDurationChange}
          />
        </div>
        <Keyboard playNote={handlePlayNote} volume={volume} />
        <div className="controlButtons">
          <div className="startStop">
            {" "}
            <button onClick={addNote}>Add Note</button>
            <button onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? "Stop" : "Start"}
            </button>
            <button onClick={removeNote}>Remove Note</button>
          </div>

          <div className="speed">
            <label>Playback Speed: </label>
            <input
              type="number"
              value={playbackSpeed}
              onChange={(event) => setPlaybackSpeed(Number(event.target.value))}
            />
          </div>
        </div>
      </div>
      <Sequencer
        playNote={handlePlayNote}
        actx={actx}
        volume={volume}
        waveform={waveform}
        noteWidth={noteWidth}
        attack={attack}
        decay={decay}
        sustain={sustain}
        release={release}
        frequency={frequency}
        q={q}
        time={time}
        feedback={feedback}
        maxDuration={maxDuration}
        ADSR={{ attack, decay, sustain, release }}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        sequence={sequence}
        setSequence={setSequence}
        playbackSpeed={playbackSpeed}
        setPlaybackSpeed={setPlaybackSpeed}
      />
    </div>
  );
});

Synth.displayName = "Synth";
export default Synth;
