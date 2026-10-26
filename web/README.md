# Second Reader

Bilingual review screen for Lumen-1, a 6U CubeSat camera on a Falcon 9 rideshare.

English is the default. The EN / PT control switches the interface and the finding cards.

Open the dev server and press **Run review**. The run reads `src/data/baseline.json` and the opened clause cards in `src/data/clauses.json`, then applies the checks in code. It does not call a model and it does not use the network. The standards library stays on Google Drive. This screen does not browse Drive, and it has no library URL.

Clause identifiers on the four cards are the opened clauses for the planted issues. The rideshare guide is not cited.

## Start

```bash
cd web
npm install
npm run dev
```

Open http://localhost:5173

## Demo path

1. Press **Run review**.
2. Watch the baseline read, the five opened clause cards, and each check quote the project line that triggered it.
3. The second reader accepts three findings. `ECSS-Q-ST-30C Rev.1, 6.4.2.2a` stays in dispute: the clause requires the analysis and does not require a second camera.

`node --experimental-strip-types src/review/check-stage.ts` checks that the loaded baseline produces that result, and that a corrected verification line or an added FMEA stays quiet.

`npm run build` typechecks and writes a static build to `web/dist`.
