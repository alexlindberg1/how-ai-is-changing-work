# Demo: Proposal

Codex workspace for the **From PDF to Interactive Experience** slide.

## Layout

```
demo-proposal/
├── source/
│   └── summit-plumbing-proposal.pdf   ← source proposal (synced from public/demo)
├── src/                                ← Codex builds the interactive site here
├── index.html
├── package.json
└── vite.config.ts
```

## Live demo flow

1. Present the slide and preview the PDF in the deck.
2. Click **Build Interactive Version** — opens Codex with this folder and the prompt prefilled.
3. Press Enter in Codex.
4. Run `npm run dev` and open the generated proposal site.

## Sync source file

If you regenerate the PDF in `public/demo/`, copy it here:

```bash
cp public/demo/summit-plumbing-proposal.pdf demo-proposal/source/
```

Or run from the repo root:

```bash
node scripts/sync-demo-sources.mjs
```
