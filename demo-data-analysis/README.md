# Demo: Data Analysis

Codex workspace for the **From Spreadsheet to Decision Tool** slide.

## Layout

```
demo-data-analysis/
├── source/
│   └── summit-plumbing-financials.xlsx   ← source workbook (synced from public/demo)
├── src/                                   ← Codex builds the dashboard here
├── index.html
├── package.json
└── vite.config.ts
```

## Live demo flow

1. Present the slide and preview the workbook in the deck.
2. Click **Build Interactive Version** — opens Codex with this folder and the prompt prefilled.
3. Press Enter in Codex.
4. Run `npm run dev` and open the generated dashboard.

## Sync source file

If you regenerate the workbook in `public/demo/`, copy it here:

```bash
cp public/demo/summit-plumbing-financials.xlsx demo-data-analysis/source/
```

Or run from the repo root:

```bash
node scripts/sync-demo-sources.mjs
```
