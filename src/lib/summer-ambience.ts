// A procedurally generated "summer" soundscape: soft waves plus random wind
// chimes. Synthesised with the Web Audio API, so no audio files are shipped.

const chimeNotes = [1046.5, 1174.7, 1318.5, 1568.0, 1760.0, 2093.0]; // C6 pentatonic
const masterLevel = 0.32;

let context: AudioContext | null = null;
let master: GainNode | null = null;
let chimeTimer: ReturnType<typeof setTimeout> | undefined;
let running = false;

function brownNoise(ctx: AudioContext, seconds: number): AudioBuffer {
  const buffer = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;
  for (let i = 0; i < data.length; i++) {
    last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02;
    data[i] = last * 3.5;
  }
  return buffer;
}

function startWaves(ctx: AudioContext, out: AudioNode) {
  const noise = ctx.createBufferSource();
  noise.buffer = brownNoise(ctx, 6);
  noise.loop = true;
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 520;
  const swell = ctx.createGain();
  swell.gain.value = 0.22;
  // A slow LFO makes the noise rise and fall like waves on a shore.
  const lfo = ctx.createOscillator();
  lfo.frequency.value = 0.09;
  const depth = ctx.createGain();
  depth.gain.value = 0.16;
  lfo.connect(depth).connect(swell.gain);
  noise.connect(filter).connect(swell).connect(out);
  noise.start();
  lfo.start();
}

function chime(ctx: AudioContext, out: AudioNode, frequency: number, when: number) {
  const pan = ctx.createStereoPanner();
  pan.pan.value = Math.random() * 1.4 - 0.7;
  pan.connect(out);
  const decay = 2.4 + Math.random() * 1.6;
  // Two partials with an inharmonic ratio give a metallic, bell-like tone.
  for (const [ratio, level] of [
    [1, 0.11],
    [2.76, 0.035],
  ] as const) {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = frequency * ratio;
    const env = ctx.createGain();
    env.gain.setValueAtTime(0.0001, when);
    env.gain.exponentialRampToValueAtTime(level, when + 0.008);
    env.gain.exponentialRampToValueAtTime(0.0001, when + decay);
    osc.connect(env).connect(pan);
    osc.start(when);
    osc.stop(when + decay + 0.05);
  }
}

function scheduleChimes() {
  if (!running || !context || !master) return;
  const strikes = 1 + Math.floor(Math.random() * 3);
  let at = context.currentTime + 0.05;
  for (let i = 0; i < strikes; i++) {
    const note = chimeNotes[Math.floor(Math.random() * chimeNotes.length)];
    chime(context, master, note, at);
    at += 0.08 + Math.random() * 0.22;
  }
  chimeTimer = setTimeout(scheduleChimes, 1800 + Math.random() * 3800);
}

/** Starts or resumes the soundscape. Must follow a user gesture to be audible. */
export async function startAmbience(): Promise<void> {
  if (running) return;
  if (!context) {
    context = new AudioContext();
    master = context.createGain();
    master.gain.value = 0;
    master.connect(context.destination);
    startWaves(context, master);
  }
  running = true;
  await context.resume();
  const now = context.currentTime;
  master!.gain.cancelScheduledValues(now);
  master!.gain.setValueAtTime(master!.gain.value, now);
  master!.gain.linearRampToValueAtTime(masterLevel, now + 2.5);
  scheduleChimes();
}

/** Fades out and suspends the audio context. */
export function stopAmbience(): void {
  if (!running || !context || !master) return;
  running = false;
  clearTimeout(chimeTimer);
  const ctx = context;
  const now = ctx.currentTime;
  master.gain.cancelScheduledValues(now);
  master.gain.setValueAtTime(master.gain.value, now);
  master.gain.linearRampToValueAtTime(0, now + 0.8);
  setTimeout(() => {
    if (!running) void ctx.suspend();
  }, 900);
}
