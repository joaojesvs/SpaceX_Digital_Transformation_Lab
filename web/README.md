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

The rail is Missions, Compliance, Phase, Budget, Schedule, Tests, Correspondence, Team. Lumen-1 is the open mission. Halcyon-3 and Cinder-2 stay on the Missions list. The mission charts are labelled demo: budget €2,400,000, spent €1,100,000, remaining €1,300,000. Lumen-1 is in PDR. The next phase is CDR.

All eight panels are real. The chat answers only from the opened findings and the phase list.

`npm run build` typechecks and writes `web/dist`.
