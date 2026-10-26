# ECSS applicability index — Lumen-1 demo slice

Applicability index for the hackathon demo. The source system is the synthetic project in `demo-baseline.md`. The finding register is `findings.md`. This file is the standards slice only.

Frozen against `origin/main` at `cde8015` (26 Oct 2026), after a pull. That tree holds 65 PDFs. The locked decisions put the full library of 317 files on Google Drive, not in Git. The Drive link is not recorded in `docs/decisions.md` yet. This branch commits no PDFs. This index is the demo slice only, not a catalogue of the 65 and not an index of the 317.

Until that link is in the decisions file, a card is written only from a PDF opened on `main`. Every other slice file is **waiting on upload**. When the link is recorded, those waiting files are read from Drive. A file that cannot be opened stays waiting. No clause is invented for it.

Explanations below are original. They are not quotations of the standards.

## Upload delta

The files on `main` do not describe a mission. They are standards. The instrument stays a CubeSat optical payload (a camera) on a Falcon 9 rideshare. It was not switched to a magnetometer. The remaining library, when the Drive link is recorded, does not get indexed here. Pyrotechnics, explosives, and propulsion stay out even if they are on that Drive.

Present on `main` and kept out of this index:

- Pyrotechnics: `ECSS-E-30part6A25April2000.pdf`
- Explosives: `ECSS-E-33-11A17April2008.pdf`
- Propulsion: `ECSS-E-30part5.1A2April2002.pdf`
- The rest of the partial library outside the slice (communications, control, ground systems, mechanisms, and older duplicates of standards the slice does name)

`ECSS-E-10A` (19 April 1996), `ECSS-E-10 Part 1B` (18 November 2004), and `ECSS-E-ST-10-06C` (6 March 2009) are on `main`. They are not used as stand-ins for `ECSS-E-ST-10`. The older A issues of verification (`ECSS-E-10-02A`, `ECSS-E-ST-10-02C` of 6 March 2009) and of testing (`ECSS-E-10-03A`) are on `main` and are not the issues cited below.

## Cards in the slice

| Card | Document | Clause used | Status |
| --- | --- | --- | --- |
| Slice, no planted finding | ECSS-E-ST-10 | — | waiting on upload |
| F-01 | ECSS-E-ST-10-02C Rev.1 (1 February 2018) | 5.2.1e | ready |
| F-02 | ECSS-Q-ST-70 | — | waiting on upload |
| F-03 | ECSS-E-ST-10-03C Rev.1 (31 May 2022) | 4.5.2a | ready |
| F-04 | ECSS-Q-ST-30 | — | waiting on upload |
| Launch constraint for F-03 | SpaceX Rideshare Payload User's Guide | — | waiting on upload |

## ECSS-E-ST-10 — system engineering

**waiting on upload**

The slice uses this standard so that requirements are traceable. No file titled `ECSS-E-ST-10` is on `main` at `cde8015`, and the Drive link is not in the decisions file. No clause identifier is stated.

## ECSS-E-ST-10-02C Rev.1 — verification

**ready**

- File on `main`: `ECSS-E-ST-10-02C-Rev.1(1February2018).pdf`
- Cover read: ECSS-E-ST-10-02C Rev.1, 1 February 2018, Space engineering — Verification

The standard is how a project shows that a deliverable meets the requirements it was given. Planning ends in a verification control document. The first issue of that document is the verification matrix.

**5.2.1e.** Every requirement that is in the verification set needs a strategy written in that matrix: which methods, at which product level, and at which stage. The customer approves that first issue. A requirement whose matrix row has no method has no strategy.

**5.2.2.1a.** A method is one or more of these four: test (including demonstration), analysis (including similarity), review of design, and inspection. Those are the only entries that close a matrix cell.

**5.2.4.2a.** The qualification stage is where the supplier shows that the design, margins included, meets the requirements. It is done on hardware and software that represent the flight item. This clause supports F-03; F-01 itself is the empty matrix cell.

## ECSS-Q-ST-30 — dependability

**waiting on upload**

The slice uses this standard so that failures are analyzed rather than asserted. No `ECSS-Q-ST-30` file, and no other Q-branch file, is on `main` at `cde8015`. The Drive link is not in the decisions file. No clause identifier is stated. F-04 stays open until the file can be opened.

## ECSS-Q-ST-70 — materials, contamination, and outgassing

**waiting on upload**

The slice uses this standard because the payload is optical. No `ECSS-Q-ST-70` file is on `main` at `cde8015`. The Drive link is not in the decisions file. No clause identifier is stated. `ECSS-E-30 Part 8A` (mechanical materials, 25 April 2000) is on `main` and is not used as a substitute. F-02 records the project gap and waits for the clause.

## ECSS-E-ST-10-03C Rev.1 — testing

**ready**

- File on `main`: `ECSS-E-ST-10-03-Rev.1(31May2022).pdf`
- Cover read: ECSS-E-ST-10-03C Rev.1, 31 May 2022, Space engineering — Testing. The filename omits the letter C; the cover carries it.

The standard says how qualification, acceptance, and protoflight tests are built for space equipment and for larger space-segment elements. Levels and durations live in its tables. The Falcon 9 rideshare environment those tests have to cover is the user's guide. That guide is not on `main`, so its sections are not cited below.

**4.5.1b.** When the test programme of a space-segment element is written, tests that show compatibility with the launch segment are part of that programme.

**4.5.2a.** Qualification testing is the evidence that the equipment or element meets its specification in the environments it is intended to see, with the qualification margins. It is run on a dedicated qualification model, unless the project is using a protoflight approach. The verification report from that test is what later closes the matrix.

**5.1a and 5.1b.** The equipment test baseline is tailored to the equipment type. A unit that fits more than one type takes the required tests of each type. The standard's own example is a star sensor, which is both electronic and optical.

**5.2a and Table 5-1.** The qualification baseline for equipment is that table, read with 5.1b. Types are listed at the foot of the table: type **a** is electronic, electrical, and RF equipment; type **i** is optical equipment. In the qualification table, sinusoidal vibration and shock are required for both of those types. Random vibration is required for type a, and is a customer decision for type i. A camera with a detector and a controller fits both types, so the required column of each type applies. Implementation of those mechanical tests is under 5.5.2 (random 5.5.2.3, sinusoidal 5.5.2.5, shock 5.5.2.6).

Table 5-1 uses three marks: R required, X decided by the customer, dash not required. The sentences above are the reading of columns a and i for the three launch-load tests. The table itself is not copied here.

## SpaceX Rideshare Payload User's Guide

**waiting on upload**

Launch-side constraint for this slice, next to the testing clauses above. It is not on `main` at `cde8015`, and the Google Drive link is not in the decisions file. No section identifier and no load factor is stated. Lumen-1's own interface note still claims the dispenser covers launch loads. That claim is project text, not a reading of the guide.
