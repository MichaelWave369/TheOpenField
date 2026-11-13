import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { principles, rooms, prompts, grounding } from '../src/content.js';
import { fieldGuide, movements } from '../src/fieldGuide.js';
import { libraryTopics, libraryCategories } from '../src/livingLibrary.js';

test('nine inclusive principles are unique and substantive', () => {
  assert.equal(principles.length, 9);
  assert.equal(new Set(principles.map(p => p.number)).size, 9);
  assert.equal(new Set(principles.map(p => p.title)).size, 9);
  for (const p of principles) {
    assert.ok(p.title.length > 8 && p.detail.length > 40);
  }
});

test('four doorways carry usable practices and reflection questions', () => {
  assert.deepEqual(rooms.map(room => room.id), ['presence','inquiry','compassion','creation']);
  rooms.forEach(room => {
    assert.ok(room.practice.length > 50);
    assert.ok(room.question.endsWith('?'));
  });
});

test('reflection questions remain open-ended', () => {
  assert.ok(prompts.length >= 8);
  assert.equal(new Set(prompts).size, prompts.length);
  prompts.forEach(prompt => assert.ok(prompt.endsWith('?')));
});

test('the site clearly separates philosophical possibility from obligation', () => {
  assert.equal(grounding.length, 3);
  const all = grounding.map(g => g.text).join(' ').toLowerCase();
  assert.match(all, /not a fact everyone must accept/);
  assert.match(all, /(?:not|nor) a substitute/);
});

test('GitHub Pages uses the repository project path', () => {
  const vite = fs.readFileSync(new URL('../vite.config.js', import.meta.url), 'utf8');
  assert.match(vite, /base:\s*['"]\/TheOpenField\/['"]/);
  const index = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(index, /id="root"/);
});

test('notebook is local-only and users can export or remove notes', () => {
  const app = fs.readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8');
  assert.match(app, /localStorage\.setItem/);
  assert.match(app, /localStorage\.removeItem/);
  assert.match(app, /URL\.createObjectURL/);
  assert.match(app, /Nothing is required of you here/i);
  assert.doesNotMatch(app, /\bfetch\s*\(/);
});

test('interactions have accessible names and reduced-motion option', () => {
  const app = fs.readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8');
  const css = fs.readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  assert.match(app, /aria-expanded/);
  assert.match(app, /role="tablist"/);
  assert.match(app, /aria-live/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /focus-visible/);
});


test('living Field Guide contains nine distinct optional chapters in three movements', () => {
  assert.equal(fieldGuide.length, 9);
  assert.deepEqual(movements.map(m => m.name), ['ARRIVE', 'RELATE', 'CREATE']);
  assert.equal(new Set(fieldGuide.map(l => l.id)).size, fieldGuide.length);
  assert.deepEqual(fieldGuide.map(l => l.number), ['01','02','03','04','05','06','07','08','09']);
  for (const movement of movements) {
    assert.equal(fieldGuide.filter(lesson => lesson.movement === movement.name).length, 3);
  }
});

test('every Field Guide chapter distinguishes ideas, grounded claims, action and inquiry', () => {
  for (const lesson of fieldGuide) {
    assert.ok(lesson.title.length > 10, lesson.id);
    assert.ok(lesson.idea.length > 140, lesson.id + ' needs a substantive idea');
    assert.ok(lesson.lens.length > 140, lesson.id + ' needs an epistemic lens');
    assert.ok(lesson.practice.length > 95, lesson.id + ' needs a usable practice');
    assert.ok(lesson.question.endsWith('?'), lesson.id);
    assert.ok(lesson.takeaway.length > 30, lesson.id);
  }
});

test('Pages deployment runs real-browser checks before publishing', () => {
  const workflow = fs.readFileSync(new URL('../.github/workflows/pages.yml', import.meta.url), 'utf8');
  const smokeIndex = workflow.indexOf('npm run test:browser');
  const publishIndex = workflow.indexOf('actions/deploy-pages@v4');
  assert.ok(smokeIndex > 0 && publishIndex > smokeIndex);
});


test('the Living Library provides nine grounded, diverse source-linked perspectives', () => {
  assert.equal(libraryTopics.length, 9);
  assert.equal(new Set(libraryTopics.map(topic => topic.id)).size, 9);
  assert.deepEqual(libraryCategories, ['All','Mind','Traditions','Cosmos','Practice']);
  for (const topic of libraryTopics) {
    assert.ok(libraryCategories.includes(topic.category), topic.id);
    assert.ok(topic.summary.length >= 130, topic.id + ' should explain the idea in original words');
    assert.ok(topic.grounded.length >= 75, topic.id + ' should distinguish grounded material');
    assert.ok(topic.notClaim.length >= 90, topic.id + ' needs clear limits');
    assert.ok(topic.question.endsWith('?'), topic.id);
    assert.ok(topic.sourceTitle.length > 18, topic.id);
    const url = new URL(topic.sourceUrl);
    assert.equal(url.protocol, 'https:', topic.id);
    assert.ok(['plato.stanford.edu', 'science.nasa.gov', 'www.nccih.nih.gov'].includes(url.hostname), topic.id);
  }
  for (const category of libraryCategories.filter(category => category !== 'All')) {
    assert.ok(libraryTopics.some(topic => topic.category === category), category);
  }
});

test('Living Library browser UI explicitly keeps bookmarks local', () => {
  const app = fs.readFileSync(new URL('../src/LivingLibrary.jsx', import.meta.url), 'utf8');
  assert.match(app, /window\.localStorage\.setItem/);
  assert.match(app, /window\.localStorage\.removeItem/);
  assert.match(app, /rel="noopener noreferrer"/);
  assert.match(app, /WHAT IT DOES NOT ESTABLISH/);
  assert.doesNotMatch(app, /\bfetch\s*\(/);
});
