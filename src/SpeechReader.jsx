import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

const SpeechContext = createContext(null);
const SPEEDS = [
  { value: 0.8, label: 'Gentle · 0.8×' },
  { value: 1, label: 'Natural · 1×' },
  { value: 1.2, label: 'Brisk · 1.2×' },
];

export function splitForSpeech(segments, limit = 200) {
  // Smaller queued passages avoid some browsers silently truncating very long utterances.
  // Do not use HTML, SSML, or unsanitized markup; the API receives plain text only.
  const list = [];
  for (const segment of segments) {
    if (typeof segment !== 'string' || !segment.trim()) continue;
    const sentences = segment.trim().match(/[^.!?]+[.!?]*|[.!?]+/g) || [segment.trim()];
    let current = '';
    const add = text => { if (text.trim()) list.push(text.trim()); };
    for (const raw of sentences) {
      const sentence = raw.trim();
      if (!sentence) continue;
      if (sentence.length <= limit && current && (current.length + sentence.length + 1 > limit)) {
        add(current);
        current = '';
      }
      if (sentence.length <= limit) {
        current = current ? current + ' ' + sentence : sentence;
        continue;
      }
      add(current);
      current = '';
      const words = sentence.split(/\s+/);
      let part = '';
      for (const word of words) {
        if (part && part.length + word.length + 1 > limit) { add(part); part = ''; }
        if (word.length <= limit) part = part ? part + ' ' + word : word;
        else {
          add(part); part = '';
          for (let n = 0; n < word.length; n += limit) add(word.slice(n, n + limit));
        }
      }
      add(part);
    }
    add(current);
  }
  return list;
}

export function SpeechProvider({ children }) {
  const supported = typeof window !== 'undefined'
    && typeof window.SpeechSynthesisUtterance === 'function'
    && Boolean(window.speechSynthesis);
  const [voices, setVoices] = useState([]);
  const [voiceId, setVoiceId] = useState('auto');
  const [rate, setRate] = useState(1);
  const [playback, setPlayback] = useState({ owner: null, mode: 'idle', progress: 0, total: 0 });
  const [message, setMessage] = useState('');
  const generation = useRef(0);
  const ownerRef = useRef(null);
  const utteranceRef = useRef(null);

  useEffect(() => {
    if (!supported) return undefined;
    const synth = window.speechSynthesis;
    const refresh = () => setVoices(synth.getVoices() || []);
    refresh();
    if (typeof synth.addEventListener === 'function') synth.addEventListener('voiceschanged', refresh);
    return () => {
      ++generation.current;
      ownerRef.current = null;
      utteranceRef.current = null;
      synth.cancel();
      if (typeof synth.removeEventListener === 'function') synth.removeEventListener('voiceschanged', refresh);
    };
  }, [supported]);

  const stop = useCallback(() => {
    ++generation.current;
    ownerRef.current = null;
    utteranceRef.current = null;
    if (supported) window.speechSynthesis.cancel();
    setPlayback({ owner: null, mode: 'idle', progress: 0, total: 0 });
    setMessage('');
  }, [supported]);

  const stopIfOwner = useCallback((owner) => {
    if (ownerRef.current === owner) stop();
  }, [stop]);

  const start = useCallback(({ owner, segments, lang = 'en-US' }) => {
    if (!supported || !owner) {
      setMessage('Voice playback is unavailable in this browser. The written text is always here.');
      return;
    }
    const passages = splitForSpeech(segments);
    if (!passages.length) return;
    const synth = window.speechSynthesis;
    ++generation.current;
    const token = generation.current;
    synth.cancel();
    ownerRef.current = owner;
    setMessage('');
    setPlayback({ owner, mode: 'speaking', progress: 1, total: passages.length });

    const chosenVoice = voices.find(voice => voice.voiceURI === voiceId)
      || voices.find(voice => voice.lang?.toLowerCase().startsWith(lang.split('-')[0].toLowerCase()))
      || null;

    function say(index) {
      if (generation.current !== token || ownerRef.current !== owner) return;
      if (index >= passages.length) {
        ownerRef.current = null;
        utteranceRef.current = null;
        setPlayback({ owner: null, mode: 'idle', progress: 0, total: 0 });
        setMessage('Reading complete.');
        return;
      }
      const utterance = new window.SpeechSynthesisUtterance(passages[index]);
      utterance.lang = chosenVoice?.lang || lang;
      if (chosenVoice) utterance.voice = chosenVoice;
      utterance.rate = rate;
      utteranceRef.current = utterance;
      utterance.onstart = () => {
        if (generation.current !== token) return;
        setPlayback(prev => ({ ...prev, owner, mode: 'speaking', progress: index + 1, total: passages.length }));
      };
      utterance.onend = () => { if (generation.current === token) say(index + 1); };
      utterance.onerror = event => {
        if (generation.current !== token) return;
        ownerRef.current = null;
        utteranceRef.current = null;
        setPlayback({ owner: null, mode: 'idle', progress: 0, total: 0 });
        setMessage(event?.error === 'not-allowed'
          ? 'Audio was blocked. Interact with the page and try again.'
          : 'This browser could not play this passage. The written version remains available.');
      };
      try {
        synth.speak(utterance);
      } catch {
        if (generation.current === token) {
          ownerRef.current = null;
          utteranceRef.current = null;
          setPlayback({ owner: null, mode: 'idle', progress: 0, total: 0 });
          setMessage('This voice could not start. Try another available voice.');
        }
      }
    }
    say(0);
  }, [supported, voices, voiceId, rate]);

  const pause = useCallback(() => {
    if (!supported || !ownerRef.current) return;
    window.speechSynthesis.pause();
    setPlayback(prev => ({ ...prev, mode: 'paused' }));
  }, [supported]);

  const resume = useCallback(() => {
    if (!supported || !ownerRef.current) return;
    window.speechSynthesis.resume();
    setPlayback(prev => ({ ...prev, mode: 'speaking' }));
  }, [supported]);

  return (
    <SpeechContext.Provider value={{ supported, voices, voiceId, setVoiceId, rate, setRate, playback,
      message, start, pause, resume, stop, stopIfOwner }}>
      {children}
    </SpeechContext.Provider>
  );
}

export function SpeechReader({ owner, segments, lang = 'en-US', label = 'this passage' }) {
  const speech = useContext(SpeechContext);
  if (!speech) throw new Error('SpeechReader must be inside SpeechProvider');
  const { supported, voices, voiceId, setVoiceId, rate, setRate, playback,
    message, start, pause, resume, stop, stopIfOwner } = speech;
  const active = playback.owner === owner;
  const mode = active ? playback.mode : 'idle';
  const textSegments = segments.filter(text => typeof text === 'string' && Boolean(text.trim()));

  // Only cancel this reader's audio if its contents are replaced or it leaves the page.
  useEffect(() => () => stopIfOwner(owner), [owner, stopIfOwner]);

  return (
    <aside className="speech-reader" aria-label={'Listen to ' + label}>
      <div className="speech-reader-heading">
        <span className="speech-reader-symbol" aria-hidden="true">♫</span>
        <div><strong>Listen instead</strong><p>Optional browser read-aloud. Nothing starts on its own.</p></div>
      </div>
      {supported ? (
        <>
          <div className="speech-reader-controls">
            {mode === 'idle' ? (
              <button type="button" className="speech-primary" onClick={() => start({ owner, segments: textSegments, lang })}>▶ Read {label}</button>
            ) : mode === 'speaking' ? (
              <button type="button" className="speech-primary" onClick={pause}>Ⅱ Pause reading</button>
            ) : (
              <button type="button" className="speech-primary" onClick={resume}>▶ Resume reading</button>
            )}
            <button type="button" className="speech-stop" disabled={!active} onClick={stop}>■ Stop</button>
          </div>
          {active && <p className="speech-status" role="status"> {mode === 'paused' ? 'Paused' : 'Reading'} · passage {playback.progress} of {playback.total}</p>}
          <div className="speech-settings">
            <div><label htmlFor={'speech-speed-' + owner}>Reading pace</label>
              <select id={'speech-speed-' + owner} value={rate} onChange={event => setRate(Number(event.target.value))}>
                {SPEEDS.map(choice => <option key={choice.value} value={choice.value}>{choice.label}</option>)}
              </select>
            </div>
            <div><label htmlFor={'speech-voice-' + owner}>Voice</label>
              <select id={'speech-voice-' + owner} value={voiceId} onChange={event => setVoiceId(event.target.value)}>
                <option value="auto">Browser default / match language</option>
                {voices.map((voice, i) => <option key={voice.voiceURI + ':' + i} value={voice.voiceURI}>{voice.name} · {voice.lang}</option>)}
              </select>
            </div>
          </div>
          <p className="speech-settings-note">Changes to voice or pace apply the next time you start reading.</p>
        </>
      ) : (
        <p className="speech-unavailable" role="status">This browser has no speech playback support. You can still read everything below.</p>
      )}
      {message && !active && <p role="status" className="speech-status">{message}</p>}
      <details className="speech-transcript">
        <summary>Read the full narration text</summary>
        <div lang={lang} className="speech-transcript-body">
          {textSegments.map((text, i) => <p key={i}>{text}</p>)}
        </div>
      </details>
      <p className="speech-privacy">Your Field Notes are never narrated automatically. Speech uses your browser or device's voices; some voices may rely on online services. The Open Field runs no speech server.</p>
    </aside>
  );
}
