# Astraea

Desktop app for aerospace missions. The demo path is the Electron window, styled as a dark Mac app. `npm run dev` stays a browser fallback.

## Desktop

```bash
cd web
npm install
npm run desktop
```

That builds the renderer and opens two windows: the company app, with no address bar, and a small always-on-top employee widget at the bottom right. They share one session.

## Browser fallback

```bash
cd web
npm install
npm run dev
```

Open http://localhost:5173

## What is on screen

The menu row is Missions, Compliance, Phase, Budget, Schedule, Tests, Correspondence, Team. Lumen-1 is the open mission. Halcyon-3 and Cinder-2 stay on the Missions list. The header figures are a demo budget of €2,400,000 and €1,100,000 spent. Lumen-1 is in PDR. The next phase is CDR.

Compliance, Phase, Budget, Schedule, Tests, Correspondence, and Team show the module name until that module file exists. Ask is a scripted panel. The widget is the log book, a regulation question, and the next phase. A log or a question is filed on Lumen-1 in the same session.

`npm run build` typechecks and writes `web/dist`.
