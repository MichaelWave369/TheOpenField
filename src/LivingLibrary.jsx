import React, { useMemo, useState } from 'react';
import { libraryTopics, libraryCategories } from './livingLibrary.js';
import { libraryNarration } from './narration.js';
import { SpeechReader } from './SpeechReader.jsx';

const SAVED_KEY = 'the-open-field-library-saved-v1';
const knownIds = new Set(libraryTopics.map(topic => topic.id));

function loadSaved() {
  try {
    const value = JSON.parse(window.localStorage.getItem(SAVED_KEY) || '[]');
    return Array.isArray(value) ? [...new Set(value.filter(id => typeof id === 'string' && knownIds.has(id)))] : [];
  } catch {
    return [];
  }
}

/** Readable, sourced perspectives without compulsory beliefs, accounts or remote tracking. */
export default function LivingLibrary({ onOpenNote }) {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(libraryTopics[0].id);
  const [saved, setSaved] = useState(loadSaved);
  const [savedOnly, setSavedOnly] = useState(false);
  const [storageNotice, setStorageNotice] = useState('');

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase();
    return libraryTopics.filter(topic => (
      (category === 'All' || topic.category === category) &&
      (!savedOnly || saved.includes(topic.id)) &&
      (!normalized || [topic.title, topic.subtitle, topic.summary, topic.category, topic.lens, topic.sourceTitle]
        .some(text => text.toLocaleLowerCase().includes(normalized)))
    ));
  }, [category, query, savedOnly, saved]);

  // A filter can hide the previously selected topic. Choose the first visible one
  // without silently rewriting the user's chosen topic.
  const selected = filtered.find(topic => topic.id === selectedId) || filtered[0] || null;

  function toggleSave(id) {
    const next = saved.includes(id) ? saved.filter(item => item !== id) : [...saved, id];
    setSaved(next);
    try {
      window.localStorage.setItem(SAVED_KEY, JSON.stringify(next));
      setStorageNotice('');
    } catch {
      setStorageNotice('Saved for this visit only. Browser storage is unavailable.');
    }
  }

  function clearSaved() {
    if (!window.confirm('Clear saved Living Library topics from this browser? Your Field Notes and Field Guide progress will stay.')) return;
    setSaved([]);
    setSavedOnly(false);
    try {
      window.localStorage.removeItem(SAVED_KEY);
      setStorageNotice('Saved topics cleared from this browser.');
    } catch {
      setStorageNotice('Cleared for this visit; browser storage could not be updated.');
    }
  }

  return (
    <section className="section living-library-section" id="living-library" aria-labelledby="living-library-title">
      <div className="container">
        <div className="library-intro">
          <div className="library-intro-copy">
            <span className="eyebrow"><span className="eyebrow-line" />04 / THE LIVING LIBRARY</span>
            <h2 id="living-library-title">A room full of<br /><em>open questions.</em></h2>
            <p>A growing collection of ideas from science, philosophy, and human traditions. Follow the sources. Compare perspectives. Decide what you think.</p>
          </div>
          <div className="library-intro-stamp">
            <span aria-hidden="true" className="library-stamp-glyph">✳</span>
            <span>NOTHING TO BELIEVE.<br />EVERYTHING TO EXPLORE.</span>
          </div>
        </div>

        <div className="library-controls">
          <div className="library-search-wrap">
            <span aria-hidden="true">⌕</span>
            <label htmlFor="living-library-search" className="sr-only">Search the Living Library</label>
            <input id="living-library-search" type="search" value={query} onChange={event => setQuery(event.target.value)}
              placeholder="Search ideas, questions, traditions…" maxLength={120} autoComplete="off" />
          </div>
          <div className="library-categories" role="group" aria-label="Filter library by topic">
            {libraryCategories.map(item => <button key={item} type="button"
              className={category === item ? 'library-filter active' : 'library-filter'}
              aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
          </div>
          <div className="library-filter-extras">
            <label className="library-saved-filter">
              <input type="checkbox" checked={savedOnly} onChange={event => setSavedOnly(event.target.checked)} />
              <span>Saved only <strong>{saved.length}</strong></span>
            </label>
            <span className="library-count" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'perspective' : 'perspectives'}</span>
          </div>
        </div>

        <div className="library-layout">
          <div className="library-list" aria-label="Library topics">
            {filtered.length > 0 ? filtered.map(topic => (
              <button key={topic.id} type="button"
                className={selected?.id === topic.id ? 'library-topic-card selected' : 'library-topic-card'}
                aria-pressed={selected?.id === topic.id} onClick={() => setSelectedId(topic.id)}>
                <span className="library-card-top"><span>{topic.category.toUpperCase()}</span><span>{saved.includes(topic.id) ? '★ SAVED' : topic.lens}</span></span>
                <span className="library-topic-symbol" aria-hidden="true">{topic.symbol}</span>
                <strong>{topic.title}</strong>
                <span className="library-topic-subtitle">{topic.subtitle}</span>
                <span className="library-card-bottom"><span>Read this perspective</span><span aria-hidden="true">↗</span></span>
              </button>
            )) : (
              <div className="library-empty" role="status">
                <span aria-hidden="true">◌</span>
                <h3>No pages in this corner yet.</h3>
                <p>Try another topic, clear the search, or turn off “Saved only.” The questions are still out there.</p>
                <button type="button" onClick={() => { setQuery(''); setCategory('All'); setSavedOnly(false); }}>Show all perspectives</button>
              </div>
            )}
          </div>

          {selected && (
            <article key={selected.id} className="library-detail" aria-label={'Perspective: ' + selected.title}>
              <div className="library-detail-meta"><span>{selected.lens}</span><span>THE OPEN FIELD / LIBRARY</span></div>
              <div className="library-detail-symbol" aria-hidden="true">{selected.symbol}</div>
              <span className="library-detail-kicker">{selected.subtitle}</span>
              <h3>{selected.title}</h3>
              <SpeechReader key={'library-'+selected.id} owner={'library-'+selected.id} lang="en-US" label="this perspective" segments={libraryNarration(selected)} />
              <section className="library-detail-block">
                <h4>THE IDEA</h4>
                <p>{selected.summary}</p>
              </section>
              <section className="library-detail-block">
                <h4>WHAT THE SOURCE SUPPORTS</h4>
                <p>{selected.grounded}</p>
              </section>
              <section className="library-detail-block library-detail-caution">
                <h4>WHAT IT DOES NOT ESTABLISH</h4>
                <p>{selected.notClaim}</p>
              </section>
              <div className="library-source">
                <span>FOLLOW THE ORIGINAL SOURCE</span>
                <a href={selected.sourceUrl} target="_blank" rel="noopener noreferrer">{selected.sourceTitle} <span aria-hidden="true">↗</span></a>
                <p>Opens the source in a new tab. Source authors are independent of The Open Field.</p>
              </div>
              <div className="library-question">
                <span>TAKE A QUESTION WITH YOU</span>
                <p>“{selected.question}”</p>
                <a href="#field-notes" onClick={() => onOpenNote(selected.question)}>Reflect in your private notebook <span aria-hidden="true">→</span></a>
              </div>
              <div className="library-detail-actions">
                <button type="button" onClick={() => toggleSave(selected.id)}
                  className={saved.includes(selected.id) ? 'library-save-button is-saved' : 'library-save-button'}
                  aria-pressed={saved.includes(selected.id)}>
                  {saved.includes(selected.id) ? '★ Saved to this browser' : '☆ Save for later'}
                </button>
                <span>Curiosity needs no membership.</span>
              </div>
              <p className="library-storage-notice" role="status">{storageNotice}</p>
            </article>
          )}
        </div>

        <div className="library-footer">
          <p><span aria-hidden="true">✳</span> These are starting points, not endorsements or final answers. The library will grow and corrections are welcome.</p>
          <button type="button" disabled={saved.length === 0} onClick={clearSaved}>Clear my saved topics</button>
        </div>
      </div>
    </section>
  );
}
