# Second Reader visual direction

Second Reader is a project-aware ECSS review. The loaded project is Lumen-1, a 6U CubeSat camera on a Falcon 9 rideshare. Lumen-1 is secondary on the screen. The product name is Second Reader.

The page is one calm column. Lots of air, a soft light background, white surfaces, quiet type, and little or no heavy border. It should feel like a modern agent product. It does not copy another company’s logo, name, or brand assets.

English is the default. Portuguese is the same layout, switched from the EN / PT control.

## Source boundary

One quiet line under the start button, in the active language:

- English: Standards library on Google Drive. This review uses the project cards.
- Portuguese: Biblioteca de normas no Google Drive. Esta revisão usa os cartões do projeto.

There is no Drive browser and no library URL. The review reads `web/src/data/baseline.json` and the opened clause cards in `web/src/data/clauses.json`.

## First screen

Before Run review is pressed, the screen is only the header and a short introduction.

The header holds the name Second Reader, the muted project name Lumen-1, and the EN / PT control. EN is pressed.

The column starts well down the page. The heading is “The baseline is ready.” The sentence under it says Lumen-1 is loaded and that Run review reads that file and the opened clause cards. The control is a dark pill labeled Run review. The source line sits below it, smaller and muted.

There is no baseline table, no clause list, no finding cards, and no step rail above the fold.

## Color

| Role | Hex | Use |
| --- | --- | --- |
| Background | `#f4f3f1` | The page |
| Surface | `#ffffff` | Messages and finding cards |
| Ink | `#1d1c1a` | Text and the Run review pill |
| Muted | `#6f6b66` | Lumen-1, the lede, the source line |
| Agree | `#3c6b5c` | Agreed findings |
| Dispute | `#8a5c32` | The open FMEA dispute |

No mount, no ink frame, no crosshair, no gradient.

## Type

IBM Plex Sans for the interface. IBM Plex Mono for clause identifiers and line numbers. Both are bundled with the app.

The heading is about 44 px, weight 500, slightly tight. Body type stays quiet. Labels inside a card are small and muted, not uppercase tracked stamps.

## The run

Run review is real code. It reads the loaded baseline and only the opened clause cards, then applies the checks. The sentences on screen are the project lines and clause identifiers those checks return. The reveal only paces results that are already computed. No model and no network.

The steps read as short white messages in the same column:

1. Read the Lumen-1 baseline and quote the project line.
2. Load the opened cards and list ECSS-E-ST-10C Rev.1, ECSS-E-ST-10-02C Rev.1, ECSS-E-ST-10-03C Rev.1, ECSS-Q-ST-30C Rev.1, and ECSS-Q-ST-70C Rev.2.
3. For each check, quote the project line that triggered it and the clause identifier. A corrected line stays quiet.
4. The second reader accepts or disputes. The dispute stays on ECSS-Q-ST-30C Rev.1, 6.4.2.2a: the clause requires the analysis and does not require a second camera.
5. Close with three agreed and one in dispute.

The rideshare guide is not cited. No section and no load number appear.

## Findings

The four findings arrive at the end of the same column as soft white cards. Three are agreed. One is the FMEA dispute.

Each card shows the verdict, the title, the clause identifier, the triggering line, why it is critical, the recommended change, and agreement versus dispute. The disputed card splits Auditor A and Auditor B.

## Language

Labels and card fields exist in English and Portuguese (Portugal). The control is EN / PT, with `aria-pressed`, and it sets `lang` on the document. The baseline sheet itself stays in English. Do not mix the two languages on one screen. Do not use flags.

## Motion

Messages and cards rise a few pixels when they appear. If the visitor prefers reduced motion, the waits and the rise drop out. Focus rings stay visible.

## Leave out

No dashboard tables. No dense clause dump above the fold. No second product name. No copied logo. No magnetometer or other payload. No Drive file list. No library URL. No model call. No verbatim ECSS prose. The rideshare guide stays uncited.
