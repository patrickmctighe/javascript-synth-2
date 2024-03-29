

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
  "a#4": 466.164,
  "silent": "silent"
};

export function playNote(noteKey, waveform, ADSR, frequency, q, volume, actx, noteWidth, time, feedback, maxDuration) {


  const noteFrequency = notes[noteKey];

  if (noteFrequency === "silent") {
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

  const delayNode = actx.createDelay();
  delayNode.delayTime.value = time * maxDuration ;

  const feedbackGainNode = actx.createGain();
  feedbackGainNode.gain.value = feedback;

  const maxFilterFrequency = actx.sampleRate / 2;
  const filter = actx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = frequency * maxFilterFrequency; // scale frequency
  filter.Q.value = q * 30; // scale Q

  const { attack, decay, sustain, release } = ADSR;
  const STAGE_MAX_TIME = 2;
  const now = actx.currentTime;
  const atkDuration = attack * STAGE_MAX_TIME;
  const atkEndTime = now + atkDuration;
  const decDuration = decay * STAGE_MAX_TIME;

  gainNode.gain.setValueAtTime(0, actx.currentTime);
  gainNode.gain.linearRampToValueAtTime(volume, atkEndTime);
  gainNode.gain.linearRampToValueAtTime(sustain, atkEndTime + decDuration);

  // Connect the oscillators to the filter
  osc1.connect(filter);
  osc2.connect(filter);
  osc3.connect(filter);

  // Connect the filter to the gain node
  filter.connect(gainNode);

  // Connect the gain node to the delay node
  gainNode.connect(delayNode);

  // Connect the delay node to the feedback gain node
  delayNode.connect(feedbackGainNode);

  // Connect the feedback gain node back to the delay node to create a feedback loop
  feedbackGainNode.connect(delayNode);

  



  // Connect the delay node to the destination
  delayNode.connect(actx.destination);

  const stopTime = now + attack + decay + release ;
  const releaseEndTime = stopTime + release;

  gainNode.gain.setValueAtTime(sustain, stopTime);
  gainNode.gain.linearRampToValueAtTime(0, releaseEndTime);

  osc1.start(now);
  osc2.start(now);
  osc3.start(now);

  osc1.stop(releaseEndTime);
  osc2.stop(releaseEndTime);
  osc3.stop(releaseEndTime);

  return delayNode;
}