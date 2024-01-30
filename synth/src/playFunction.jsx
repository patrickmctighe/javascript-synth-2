// playFunction.jsx

export function playNote(noteKey, waveform, ADSR, frequency,q, volume, actx, noteWidth, unisonCount) {
  const notes = {
    "c-4": 261.626,
    "d-4": 293.665,
    "e-4": 329.628,
    "f-4": 349.228,
    "g-4": 391.995,
    "a-4": 440.000,
    "b-4": 493.883,
    "c-5": 523.251,
    "c#4": 277.183,
    "d#4": 311.127,
    "f#4": 369.994,
    "g#4": 415.305,
    "a#4": 466.164
  };

  const noteFrequency = notes[noteKey];
  if (noteFrequency === undefined) {
    console.log(`Note ${noteKey} not found`);
    return;
  }

  const osc1 = actx.createOscillator();
  osc1.frequency.value = noteFrequency;
  osc1.type = waveform;

  const osc2 = actx.createOscillator();
  osc2.frequency.value = noteFrequency + noteWidth;
  osc2.type = waveform;

  const osc3 = actx.createOscillator();
  osc3.frequency.value = noteFrequency - noteWidth;
  osc3.type = waveform;

  const gainNode = actx.createGain();
  gainNode.gain.value = volume;

  const maxFilterFrequency = actx.sampleRate / 2;
  const filter = actx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = frequency * maxFilterFrequency; // scale frequency
  filter.Q.value = q * 30; // scale Q

  
  osc1.connect(filter);
  osc2.connect(filter);
  osc3.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(actx.destination);

  const now = actx.currentTime;
  const { attack, decay, sustain, release } = ADSR;
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(volume, now + attack);
  gainNode.gain.linearRampToValueAtTime(sustain, now + attack + decay);
  gainNode.gain.linearRampToValueAtTime(0, now + attack + decay + release);

  const stopTime = now + attack + decay + release;

osc1.start();
osc2.start();
osc3.start();

osc1.stop(stopTime);
osc2.stop(stopTime);
osc3.stop(stopTime);
  
}

function createOscillators(actx, waveform, frequency, detune) {
  const osc = actx.createOscillator();
  osc.frequency.value = frequency;
  osc.type = waveform;
  osc.detune.value = detune;
  return osc;
}