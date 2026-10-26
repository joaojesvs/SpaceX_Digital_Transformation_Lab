# Second Reader visual direction

Second Reader is a project-aware ECSS review. The loaded project is Lumen-1, a 6U CubeSat camera on a Falcon 9 rideshare. Lumen-1 is secondary. The product name is Second Reader.

The page is one centered column, about 640 px. The header and the work share that column, so the screen reads as one composition. It is a warm off-white page, near-black text, muted secondary text, and white surfaces with a soft shadow and rounded corners. No heavy borders, no dashboard, no purple gradient, and no copied logo, name, or brand mark.

The UI face is Inter, a clean grotesk, bundled with the app. Clause identifiers and line numbers stay in IBM Plex Mono. The heading is large and quiet, with a comfortable line height.

English is the default. Portuguese is the same layout, switched from the EN / PT control.

## Source boundary

One quiet line under the checks, in the active language:

- English: Standards library on Google Drive. This review uses the project cards.
- Portuguese: Biblioteca de normas no Google Drive. Esta revisão usa os cartões do projeto.

There is no Drive browser and no library URL. The review reads `web/src/data/baseline.json` and the opened clause cards in `web/src/data/clauses.json`.

## First screen

Before Run review is pressed, the column holds the header and one white sheet.

The header is “Second Reader”, muted “Lumen-1”, and EN / PT. EN is pressed.

The sheet holds a short introduction, the heading “The baseline is ready.”, the sentence that Lumen-1 is loaded and that Run review reads that file and the opened clause cards, a black **Run review** button, and one calm line:

Verification, contamination, launch qualification, and failure analysis.

No clause numbers appear on this screen. There is no baseline table and no finding card yet.

## Color

| Role | Hex | Use |
| --- | --- | --- |
| Page | `#f3efe8` | Warm off-white field |
| Surface | `#fffcf8` | The intro sheet, messages, and agreed cards |
| Ink | `#161513` | Text and the Run review button |
| Muted | `#6f685f` | Lumen-1, the introduction, the checks line |
| Faint | `#8a837a` | The source line and field labels |
| Agree | `#2f5b4c` on `#e6f0eb` | The Agreed pill |
| Open | `#7a4e2c` on `#f4e7d8` | The Open pill |
| Open surface | `#fbf6ef` | The FMEA card |

## The run

Run review is real code. It reads the loaded baseline and only the opened clause cards, then applies the checks. The sentences on screen are the project lines and clause identifiers those checks return. The reveal only paces results that are already computed. No model and no network. The result stays three agreed findings and one open FMEA dispute.

Each step is a short white message in the same column, in order. Every message is labeled Second Reader.

The opened cards named in the run are ECSS-E-ST-10C Rev.1, ECSS-E-ST-10-02C Rev.1, ECSS-E-ST-10-03C Rev.1, ECSS-Q-ST-30C Rev.1, and ECSS-Q-ST-70C Rev.2. The rideshare guide is not cited. No section and no load number appear.

## Findings

The four findings arrive under the messages as soft cards. Status is a small pill: Agreed or Open. The clause, the project line, and the recommended change are the readable lines. The reason and the agreement note sit quieter underneath.

The open card is the FMEA dispute. Its surface is a warmer white, and the pill says Open. It stays calm. The dispute is unchanged: ECSS-Q-ST-30C Rev.1, 6.4.2.2a requires the analysis and does not require a second camera.

## Language

Labels and card fields exist in English and Portuguese (Portugal). The control is EN / PT, with `aria-pressed`, and it sets `lang` on the document. The baseline lines stay in English. Do not mix the two languages on one screen. Do not use flags.

## Motion

Messages and cards rise a few pixels when they appear. If the visitor prefers reduced motion, the waits and the rise drop out.

## Leave out

No dashboard tables. No dense clause dump above the fold. No clause numbers before Run review. No second product name. No copied logo. No magnetometer or other payload. No Drive file list. No library URL. No model call. No verbatim ECSS prose. The rideshare guide stays uncited.
