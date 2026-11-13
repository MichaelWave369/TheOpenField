import React, { useState } from 'react';
import { fieldGuide, movements } from './fieldGuide.js';

const PROGRESS_KEY = 'the-open-field-guide-progress-v1';
const lessonIds = new Set(fieldGuide.map(lesson => lesson.id));

function readExplored() {
  try {
    const data = JSON.parse(window.localStorage.getItem(PROGRESS_KEY) || '[]');
    return Array.isArray(data) ? data.filter(id => typeof id === 'string' && lessonIds.has(id)) : [];
  } catch {
    return [];
  }
}

export default function FieldGuide({ onOpenNote }) {
  const [selectedId, setSelectedId] = useState(fieldGuide[0].id);
  const [explored, setExplored] = useState(readExplored);
  const [storageMessage, setStorageMessage] = useState('');
  const currentIndex = fieldGuide.findIndex(lesson => lesson.id === selectedId);
  const current = fieldGuide[currentIndex];
  const exploredCount = explored.length;

  const updateExplored = next => {
    setExplored(next);
    try {
      window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
      setStorageMessage('');
    } catch {
      setStorageMessage('Progress is available for this visit, but browser storage is unavailable.');
    }
  };

  const toggleExplored = () => {
    const next = explored.includes(selectedId)
      ? explored.filter(id => id !== selectedId)
      : [...explored, selectedId];
    updateExplored(next);
  };

  const reset = () => {
    if (!window.confirm('Clear your Field Guide progress in this browser? Your notebook will not be affected.')) return;
    setExplored([]);
    try {
      window.localStorage.removeItem(PROGRESS_KEY);
      setStorageMessage('Local guide progress cleared.');
    } catch {
      setStorageMessage('Progress cleared for this visit, but browser storage could not be changed.');
    }
  };

  const nextLesson = () => {
    const next = fieldGuide[(currentIndex + 1) % fieldGuide.length];
    setSelectedId(next.id);
  };

  return (
    <section className="section guide-section" id="field-guide" aria-labelledby="field-guide-heading">
      <div className="container">
        <div className="guide-heading">
          <div>
            <span className="eyebrow"><span className="eyebrow-line" />03 / THE LIVING FIELD GUIDE</span>
            <h2 id="field-guide-heading">A little learning.<br /><em>At your own pace.</em></h2>
            <p>Nine short reflections in three movements. No test, no deadline, no certificate. Choose a chapter that calls to you, or just read a little and wander.</p>
          </div>
          <div className="guide-progress">
            <div className="guide-progress-top"><span>YOUR PRIVATE PATH</span><strong>{exploredCount} <span>/ 9 explored</span></strong></div>
            <div className="guide-progress-track" role="progressbar" aria-label="Optional Field Guide chapters explored" aria-valuemin={0} aria-valuemax={9} aria-valuenow={exploredCount}>
              <div className="guide-progress-fill" style={{ width: (exploredCount / fieldGuide.length * 100) + '%' }} />
            </div>
            <p>This progress stays on this browser. Nothing is sent to us.</p>
            <button type="button" onClick={reset} disabled={exploredCount === 0} className="guide-reset">Clear my progress</button>
          </div>
        </div>

        <div className="guide-shell">
          <div className="guide-index" aria-label="Field Guide chapters">
            {movements.map((movement, groupIndex) => (
              <div className="guide-movement" key={movement.name}>
                <div className="guide-movement-label"><span>0{groupIndex + 1} / {movement.name}</span><small>{movement.subtitle}</small></div>
                {fieldGuide.filter(lesson => lesson.movement === movement.name).map(lesson => (
                  <button key={lesson.id}
                    type="button"
                    className={'guide-lesson-choice' + (selectedId === lesson.id ? ' is-selected' : '')}
                    aria-pressed={selectedId === lesson.id}
                    onClick={() => setSelectedId(lesson.id)}
                  >
                    <span className="guide-choice-number">{lesson.number}</span>
                    <span className="guide-choice-name">{lesson.title}</span>
                    <span className="guide-choice-status" aria-label={explored.includes(lesson.id) ? 'Explored' : 'Not marked explored'}>{explored.includes(lesson.id) ? '✓' : '↗'}</span>
                  </button>
                ))}
              </div>
            ))}
          </div>

          <article className="guide-lesson-detail" aria-live="polite" aria-atomic="true" aria-label={'Lesson ' + current.number + ': ' + current.title}>
            <div className="guide-lesson-topline"><span>LESSON {current.number} / 09</span><span>{current.length}</span></div>
            <div className="guide-lesson-mark" aria-hidden="true">{current.glyph}</div>
            <p className="guide-lesson-subtitle">{current.subtitle}</p>
            <h3>{current.title}</h3>
            <div className="guide-copy-block"><span>THE IDEA</span><p>{current.idea}</p></div>
            <div className="guide-copy-block guide-evidence"><span>WHAT WE CAN SAY WITH CARE</span><p>{current.lens}</p></div>
            <div className="guide-copy-block guide-practice"><span>ONE SMALL THING TO TRY</span><p>{current.practice}</p></div>
            <div className="guide-reflection">
              <span>AN OPEN QUESTION</span>
              <p>“{current.question}”</p>
              <a href="#field-notes" onClick={() => onOpenNote(current.question)}>Reflect in your private notebook <span aria-hidden="true">↗</span></a>
            </div>
            <div className="guide-takeaway"><span aria-hidden="true">✳</span><p>{current.takeaway}</p></div>
            <div className="guide-actions">
              <button type="button" className={'guide-explore-button' + (explored.includes(selectedId) ? ' was-explored' : '')}
                onClick={toggleExplored} aria-pressed={explored.includes(selectedId)}>
                {explored.includes(selectedId) ? '✓ Marked explored' : 'Mark as explored'}
              </button>
              <button type="button" className="guide-next-button" onClick={nextLesson}>
                {currentIndex === fieldGuide.length - 1 ? 'Back to first lesson' : 'Next thought'} <span aria-hidden="true">→</span>
              </button>
            </div>
            <p className="guide-storage-message" role="status">{storageMessage}</p>
          </article>
        </div>
        <p className="guide-bottom-note"><span aria-hidden="true">✳</span> Your journey is yours. An unfinished lesson is not an unfinished person.</p>
      </div>
    </section>
  );
}
