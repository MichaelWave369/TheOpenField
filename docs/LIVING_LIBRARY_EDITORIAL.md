# The Open Field · Living Library editorial guide

The Living Library is an invitation to investigate, **not** a place to establish a creed or to impersonate another tradition. Visitors should be able to encounter an unfamiliar idea, trace its sources, see its limits, and choose their own view.

## Each entry needs

1. **A distinct topic and clear attribution.** Give an accurate title, category, and short original summary. Name the tradition or research area without claiming it speaks for every member of a culture or religion.
2. **A source anyone can inspect.** Prefer primary institutions, scholarly reference works, public research, or reputable editions. Verify the actual URL, not just the domain.
3. **“What the source supports.”** State a careful, narrowly supported claim. For metaphysics, this may mean “this philosophical position has been argued,” not “nature works this way.”
4. **“What it does not establish.”** Make the epistemic boundary visible. A description of a beautiful experience is not, by itself, physical proof. An analogy is not an experiment. A historical teaching is not necessarily a scientific finding.
5. **An open question.** Encourage exploration, not an approved answer.

The library uses the four filters **Mind**, **Traditions**, **Cosmos**, and **Practice**. Place each entry in the most helpful category. Keep all published entries in `src/livingLibrary.js`, which is intentionally straightforward for contributors to edit.

## Evidence labels

- **Empirical cosmology / health research overview:** measurements, studies, and their limitations.
- **Philosophical inquiry / framework:** arguments and competing interpretations. These may be rigorous without being experimentally confirmed.
- **Classical philosophy / Buddhist philosophy / Vedānta tradition:** teachings and intellectual histories attributed to their specific traditions, without flattening important differences.
- **Moral philosophy:** normative arguments about what people ought to do, not a claim that ethics is settled.

Avoid treating these labels as universal rankings. A scientific explanation and a tradition-specific spiritual teaching often answer *different kinds* of questions.

## Contribution standards

- Paraphrase in fresh language; **do not copy long copyrighted text** from linked resources.
- Include a source title and working HTTPS link; prefer original scholarly or institutional hosts.
- Avoid presenting a founder's experiences, your own experiences, or automated system outputs as privileged revelations.
- No forced lessons, badges of merit, evangelism, manipulative retention loops, or rankings of visitors.
- Update or remove broken/outdated sources and add a note to the PR explaining the correction.
- For health-adjacent practices, avoid prescriptions and promises of supernatural or clinical results.
- Do not add analytics, accounts, or remote note/bookmark submission without an explicit privacy review and visitor consent.
- Invite disagreement and corrections. The field belongs to no single interpreter.

## Local development and checks

```bash
npm install
npm test
npm run build
npx playwright install chromium
npm run test:browser
```

CI and the GitHub Pages deployment both run real Chromium smoke tests. Publishing the build must fail if the rendered React page errors or the core Library interactions stop functioning.
