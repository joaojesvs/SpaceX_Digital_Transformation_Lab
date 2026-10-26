# Astrea

Desktop app for aerospace missions. The demo path is one Electron window, styled as a dark Mac app. `npm run dev` stays a browser fallback.

## Desktop

```bash
cd web
npm install
npm run desktop
```

That builds the renderer and opens the company window, with no address bar. The gold circle at the bottom right opens the scripted chat. Close returns to the dashboard.

## Browser fallback

```bash
cd web
npm install
npm run dev
```

Open http://localhost:5173

## What is on screen

The rail is Missions, Compliance, Phase, Budget, Schedule, Tests, Correspondence, Team. The Missions screen is a 1440×900 bento for Lumen-1: a budget ring (€2,400,000 total, €1,100,000 spent, €1,300,000 left) and one allocation chart (camera €980,000, platform €720,000, AIT €460,000, operations €240,000). Those figures are the demo set. Findings read 3 agreed and 1 in dispute. The phase rail marks PDR as now, with CDR next. Halcyon-3 and Cinder-2 stay on the list.

All eight panels are real. The chat answers only from the opened findings and the phase list.

`npm run build` typechecks and writes `web/dist`.
