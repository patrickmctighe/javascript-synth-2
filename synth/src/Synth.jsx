import  { useState, useEffect, useCallback } from "react";
import Volume from "./effects/Volume";
import Wave from "./effects/Wave";
import Unison from "./effects/Unison-Fatten";
import ADSR from "./effects/ADSR";
import FrequencyQ from "./effects/FrequencyQ";
import Echo from "./effects/Echo";
import Keyboard from "./effects/Keyboard";
import Sequencer from "./Sequencer";
import AudioVisualizer from "./AudioVisualizer.jsx";
import AudioVisualizer2 from "./AudioVisualizer2.jsx";
import { playNote } from "./playFunction.jsx";

import "./styles/synth.css";


const Synth = () => {
  const [actx, setActx] = useState(null);

  const [volume, setVolume] = useState(0.5);
  const [waveform, setWaveform] = useState("sine");
  const [noteWidth, setNoteWidth] = useState(3.5);

  const [attack, setAttack] = useState(0.1);
  const [decay, setDecay] = useState(0.01);
  const [sustain, setSustain] = useState(0.01);
  const [release, setRelease] = useState(0.28);
  const [frequency, setFrequency] = useState(0.5);
  const [q, setQ] = useState(0.5);
  const [time, setTime] = useState(0.1);
  const [feedback, setFeedback] = useState(0.1);
  const [maxDuration, setMaxDuration] = useState(.2);

  const [analyser, setAnalyser] = useState(null);
  const[sequencerAnalyser, setSequencerAnalyser] = useState(null)

  const handleVolumeChange = useCallback((event) => {
    setVolume(parseFloat(event.target.value));
  }, []);
  
  const handleWaveformChange = useCallback((newValue) => {
    setWaveform(newValue);
  }, []);
  
  const handleWidthChange = useCallback((event) => {
    setNoteWidth(parseFloat(event.target.value));
  }, []);
  
  const handleAttackChange = useCallback((event) => {
    setAttack(parseFloat(event.target.value));
  }, []);
  
  const handleDecayChange = useCallback((event) => {
    setDecay(parseFloat(event.target.value));
  }, []);
  
  const handleSustainChange = useCallback((event) => {
    setSustain(parseFloat(event.target.value));
  }, []);
  
  const handleReleaseChange = useCallback((event) => {
    setRelease(parseFloat(event.target.value));
  }, []);
  
  const handleFrequencyChange = useCallback((event) => {
    setFrequency(parseFloat(event.target.value));
  }, []);
  
  const handleQChange = useCallback((event) => {
    setQ(parseFloat(event.target.value));
  }, []);
  
  const handleTimeChange = useCallback((event) => {
    setTime(parseFloat(event.target.value));
  }, []);
  
  const handleFeedbackChange = useCallback((event) => {
    setFeedback(parseFloat(event.target.value));
  }, []);
  
  const handleMaxDurationChange = useCallback((event) => {
    setMaxDuration(parseFloat(event.target.value));
  }, []);

  useEffect(() => {
    const context = new (AudioContext || window.webkitAudioContext)();
    setActx(context);
   
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


  const handlePlayNoteKeyboard = (noteName) => {
    event.stopPropagation();
  
    const ADSR = { attack, decay, sustain, release };
  
    if (actx) {
      if (actx.state === "suspended") {
        actx.resume();
      }
  
      const source = playNote(
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
      
      const analyser = actx.createAnalyser();
      source.connect(analyser);
      analyser.connect(actx.destination);
      setAnalyser(analyser);
    } else {
      console.error("AudioContext not available");
    }
  };

  

  return (
    <div className="synthBody">
      <div className="visualizers">
        <AudioVisualizer analyser={analyser|| undefined} />
        <div className="visualizer2AndLogo">    <img src="/synthLogo4.png" alt="logo" className="logo" />
        <AudioVisualizer2 sequencerAnalyser={sequencerAnalyser|| undefined} />
</div>
      </div>
      <div className="allButVis">
        {" "}
        <div className="keysSlidersButtons">
          <div className="effectSliders">
            {" "}
            <Volume volume={volume} onVolumeChange={handleVolumeChange} />
            <Wave wave={waveform} onWaveChange={handleWaveformChange} />
            <Unison
              noteWidth={noteWidth}
              handleWidthChange={handleWidthChange}
            />
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
          <Keyboard  playNote={handlePlayNoteKeyboard} volume={volume} />
        </div>
        <div className="synthSeq">
          {" "}
          <Sequencer
           
            actx={actx||undefined}
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
           setSequencerAnalyser={setSequencerAnalyser}
          />
        </div>
      </div>
    </div>
  );
};

Synth.displayName = "Synth";
export default Synth;
