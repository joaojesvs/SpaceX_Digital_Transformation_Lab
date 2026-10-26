# RANGE demo UI

Bilingual review screen for Lumen-1, a 6U CubeSat camera on a Falcon 9 rideshare.

English is the default. The EN / PT control switches the interface and the finding cards.

The audit reads the committed sample in `src/data/baseline.json` and `src/data/cards.json`. It does not call a model. The standards library stays on Google Drive. This screen does not browse Drive, and it has no library URL.

Clause identifiers on the four cards are the opened clauses for the planted issues. The rideshare guide is not cited.

## Start

```bash
cd web
npm install
npm run dev
```

Open http://localhost:5173

## Demo path

1. Load the engineering baseline.
2. Run the audit.
3. Read the four finding cards. Three are agreed. `ECSS-Q-ST-30C Rev.1, 6.4.2.2a` stays in dispute.

`npm run build` typechecks and writes a static build to `web/dist`.
