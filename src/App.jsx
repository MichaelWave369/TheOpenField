import { useEffect, useState } from 'react';
import { grounding, principles, prompts, rooms } from './content.js';

const NOTE_KEY = 'the-open-field-notes-v1';

function Mark({ small = false }) {
  return (
    <svg className={small ? 'mark mark-small' : 'mark'} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="32" cy="32" r="21" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="32" cy="32" r="12" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="32" cy="32" r="3" fill="currentColor" />
      <path d="M32 2v16M32 46v16M2 32h16M46 32h16M10.8 10.8l10.8 10.8m20.8 20.8 10.8 10.8M53.2 10.8 42.4 21.6m-20.8 20.8-10.8 10.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function Arrow({ diagonal = false }) {
  return <span aria-hidden="true" className="arrow">{diagonal ? '↗' : '→'}</span>;
}

function Horizon() {
  return (
    <svg className="horizon-art" viewBox="0 0 1180 690" role="img" aria-label="Abstract illustration of a soft glowing sun above an open green landscape, surrounded by rings of light">
      <defs>
        <radialGradient id="sunAura">
          <stop offset="0" stopColor="#f8efce" stopOpacity=".72" />
          <stop offset=".36" stopColor="#edcf8e" stopOpacity=".17" />
          <stop offset="1" stopColor="#f2d8a1" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sunCore">
          <stop offset="0" stopColor="#fff9e6" />
          <stop offset=".7" stopColor="#f9eac3" />
          <stop offset="1" stopColor="#e7c98d" stopOpacity=".65" />
        </radialGradient>
        <linearGradient id="hillBack" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#526c57" />
          <stop offset="1" stopColor="#18382f" />
        </linearGradient>
        <linearGradient id="hillFront" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#2c5642" />
          <stop offset="1" stopColor="#101f1a" />
        </linearGradient>
      </defs>
      <circle cx="590" cy="287" r="298" fill="url(#sunAura)" />
      <g className="halo halo-slow" transform="translate(590 287)" stroke="#e8d4aa" fill="none">
        <circle r="245" strokeWidth=".8" opacity=".27" />
        <circle r="211" strokeWidth=".9" opacity=".29" />
        <circle r="173" strokeWidth=".7" opacity=".3" />
        <circle r="132" strokeWidth=".8" opacity=".29" />
        <circle r="92" strokeWidth=".7" opacity=".24" />
        <path d="M0 -259V-227M0 227V259M-259 0h32M227 0h32M-183 -183l23 23M160 160l23 23M183 -183l-23 23M-160 160l-23 23" strokeWidth="1" opacity=".44" />
        <path d="M0 -245C155 -150 155 150 0 245C-155 150 -155 -150 0 -245Z" strokeWidth=".8" opacity=".23" />
        <path d="M-245 0C-150 -155 150 -155 245 0C150 155 -150 155 -245 0Z" strokeWidth=".8" opacity=".23" />
      </g>
      <circle cx="590" cy="287" r="65" fill="url(#sunCore)" />
      <circle cx="590" cy="287" r="73" stroke="#fff6dc" strokeOpacity=".46" strokeWidth=".7" fill="none" />
      <g fill="#edd9aa" opacity=".8">
        <circle cx="340" cy="218" r="1.5" /><circle cx="810" cy="143" r="1.4"/><circle cx="821" cy="313" r="1.2" />
        <circle cx="399" cy="420" r="1.3" /><circle cx="699" cy="48" r="1.6" /><circle cx="260" cy="339" r="1.1" />
        <circle cx="901" cy="254" r="1.1" /><circle cx="503" cy="86" r="1.2" />
      </g>
      <path d="M0 462C150 411 300 445 425 480C560 515 684 416 818 429C950 442 1053 396 1180 454V690H0Z" fill="#6a8465" opacity=".37" />
      <path d="M0 520C166 453 310 511 456 522C626 535 754 438 895 476C1007 506 1089 473 1180 491V690H0Z" fill="url(#hillBack)" />
      <path d="M0 582C164 500 301 570 436 555C590 536 711 514 851 556C989 598 1075 524 1180 545V690H0Z" fill="url(#hillFront)" />
      <path d="M0 646C235 589 365 622 536 621C755 618 954 583 1180 620V690H0Z" fill="#10291f" />
      <g stroke="#c5d2a4" strokeOpacity=".23" strokeWidth="1.4" fill="none">
        <path d="M0 580c184 -57 325 -22 467 -35s277 -50 397 10 219 -25 316 -18"/>
        <path d="M-10 646c190 -57 342 -11 517 -28s413 -40 673 -2"/>
      </g>
    </svg>
  );
}

function SectionHeading({ eyebrow, title, description, centered = false }) {
  return (
    <div className={centered ? 'section-heading centered' : 'section-heading'}>
      <span className="eyebrow"><span className="eyebrow-line" />{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function Principles() {
  const [open, setOpen] = useState(null);
  return (
    <section className="section principles-section" id="principles">
      <div className="container">
        <SectionHeading eyebrow="01 / A LIVING PHILOSOPHY" title={<>Nine ways to keep<br /><em>the door open.</em></>} description="Not commandments. Not a test. Just invitations we can return to, revise, and practice in everyday life." />
        <div className="principles-grid">
          {principles.map((item, index) => (
            <button className={open === index ? 'principle-card expanded' : 'principle-card'} type="button" key={item.number} onClick={() => setOpen(open === index ? null : index)} aria-expanded={open === index} aria-controls={'principle-detail-' + index}>
              <span className="principle-top"><span className="principle-number">{item.number} / 09</span><span className="principle-symbol" aria-hidden="true">{item.symbol}</span></span>
              <span className="principle-title">{item.title}</span>
              <span className="principle-short">{item.short}</span>
              <span className="principle-detail" id={'principle-detail-' + index} hidden={open !== index}>{item.detail}</span>
              <span className="principle-bottom"><span>{open === index ? 'Close thought' : 'Explore thought'}</span><span aria-hidden="true">{open === index ? '−' : '+'}</span></span>
            </button>
          ))}
        </div>
        <div className="principles-footnote"><span className="asterisk">✳</span><p>These principles are proposals, not sacred rules. The field stays open to thoughtful disagreement.</p></div>
      </div>
    </section>
  );
}

function Doorways({ choosePrompt }) {
  const [selected, setSelected] = useState(0);
  const current = rooms[selected];
  return (
    <section className="section doorways-section" id="doorways">
      <div className="container">
        <SectionHeading eyebrow="02 / A PLACE TO EXPLORE" title={<>There is more than<br /><em>one way in.</em></>} description="Four simple doorways. Choose the one that meets you where you are today." />
        <div className="doorways-layout">
          <div className="doorway-list" role="tablist" aria-label="Choose a doorway">
            {rooms.map((room, index) => (
              <button key={room.id} id={'tab-' + room.id} type="button" role="tab" aria-selected={index === selected} aria-controls="doorway-panel" className={index === selected ? 'doorway-tab active' : 'doorway-tab'} onClick={() => setSelected(index)}>
                <span className="doorway-index">{room.number}</span><span className="doorway-word"><strong>{room.label}</strong><small>{room.subtitle}</small></span><span className="doorway-symbol" aria-hidden="true">{room.icon}</span>
              </button>
            ))}
          </div>
          <div className="doorway-detail" role="tabpanel" id="doorway-panel" aria-labelledby={'tab-' + current.id} key={current.id}>
            <div className="doorway-large-symbol" aria-hidden="true">{current.icon}</div>
            <span className="eyebrow small">THE {current.label.toUpperCase()} ROOM</span>
            <h3>{current.introduction}</h3>
            <div className="doorway-practice"><span className="tiny-label">A SMALL PRACTICE</span><p>{current.practice}</p></div>
            <div className="doorway-question"><span className="tiny-label">A QUESTION TO CARRY</span><p>“{current.question}”</p></div>
            <a href="#field-notes" className="inline-link" onClick={() => choosePrompt(current.question)}>Take this to your field notes <Arrow /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuietRoom() {
  const [breathing, setBreathing] = useState(false);
  return (
    <section className="section quiet-section" id="quiet-room">
      <div className="container quiet-layout">
        <div>
          <SectionHeading eyebrow="03 / NO REQUIREMENTS" title={<>A little room<br /><em>to breathe.</em></>} description="You can simply be here. No achievement. No perfect silence. No particular spiritual experience to reach." />
          <p className="quiet-copy">If you like, follow the gentle motion of the circle. Breathe naturally and comfortably. Or ignore the circle and enjoy a moment of stillness. Both are welcome.</p>
          <button type="button" className="button button-outline quiet-control" onClick={() => setBreathing(!breathing)} aria-pressed={breathing}>{breathing ? 'Pause the motion' : 'Begin gentle motion'} <span aria-hidden="true">{breathing ? 'Ⅱ' : '↗'}</span></button>
          <p className="tiny-caption">This is an optional visual breathing cue, not a treatment or a timed breathing prescription.</p>
        </div>
        <div className="quiet-visual" aria-label={breathing ? 'Concentric circles gently expanding and contracting' : 'Still concentric circles'}>
          <div className={breathing ? 'breath-field breathing' : 'breath-field'}>
            <span className="breath-ring ring-outer" /><span className="breath-ring ring-mid" /><span className="breath-ring ring-inner" /><span className="breath-dot" />
          </div>
          <span className="quiet-visual-caption">{breathing ? 'There is no right pace.' : 'Stillness belongs here.'}</span>
        </div>
      </div>
    </section>
  );
}

function loadNotes() {
  try {
    const data = JSON.parse(window.localStorage.getItem(NOTE_KEY) || '[]');
    return Array.isArray(data) ? data.filter(item => typeof item.text === 'string' && typeof item.date === 'string').slice(0, 30) : [];
  } catch {
    return [];
  }
}

function FieldNotes({ selectedPrompt, setSelectedPrompt }) {
  const [notes, setNotes] = useState(loadNotes);
  const [text, setText] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => { setNotice(''); }, [selectedPrompt]);

  const nextPrompt = () => {
    const currentIndex = prompts.indexOf(selectedPrompt);
    setSelectedPrompt(prompts[(currentIndex + 1 + prompts.length) % prompts.length]);
  };

  const save = () => {
    const trimmed = text.trim();
    if (!trimmed) { setNotice('Write a thought first, even a small one.'); return; }
    const record = { date: new Date().toISOString(), prompt: selectedPrompt, text: trimmed.slice(0, 5000) };
    const updated = [record, ...notes].slice(0, 30);
    try {
      window.localStorage.setItem(NOTE_KEY, JSON.stringify(updated));
      setNotes(updated);
      setText('');
      setNotice('Saved on this browser only.');
    } catch {
      setNotice('Browser storage is unavailable. Copy your words somewhere safe instead.');
    }
  };

  const exportNotes = () => {
    if (notes.length === 0) return;
    const content = 'THE OPEN FIELD · PERSONAL NOTES\n\n' + notes.map(note =>
      new Date(note.date).toLocaleString() + '\n' + note.prompt + '\n\n' + note.text
    ).join('\n\n──────\n\n');
    const url = URL.createObjectURL(new Blob([content], { type: 'text/plain;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'the-open-field-notes.txt';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const clearNotes = () => {
    if (!window.confirm('Remove every Open Field note saved in this browser? This cannot be undone.')) return;
    try { window.localStorage.removeItem(NOTE_KEY); } catch { /* local state still clears */ }
    setNotes([]);
    setNotice('Local notes cleared.');
  };

  return (
    <section className="section notes-section" id="field-notes">
      <div className="container notes-layout">
        <div className="notes-intro">
          <SectionHeading eyebrow="04 / YOUR OWN PERSPECTIVE" title={<>The field<br /><em>notes.</em></>} description="A private place to catch a thought, ask a question, or remember something good." />
          <p>There is no account to make and nothing to submit. What you write belongs to you. These notes stay in this browser, not on our servers.</p>
          <div className="notes-privacy"><span aria-hidden="true">◎</span><span>Local to this device. On a shared browser, export your notes and clear them when finished. Clearing browser data may also erase them.</span></div>
        </div>
        <div className="notebook">
          <div className="notebook-head"><span className="tiny-label">TODAY'S GENTLE QUESTION</span><button type="button" className="text-button" onClick={nextPrompt}>Another question <span aria-hidden="true">↻</span></button></div>
          <p className="prompt-text">“{selectedPrompt}”</p>
          <label className="sr-only" htmlFor="field-entry">Your reflection</label>
          <textarea id="field-entry" maxLength={5000} placeholder="Whatever comes to mind is enough..." value={text} onChange={event => setText(event.target.value)} rows={6} />
          <div className="notebook-footer"><span className="counter">{text.length} / 5000</span><button type="button" className="button button-dark" onClick={save}>Keep this note <Arrow /></button></div>
          <p className="note-notice" role="status" aria-live="polite">{notice || '\u00a0'}</p>
          <div className="saved-notes"><div className="saved-title"><strong>Little things you kept</strong><span>{notes.length} / 30 notes</span></div>
            {notes.length === 0 ? <p className="empty-notes">Your notebook is quiet for now. That is perfectly fine.</p> :
              <div className="saved-list">{notes.slice(0, 3).map(note => <article className="saved-note" key={note.date + note.text.slice(0, 12)}><time dateTime={note.date}>{new Date(note.date).toLocaleDateString()}</time><p>{note.text}</p></article>)}</div>}
            <div className="saved-actions"><button type="button" disabled={!notes.length} onClick={exportNotes}>Download all notes <span aria-hidden="true">↓</span></button><button type="button" disabled={!notes.length} onClick={clearNotes}>Clear browser notes <span aria-hidden="true">×</span></button></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Questions() {
  return (
    <section className="section wonder-section" id="the-mystery">
      <div className="container">
        <div className="wonder-header"><span className="eyebrow"><span className="eyebrow-line" />05 / ROOM FOR WONDER</span><h2>We can wonder deeply<br /><em>without pretending to know.</em></h2></div>
        <div className="wonder-grid">
          <div className="wonder-left"><span className="wonder-orbit" aria-hidden="true">◌</span><p className="wonder-quote">What if each of us is a window through which the universe gets to be experienced?</p><span className="wonder-attribution">A question, not an answer.</span></div>
          <div className="wonder-right">
            {grounding.map(item => <div className="grounding-row" key={item.tag}><span className="grounding-mark" aria-hidden="true">✳</span><div><h3>{item.tag}</h3><p>{item.text}</p></div></div>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState(prompts[0]);
  const choosePrompt = (prompt) => setSelectedPrompt(prompt);
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="container nav-wrap">
          <a className="brand" href="#top" onClick={() => setMenuOpen(false)} aria-label="The Open Field, back to top"><Mark small /><span>THE OPEN FIELD</span></a>
          <button className="mobile-toggle" type="button" aria-expanded={menuOpen} aria-controls="primary-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Close' : 'Menu'} <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span></button>
          <nav className={menuOpen ? 'main-nav nav-open' : 'main-nav'} id="primary-nav" aria-label="Main navigation">
            <a href="#invitation" onClick={() => setMenuOpen(false)}>The invitation</a>
            <a href="#principles" onClick={() => setMenuOpen(false)}>Our principles</a>
            <a href="#doorways" onClick={() => setMenuOpen(false)}>Explore</a>
            <a href="#field-notes" className="nav-cta" onClick={() => setMenuOpen(false)}>Your field notes <Arrow diagonal /></a>
          </nav>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-grain" aria-hidden="true" />
          <div className="container hero-content">
            <span className="eyebrow hero-eyebrow"><span className="eyebrow-line" />AN INVITATION TO SIMPLY BE</span>
            <h1>You already<br /><em>belong here.</em></h1>
            <p className="hero-subtitle">A little space for the curious, the quiet, the joyful, the uncertain. A place to explore what makes life meaningful, together.</p>
            <div className="hero-buttons"><a className="button button-light" href="#invitation">Come on in <Arrow /></a><a className="hero-text-link" href="#quiet-room">Find a quiet moment <span aria-hidden="true">↗</span></a></div>
          </div>
          <Horizon />
          <div className="hero-footer"><div className="container hero-footer-inner"><span>NOTHING IS REQUIRED OF YOU HERE.</span><span>STILLNESS OR LOUDNESS, ALL IS WELCOMED.</span><a href="#invitation" aria-label="Scroll down to the invitation">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a></div></div>
        </section>

        <section className="section invitation-section" id="invitation">
          <div className="container invitation-layout">
            <div className="invitation-side"><span className="eyebrow"><span className="eyebrow-line" />A LETTER FROM THE FIELD</span><div className="invitation-art" aria-hidden="true"><Mark /></div></div>
            <div className="invitation-copy">
              <p className="lead">Some call it spirit.<br />Some call it nature.<br />Some call it <em>consciousness.</em></p>
              <p>Some simply call it being alive. Whatever language you carry, whatever questions you hold, there is room for you here.</p>
              <p>The Open Field is a growing philosophy of kindness, curiosity, freedom, and shared existence. Not a place to be told what you must believe. A place to wonder, learn, create, rest, and be welcomed as you are.</p>
              <div className="handwritten">Right now is a gift. <span>✳</span></div>
            </div>
          </div>
        </section>

        <div className="marquee-line" aria-hidden="true"><span>PEOPLE ABOVE PROFIT</span><i>✳</i><span>LAUGHTER BEFORE HATRED</span><i>✳</i><span>TRUTH ABOVE CERTAINTY</span><i>✳</i><span>ALL ARE WELCOME</span></div>

        <Principles />
        <Doorways />
        <QuietRoom />
        <FieldNotes selectedPrompt={selectedPrompt} setSelectedPrompt={setSelectedPrompt} />
        <Questions />

        <section className="closing-section" id="welcome">
          <div className="closing-stars" aria-hidden="true">✳ &nbsp; · &nbsp; ✧ &nbsp; · &nbsp; ✳</div>
          <div className="container closing-inner"><Mark /><span className="eyebrow">A PLACE WITHOUT A PRICE OF ADMISSION</span><h2>Come as you are.<br /><em>Leave as you wish.</em><br />The door stays open.</h2><p>There is no membership, no conversion, and nothing you have to prove. Make something good if you can. Rest if you need. You belong either way.</p><a href="#top" className="button button-light">Back to the beginning <span aria-hidden="true">↑</span></a></div>
        </section>
      </main>

      <footer className="site-footer"><div className="container footer-top"><div className="footer-brand"><Mark small /><div><strong>The Open Field</strong><span>A living, open philosophy.</span></div></div><p>Nothing is required of you here.<br />Stillness or Loudness, all is welcomed.</p></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} The Open Field · Built with care and curiosity.</span><div><a href="https://github.com/MichaelWave369/TheOpenField" target="_blank" rel="noopener noreferrer">Explore the source <Arrow diagonal /></a><a href="#the-mystery">About the ideas <Arrow diagonal /></a></div></div></footer>
    </div>
  );
}

export default App;
