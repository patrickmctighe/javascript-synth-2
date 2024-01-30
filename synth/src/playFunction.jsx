export function playNote(noteKey, waveform, ADSR, filter, volume, actx, noteWidth) {
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

  const osc = actx.createOscillator();
  osc.frequency.value = noteFrequency;
  osc.type = waveform;

  const gainNode = actx.createGain();
  gainNode.gain.value = volume;

  const filterNode = actx.createBiquadFilter();
  filterNode.type = filter.type;
  filterNode.frequency.value = filter.frequency * 2000; // scale frequency
  filterNode.Q.value = filter.Q * 30; // scale Q

  osc.connect(filterNode);
  filterNode.connect(gainNode);
  gainNode.connect(actx.destination);

  const now = actx.currentTime;
  const { attack, decay, sustain, release } = ADSR;
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(volume, now + attack);
  gainNode.gain.linearRampToValueAtTime(sustain, now + attack + decay);
  gainNode.gain.linearRampToValueAtTime(0, now + attack + decay + release);

  osc.start();
  osc.stop(now + attack + decay + release);
}