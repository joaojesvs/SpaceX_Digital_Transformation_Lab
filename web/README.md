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

The shell is a left rail, a top bar, and the gold circle on every module. Missions is an overview: four demo stat cards, a budget ring, an allocation chart, and a recent-activity list. Demo figures are €2,400,000 total, €1,100,000 spent, €1,300,000 left, split camera €980,000, platform €720,000, AIT €460,000, operations €240,000. Findings read 3 agreed and 1 in dispute. PDR is now and CDR is next. Halcyon-3 and Cinder-2 stay on the list. The circle opens a chat thread. Replies stay inside the opened findings and the phase list.

All eight panels are real. The chat answers only from the opened findings and the phase list.

`npm run build` typechecks and writes `web/dist`.
