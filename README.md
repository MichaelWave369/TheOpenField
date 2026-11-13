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
```

## Privacy and participation

There is no membership, tracking script, analytics, authentication, or remote note collection in this app. The notebook uses `localStorage` in the visitor's current browser and has a limit of 30 notes, up to 5,000 characters each. On a shared device other users may see local notes; clearing browser storage can erase them. Visitors can download or clear their own entries at any time.

No promises of enlightenment, health outcomes, future predictions, or special access to truth are made. People are free to interpret, challenge, decline, or leave. This is not a representation of any particular Buddhist, Hindu, or other religious tradition.

## Contribute

Propose clearer language, accessibility improvements, translation, exercises, or new reflections through GitHub issues and pull requests. Avoid requiring belief in unverifiable assertions, pressuring visitors to participate, or presenting another tradition as the site's own invention.

Source content: `src/content.js`. UI: `src/App.jsx`. Styles: `src/styles.css`.

Licensed under MIT. Copyright (c) 2026 Michael Hughes.
