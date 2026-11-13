# The Listening Field · R0.4

The Open Field now offers **optional read-aloud** for its public Field Guide lessons, Living Library entries, and a short welcome in English, Spanish, and French.

## How to listen

1. Open any Field Guide lesson or Living Library entry. Find **Listen instead** directly below the heading.
2. Press **Read this lesson** or **Read this perspective**. Audio **never** starts automatically.
3. Use **Pause reading**, **Resume reading**, or **Stop**. Changing lessons or library entries stops the previous narration, instead of stacking voices.
4. Choose the preferred voice and reading pace, when supported. Those settings apply the next time you start a passage.
5. Expand **Read the full narration text** for a written, selectable transcript. The original lesson and source link are also always visible.

You can switch the short visitor welcome between **English**, **Español**, and **Français**. The rest of the educational content is currently English only. Do not tell visitors the full website is translated. Use the original source links for deeper independent study.

## How it works

The UI uses the standard browser Web Speech interfaces, specifically **SpeechSynthesis**, **SpeechSynthesisUtterance**, and device-provided voices. The app is static, requires no API key, and runs **no audio backend**. Playback starts only after a direct user action.

These APIs are not identical across every browser or operating system. Some voices may depend on an online speech service provided by the browser or OS. The Open Field itself does not upload narration to a server. It **never includes private Field Notes**, notebook entries, saved-library lists, or progress tracking in narration text. The scripts are constructed only from public content in:

- `src/narration.js`
- `src/fieldGuide.js`
- `src/livingLibrary.js`

No recording, microphone permission, speech recognition, or voice cloning is involved. If the Web Speech API is unavailable, the written content and transcript remain available.

## Accessible design

- A **full transcript** accompanies every passage. Users can read, select, magnify, or use their own screen reader.
- Playback, pause, and stop are regular keyboard-focusable buttons with labels.
- Text is never read automatically. An explicit consent gesture is required to start.
- Voice choices are filtered by spoken language when possible; browser language preference selects the welcome automatically where supported.
- Language tags such as `lang="es-ES"` and `lang="fr-FR"` support multilingual screen readers.
- Controls work without relying on color alone. Status messages announce playback state.
- Original CSS respects `prefers-reduced-motion`; speech is never part of the breathing animation.
- The mobile site retains a visible menu and supports screen-width reflow.

## Known limitations and future work

- Voice quality and voice availability vary by browser, OS, and language. Some languages may have no available voice.
- A paused passage may behave differently on some browsers; the transcript is always the fallback.
- The current translations cover the brief **welcome only**, not the nine educational lessons, library entries, policies, or the entire interface. Full translation requires human review for meaning, scholarly nuance, and accessibility.
- Automatic translation is **not** presented as a verified equivalent to source texts, particularly for philosophical and religious terminology.
- Generated speech is a visitor convenience, **not** a replacement for accessible text or a professional interpreter.

## Test the experience

Run `npm test` for original-content and translation checks, then `npm run build` and `npm run test:browser` for real Chromium interaction tests.

The browser tests mock speech voices to check: no autoplay, reading on user click, pause/resume/stop, cancelled speech on lesson switch, correct spoken language in Spanish and French, and a visible transcript when synthesis support is absent.

A green compilation alone is not sufficient. GitHub Pages deployment remains gated on successful Chromium tests.
