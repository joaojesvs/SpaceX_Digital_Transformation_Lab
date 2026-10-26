# RANGE visual direction

RANGE is the review instrument for a project-aware ECSS audit. The live subject is Lumen-1, a 6U CubeSat with one visible camera, flying as a Falcon 9 rideshare piggyback. The screen is a calm precision instrument for engineers: a mounted sheet, hairline rules, one teal mark, and no dashboard chrome.

English is the default. Portuguese is the same layout, switched from the EN / PT control. The judged demo stays in English until someone toggles it.

## Source boundary

One line, in the footer, in the active language:

- English: Standards library on Google Drive. This review uses the project cards.
- Portuguese: Biblioteca de normas no Google Drive. Esta revisão usa os cartões do projeto.

There is no Drive browser and no library URL. The review reads `web/src/data/baseline.json` and `web/src/data/cards.json`.

## Name and frame

The wordmark is RANGE, set in IBM Plex Mono with wide tracking, beside a 28 px crosshair in teal. Under it, in the same mono at a smaller size: “Project-aware ECSS audit” (Portuguese: “Auditoria ECSS do projeto”). The project chip reads “Lumen-1 · 6U CubeSat camera · Falcon 9 rideshare”.

The page sits on a warm mount (`#cfc8ba`) with a 14 px margin. The instrument plate is paper (`#f3f0e8`) inside a 1 px ink rule. Content is capped at 1080 px. The header sticks. Corners are square. There is no drop shadow and no gradient.

## Color

| Role | Hex | Use |
| --- | --- | --- |
| Mount | `#cfc8ba` | Page around the plate |
| Paper | `#f3f0e8` | Plate and quotes |
| Sheet | `#faf8f4` | Baseline and cards |
| Ink | `#1a1814` | Text, plate border, primary button |
| Soft ink | `#5e574c` | Secondary text |
| Rule | `#c9c2b4` | Hairlines |
| Teal | `#1f6f62` | Current step, agreed findings, crosshair |
| Teal wash | `#e5f1ed` | Agreed lines in the baseline |
| Amber | `#8a5a12` | The disputed finding |
| Amber wash | `#f6efe2` | Disputed lines in the baseline |
| Oxide | `#8c3b32` | The word “Critical” on an agreed card |

Oxide is a label, not a banner. Amber is only the open dispute.

## Type

IBM Plex Sans for the interface. IBM Plex Mono for the wordmark, clause identifiers, line numbers, the baseline, pills, and the footer. Both are bundled with the app so the demo does not fetch a font service.

Titles are sans at 500 weight, slightly tight tracking. Section labels inside a card are 11 px mono, uppercase, tracked. The baseline is 13.5 px mono.

## Screens

Three steps, in order. Later steps stay disabled until the previous one has run. The run is local and scripted.

1. **Baseline.** Load the committed engineering baseline. The standards slice lists the opened issues only: ECSS-E-ST-10C Rev.1, ECSS-E-ST-10-02C Rev.1, ECSS-E-ST-10-03C Rev.1, ECSS-Q-ST-30C Rev.1, and ECSS-Q-ST-70C Rev.2. The rideshare guide is not cited. After the load, the baseline is a numbered English sheet, Lumen-1 at PDR. The Portuguese toggle does not translate that sheet.
2. **Audit.** Read the four committed cards. The pass names each clause identifier and the baseline lines it cites. It does not call a model.
3. **Findings.** Four cards. The tally is three agreed, one in dispute.

After the audit, triggering lines in the baseline take a teal or amber inset rule and the clause identifier in the margin. “Show in baseline” on a card returns to that line.

## Finding card

Each card has a 3 px top rule: teal when agreed, amber when in dispute.

The card shows, in this order:

- Clause identifier, labeled “Clause”. The four primary identifiers, in order, are `ECSS-E-ST-10-02C Rev.1, 5.2.1e`, `ECSS-Q-ST-70C Rev.2, 4.4a`, `ECSS-E-ST-10-03C Rev.1, 4.5.2a`, and `ECSS-Q-ST-30C Rev.1, 6.4.2.2a`.
- Under that, “Also opened” lists only the supporting clauses named for that finding. No other clause identifier is added. The rideshare guide is not named, and it has no section and no load factor on the card.
- Title of the issue. The body is the finding register, in English or Portuguese.
- Triggering line, quoted from the baseline with its line number.
- Why it is critical. On the disputed card the label is “Why it is called critical”, because the mark is not shared.
- Recommended change, as an edit to a named requirement or line.
- Agreement versus dispute. Agreed cards say both auditors agree and that the finding is critical at PDR. The dependability card says the dispute stays on the bundle and the human decides. It splits Auditor A and Auditor B. Auditor A treats the gap as critical. Auditor B accepts that the analysis is missing and does not accept single-string as the non-conformance. The recommended change on that card is Auditor A’s.

## Language

Every label, baseline line, and card field exists in English and Portuguese (Portugal). The control is EN / PT, with `aria-pressed`, and it sets `lang` on the document. Do not mix the two languages on one screen. Do not use flags.

## Motion

Loading the baseline and reading the four cards are short timed steps so the demo has a beat. They still finish from committed data. If the visitor prefers reduced motion, the waits drop out and the transitions do not play. Focus rings are 2 px teal.

## Cover frame

Canva was available in the session. The cover request was refused because the account is over its credit quota. No cover frame was made.

## Leave out

No second product name. No magnetometer, boom, or other payload. No Drive file list. No library URL. No model call. No verbatim ECSS prose. The rideshare guide stays uncited. No clause identifier that the finding register did not open.
