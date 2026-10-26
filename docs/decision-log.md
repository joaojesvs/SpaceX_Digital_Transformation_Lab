# Decision log

Baseline recorded 26 Oct 2026, Europe/Lisbon, from the locked decisions for the two-day hackathon. João can still correct the standards slice.

This file records those locks, then keeps dated sections for later changes and later problems. Add new entries under those sections, newest first.

## Locked decisions

### Product

An audit agent for a CubeSat optical payload (camera) flying as a Falcon 9 rideshare (piggyback) payload. The team gives it an engineering baseline. It answers ECSS questions against that design, marks what is critical, and proposes the change that brings the project back inside the rules.

### Languages

English and Portuguese for the demo UI, the finding cards, and the presentation. The judged presentation is the English one. Default the live demo to English and keep a Portuguese toggle.

### Corpus

The regulation library is 317 files. They are arriving in parts. The tree on 26 Oct 2026 around 11:45 UTC (24 superseded engineering PDFs) is not the full library. Re-pull before freezing any card. Do not switch the instrument because an early batch is incomplete.

Card only the demo slice below. Do not index all 317 files. Pyrotechnics, explosives, and propulsion stay out of the demo even if those files arrive.

If a file the slice needs is not on `main` yet, mark that card "waiting on upload". Do not invent a clause from a file the repo does not hold.

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

### 26 Oct 2026 — rideshare citation removed

The rideshare-guide section citation was removed from https://github.com/joaojesvs/SpaceX_Digital_Transformation_Lab/pull/2. F-03 stays Agree on ECSS-E-ST-10-03C Rev.1, 4.5.2a. The guide stays waiting on upload.

### 26 Oct 2026 — bilingual pitch

Bilingual pitch opened: https://github.com/joaojesvs/SpaceX_Digital_Transformation_Lab/pull/4

- English deck: https://www.canva.com/d/n9BpVJvYGEyb2hu
- Portuguese deck: https://www.canva.com/d/CCGGOlYNz7dAFcr

The five-minute judged talk is English. A follow-up is aligning the spoken citations with the open files only: ECSS-E-ST-10-02C Rev.1 and ECSS-E-ST-10-03C Rev.1. Q-ST-70, Q-ST-30, and E-ST-10 stay unnamed as cited clauses until those files are open. No Drive URL.

### 26 Oct 2026 — finding quality review, second pass

Finding quality review second pass updated: https://github.com/joaojesvs/SpaceX_Digital_Transformation_Lab/pull/2

Reviewed against the Lumen-1 cards.

- F-01: Agree on ECSS-E-ST-10-02C Rev.1 clause 5.2.1e.
- F-02: Agree, waiting on ECSS-Q-ST-70.
- F-03: Agree on ECSS-E-ST-10-03C Rev.1 clause 4.5.2a.
- F-04: stays in dispute, waiting on ECSS-Q-ST-30.

A rideshare-guide section citation (Version 10, 4.1.2.1, 4.1.6, 6.6) was not accepted, because the finding card left the guide unopened. That citation is being removed.

### 26 Oct 2026 — ECSS clause baseline

ECSS clause baseline opened: https://github.com/joaojesvs/SpaceX_Digital_Transformation_Lab/pull/3

Mission name used in the pack: Lumen-1, a Falcon 9 rideshare CubeSat camera.

Planted issues:

1. No verification method. ECSS-E-ST-10-02C Rev.1 clause 5.2.1e.
2. Contamination and outgassing, waiting on ECSS-Q-ST-70.
3. Launch loads. ECSS-E-ST-10-03C Rev.1 clause 4.5.2a. The rideshare guide is still waiting.
4. Reliability with no FMEA stays in dispute and waits on ECSS-Q-ST-30.

ECSS-E-ST-10 is also waiting. No PDFs were committed. Cards came from the files already on `main`.

### 26 Oct 2026 — regulation library location

João: the 317 regulation files go to Google Drive, not into the GitHub repo. The folder link is not available yet. Git keeps the demo, the cards, and the team’s own documents. The agent does not vendor the PDFs. Pyrotechnics, explosives, and propulsion stay out.

This entry does not remove files already on `main`.

### 26 Oct 2026 — finding quality review

Finding quality review opened: https://github.com/joaojesvs/SpaceX_Digital_Transformation_Lab/pull/2

First pass only, because `docs/ecss/findings.md` was not on `main` yet.

Verdicts:

1. Verification method: agreed. ECSS-E-ST-10-02C Rev.1 is on `main`.
2. Optic contamination: agreed, but waiting on ECSS-Q-ST-70.
3. Launch loads: agreed on ECSS-E-ST-10-03C Rev.1, and waiting on the rideshare guide.
4. Single-string camera with no FMEA: stays in dispute, and also waits on ECSS-Q-ST-30.

A second pass will bind clause identifiers when the baseline findings exist.

### 26 Oct 2026

João: the regulation library is 317 files, uploading in parts. The first batch is not the full corpus. The instrument stays the Falcon 9 rideshare CubeSat camera. The demo cards a slice only. Pyrotechnics, explosives, and propulsion stay out.

A pull of `origin/main` after that note is still `cde8015` (README plus 65 PDFs). That batch is larger than the 24-file tree from about 11:45 UTC and is still not the 317-file library. Do not freeze cards from it, and do not switch the instrument because the upload is incomplete. ECSS-Q-ST-30, ECSS-Q-ST-70, and the SpaceX Rideshare Payload User's Guide are not in this batch, so those cards stay "waiting on upload". Do not invent a clause from a file the repo does not hold.

## Problems

### 26 Oct 2026

None yet. Later problems go here, newest first. Date each entry. Say what broke and what is still open.
