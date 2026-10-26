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

The shell is a left rail, a top bar, and the gold circle on every module. Missions is an overview: the mission header, a findings count (3 agreed, 1 in dispute), and recent review activity. PDR is now and CDR is next. Halcyon-3 and Cinder-2 stay on the list. Budget figures stay in the Budget module. The circle opens a chat. Enter sends. A round + attaches a file to the next message only.

All eight panels are real. In the desktop app the reply is requested from the Electron main process. Set `XAI_API_KEY` in `web/.env` (see `web/.env.example`). The key is not read by the renderer.

`npm run build` typechecks and writes `web/dist`.
