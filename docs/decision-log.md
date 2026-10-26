# Decision log

Baseline recorded 26 Oct 2026, Europe/Lisbon, from the locked decisions for the two-day hackathon. João can still correct the standards slice.

This file records those locks, then keeps dated sections for later changes and later problems. Add new entries under those sections, newest first.

## Locked decisions

### Product

An audit agent for a CubeSat optical payload (camera) flying as a Falcon 9 rideshare (piggyback) payload. The team gives it an engineering baseline. It answers ECSS questions against that design, marks what is critical, and proposes the change that brings the project back inside the rules.

### Languages

English and Portuguese for the demo UI, the finding cards, and the presentation. The judged presentation is the English one. Default the live demo to English and keep a Portuguese toggle.

### Standards slice

Use only this slice:

- ECSS-E-ST-10 system engineering, so requirements are traceable
- ECSS-E-ST-10-02 verification, so every requirement has a verification method
- ECSS-Q-ST-30 dependability, so failures are analyzed rather than asserted
- ECSS-Q-ST-70 materials, contamination, and outgassing, because the payload is optical
- ECSS-E-ST-10-03 testing, aimed at the Falcon 9 rideshare mechanical environment
- The public SpaceX Rideshare Payload User's Guide, as the launch-side constraint next to those clauses

Leave out of this build: the rest of ECSS, flight software (E-ST-40 and Q-ST-80), the management branch beyond naming the review, and a deep electrical domain.

Cite clause identifiers and write original explanations. Do not commit verbatim text from paywalled ECSS standards. Summarize the rideshare guide; do not paste long sections of it.

### Demo

One scripted baseline with four planted issues:

1. A requirement with no verification method. Both auditors agree.
2. No contamination or outgassing control on the optic. Both auditors agree.
3. No qualification against rideshare launch loads. Both auditors agree.
4. A single-string camera whose reliability is asserted with no FMEA. This one stays in dispute between the two auditors.

The stage demo must run from committed data so it does not depend on a live model.

### Repository

`joaojesvs/spacex_digital_transformation_lab`. A colleague is uploading documentation during this work. Pull first. Do not delete or rewrite uploads you do not own. If those uploads describe a different mission, follow the uploads and report the difference.

File ownership:

- `agent/` — audit agent
- `web/` — demo UI
- `docs/ecss/clause-index.md`, `docs/ecss/demo-baseline.md`, `docs/ecss/findings.md` — clause baseline
- `docs/ecss/red-team.md` — finding challenge
- `docs/pitch/` — English and Portuguese scripts
- `docs/design/` — visual direction
- `docs/decision-log.md` — decisions, changes, and problems

Each owner opens a pull request from their own branch. Do not edit another owner's paths.

### Submission

Problem, live demo, results, and architecture. Architecture must name the source system (the engineering baseline) and the data domains (ECSS applicability index, project configuration, finding register, rideshare constraints). Scores: innovation 30%, technical implementation 30%, impact 20%, presentation 20%.

## Checked against the upload — 26 Oct 2026

Pulled `origin/main` at `cde8015` (26 Oct 2026, 11:51 UTC), "Add files via upload". The tree is `README.md` plus 65 ECSS engineering PDFs at the repository root.

The upload does not describe a different mission. The product lock stands: a CubeSat optical payload on a Falcon 9 rideshare. The uploaded files were left in place.

The corpus is wider than the slice above. It includes older E-branch issues and current E-ST system-engineering parts, and it also includes disciplines this build leaves out. It does not include ECSS-Q-ST-30, ECSS-Q-ST-70, or the SpaceX Rideshare Payload User's Guide. Those stay named in the slice. This log does not widen the build to the rest of the corpus, and it does not paste text from the PDFs.

## Changes

### 26 Oct 2026

None yet. Later changes go here, newest first. Date each entry. Say what moved and why.

## Problems

### 26 Oct 2026

None yet. Later problems go here, newest first. Date each entry. Say what broke and what is still open.
