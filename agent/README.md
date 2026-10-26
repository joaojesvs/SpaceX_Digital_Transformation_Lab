# Audit agent

Deterministic demo for Lyra-1, a CubeSat camera on a Falcon 9 rideshare. No model, no API key, no network.

From the repository root:

```bash
npm --prefix agent --silent run demo
```

English leads. Portuguese is on every card. Switch the lead language with:

```bash
npm --prefix agent --silent run demo -- --lang pt
```

The demo reloads `agent/data/cards/` on every run. After a new card is added for the locked slice, check the index with:

```bash
npm --prefix agent --silent run reload
```

`reload` accepts `--cards <directory>` for a replacement index. Pyrotechnics, explosives, and propulsion are refused. Cards outside the locked slice are skipped. The agent does not read regulation files.

Regulations stay on Google Drive. The only config field is `driveFolderUrl` in `agent/config.json`. Leave it empty until João sends the folder link. The demo never opens that URL.

Source system: the engineering baseline in `agent/data/baseline.json`.

Data domains: ECSS applicability index (`agent/data/cards/`), project configuration (the baseline), finding register (the demo output), rideshare constraints (`agent/data/rideshare.json`).
