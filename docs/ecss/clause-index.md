# ECSS applicability index — Lumen-1 demo slice

Applicability index for the hackathon demo. The source system is the synthetic project in `demo-baseline.md`. The finding register is `findings.md`. This file is the standards slice only.

Frozen against `origin/main` at `cde8015` (26 Oct 2026), after a pull. That tree holds 65 PDFs. The locked decisions say the regulation library is 317 files and is still arriving. This index is not a catalogue of the 65, and it is not limited to the first 24.

Explanations below are original. They are not quotations of the standards. Clause identifiers for a file on `main` were read from that PDF. Where the named file is not on `main`, the card says **waiting on upload** and gives no clause identifier and no clause text.

## Upload delta

The uploads do not describe a mission. They are standards. The instrument stays a CubeSat optical payload (a camera) on a Falcon 9 rideshare. It was not switched to a magnetometer.

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
| Launch constraint for F-03 | SpaceX Rideshare Payload User's Guide, Version 10 (September 2024) | sections 4.1.2.1 and 6.6 | public summary |

## ECSS-E-ST-10 — system engineering

**waiting on upload**

The slice uses this standard so that requirements are traceable. No file titled `ECSS-E-ST-10` is on `main` at `cde8015`. No clause identifier is stated.

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

The slice uses this standard so that failures are analyzed rather than asserted. No `ECSS-Q-ST-30` file, and no other Q-branch file, is on `main` at `cde8015`. No clause identifier is stated. F-04 stays open until the file arrives.

## ECSS-Q-ST-70 — materials, contamination, and outgassing

**waiting on upload**

The slice uses this standard because the payload is optical. No `ECSS-Q-ST-70` file is on `main` at `cde8015`. No clause identifier is stated. `ECSS-E-30 Part 8A` (mechanical materials, 25 April 2000) is on `main` and is not used as a substitute. F-02 records the project gap and waits for the clause.

## ECSS-E-ST-10-03C Rev.1 — testing

**ready**

- File on `main`: `ECSS-E-ST-10-03-Rev.1(31May2022).pdf`
- Cover read: ECSS-E-ST-10-03C Rev.1, 31 May 2022, Space engineering — Testing. The filename omits the letter C; the cover carries it.

The standard says how qualification, acceptance, and protoflight tests are built for space equipment and for larger space-segment elements. Levels and durations live in its tables. The mechanical environment those tests have to cover, for this demo, is the rideshare guide summarized below, not a launch spectrum copied out of the standard.

**4.5.1b.** When the test programme of a space-segment element is written, tests that show compatibility with the launch segment are part of that programme.

**4.5.2a.** Qualification testing is the evidence that the equipment or element meets its specification in the environments it is intended to see, with the qualification margins. It is run on a dedicated qualification model, unless the project is using a protoflight approach. The verification report from that test is what later closes the matrix.

**5.1a and 5.1b.** The equipment test baseline is tailored to the equipment type. A unit that fits more than one type takes the required tests of each type. The standard's own example is a star sensor, which is both electronic and optical.

**5.2a and Table 5-1.** The qualification baseline for equipment is that table, read with 5.1b. Types are listed at the foot of the table: type **a** is electronic, electrical, and RF equipment; type **i** is optical equipment. In the qualification table, sinusoidal vibration and shock are required for both of those types. Random vibration is required for type a, and is a customer decision for type i. A camera with a detector and a controller fits both types, so the required column of each type applies. Implementation of those mechanical tests is under 5.5.2 (random 5.5.2.3, sinusoidal 5.5.2.5, shock 5.5.2.6).

Table 5-1 uses three marks: R required, X decided by the customer, dash not required. The sentences above are the reading of columns a and i for the three launch-load tests. The table itself is not copied here.

## SpaceX Rideshare Payload User's Guide

Public launch constraint, named in the locked decisions. It is not an ECSS file and it is not part of the 317-file upload. Issue used: **Version 10, September 2024**. This is a summary, not an extract.

The guide's flight environments are maximum predicted environments for a rideshare-plate mission. Integrated flight hardware is tested so that the primary mission and the co-payloads stay safe. The verification section of the guide is section 6.

For a CubeSat dispenser loaded with CubeSats, section 4.1.2.1 gives combined design load factors of **10 g axial** and **17 g lateral** (root-sum-square of the two lateral axes), when the CubeSats meet the guide's frequency rule and the loaded dispenser mass is at least 20 kg. Those factors describe the dispenser including the CubeSats. They are the environment the dispenser is designed to, not a component load to paste onto the camera.

A fully containerized CubeSat may be tested as a constituent rather than only inside the integrated payload. Section 6.6 is that unit test. At that level the guide **requires random vibration**. Quasi-static load, sine vibration, and acoustic tests are not required on the CubeSat itself. Shock is advised. The random-vibration maximum predicted environment is section 4.1.6. The guide prefers a protoflight qualification approach. Durations and margins stay in the guide's table; they are not reproduced here.

If the dispenser is not fully containerized under the guide's hole rule, the CubeSat leaves section 6.6 and is tested at the integrated-payload levels. Lumen-1's baseline claims the fully containerized case and then performs none of the tests.
