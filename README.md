# The Open Field

> **Nothing is required of you here. Stillness or Loudness, all is welcomed.**

The Open Field is a free, open-source, static React experience devoted to compassion, curiosity, presence, creating together, and the right to belong without demands. It is a philosophy and reflective commons, **not a religion that demands belief, a supernatural claim, or a substitute for professional help.**

## Visit

GitHub Pages project URL, once deployment has finished:

**https://michaelwave369.github.io/TheOpenField/**

The Pages deployment runs automatically after commits are merged to `main`. **Settings → Pages → Build and deployment → GitHub Actions** must be selected for the repository. The site uses Vite's explicit `/TheOpenField/` asset base to avoid blank screens under project Pages.

## The experience

- A responsive, accessible welcome with an original abstract field-and-light SVG illustration.
- Nine expandable principles; invitations rather than commandments.
- Four interactive doorways: Presence, Inquiry, Compassion and Creation.
- An optional, pausable breathing visual with reduced-motion support.
- Private Field Notes with local browser storage, export to a text file, and an explicit erase button.
- A distinction between metaphysical possibilities and practical commitments.

## The living Field Guide (R0.2)

Nine optional lessons are arranged across three movements: **Arrive**, **Relate**, and **Create**. Each chapter offers an idea, a careful distinction between what is known and what is a philosophical possibility, a small everyday practice, and an open reflection question. Visitors can send the question to their personal Field Notes without an account.

Guide progress is **opt-in, local to the browser, and removable**. Neither guide progress nor notebook text is collected by this site. Nothing is graded, ranked, or required. Lessons are human-editable in `src/fieldGuide.js`. The learning UI lives in `src/FieldGuide.jsx` and its responsive styles in `src/fieldGuide.css`.

Deployment is now gated on actual Chromium browser tests, not merely a successful Vite build. This prevents the previous React runtime blank-screen regression from slipping through.

## Living Library (R0.3)

Nine original, curated entries link to the Stanford Encyclopedia of Philosophy, NASA Science, and the NIH National Center for Complementary and Integrative Health. Explore by category or search; each entry separates **the idea**, **what its source supports**, and **what it does not establish**, plus one open question with a direct handoff to Field Notes.

Saved topics use browser-local `localStorage` and can be cleared. No server account, telemetry, reading score, or hidden synchronization. The Library data lives in `src/livingLibrary.js`, the UI in `src/LivingLibrary.jsx`, and the styling in `src/livingLibrary.css`. Corrections and contributions should follow [the Living Library editorial guide](docs/LIVING_LIBRARY_EDITORIAL.md).

## The Listening Field (R0.4)

Optional **browser-based read-aloud** is now available for every Field Guide lesson and Living Library entry. Playback is explicitly opt-in, with pause/resume/stop, voice choice, adjustable reading pace and written transcripts. A short visitor welcome is available in **English**, **Spanish**, and **French**; educational lessons and library content remain in English while translations can be reviewed.

No microphone, login, recording, or Open Field speech server is required. The app narrates only public teaching text, **never private Field Notes**. The browser or device provides speech voices, which may use an online service depending on the visitor's system. See [The Listening Field accessibility and privacy guide](docs/LISTENING_FIELD.md).

## Run locally

Requires Node.js 22+ and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. Run quality checks with:

```bash
npm test
npm run build
npm run test:browser
```

## Privacy and participation

There is no membership, tracking script, analytics, authentication, or remote note collection in this app. The notebook uses `localStorage` in the visitor's current browser and has a limit of 30 notes, up to 5,000 characters each. On a shared device other users may see local notes; clearing browser storage can erase them. Visitors can download or clear their own entries at any time.

No promises of enlightenment, health outcomes, future predictions, or special access to truth are made. People are free to interpret, challenge, decline, or leave. This is not a representation of any particular Buddhist, Hindu, or other religious tradition.

## Contribute

Propose clearer language, accessibility improvements, translation, exercises, or new reflections through GitHub issues and pull requests. Avoid requiring belief in unverifiable assertions, pressuring visitors to participate, or presenting another tradition as the site's own invention.

Source content: `src/content.js`. UI: `src/App.jsx`. Styles: `src/styles.css`.

Licensed under MIT. Copyright (c) 2026 Michael Hughes.
