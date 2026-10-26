# ECSS applicability index — Lumen-1 demo slice

Applicability index for the hackathon demo. The source system is the synthetic project in `demo-baseline.md`. The finding register is `findings.md`. This file is the standards slice only.

Read against `origin/main` at `cde8015` and against Google Drive file `1H2dbtphO6zBMIbwKF5uQ5hnqZ46MCHEo`, opened 26 Oct 2026. That file is one zip, `Files_ECSS.zip`, with 317 entries under `Files_PDF/`. This branch commits no PDFs and does not commit the zip. This index is the demo slice only.

A clause below was read from a file on `main` or from a PDF extracted from that zip. Pyrotechnics, explosives, and propulsion were not opened. The SpaceX rideshare guide is not in the zip, so that card stays **waiting on upload**.

Explanations below are original. They are not quotations of the standards.

## Upload delta

The zip is a standards library, not a mission description. The instrument stays a CubeSat optical payload (a camera) on a Falcon 9 rideshare. Three current issues were opened from the zip: `ECSS-E-ST-10C-Rev.1(15February2017).pdf`, `ECSS-Q-ST-30C-Rev.1(15February2017).pdf`, and `ECSS-Q-ST-70C-Rev.2(15October2019).pdf`. Older issues of those same titles are in the zip and were not used. The other 314 names were not indexed. Pyrotechnics, explosives, and propulsion were not opened.

Present on `main` and kept out of this index:

- Pyrotechnics: `ECSS-E-30part6A25April2000.pdf`
- Explosives: `ECSS-E-33-11A17April2008.pdf`
- Propulsion: `ECSS-E-30part5.1A2April2002.pdf`
- The rest of the partial library outside the slice (communications, control, ground systems, mechanisms, and older duplicates of standards the slice does name)

`ECSS-E-10A` (19 April 1996), `ECSS-E-10 Part 1B` (18 November 2004), and `ECSS-E-ST-10-06C` (6 March 2009) are on `main`. They are not used as stand-ins for `ECSS-E-ST-10`. The older A issues of verification (`ECSS-E-10-02A`, `ECSS-E-ST-10-02C` of 6 March 2009) and of testing (`ECSS-E-10-03A`) are on `main` and are not the issues cited below.

## Cards in the slice

| Card | Document | Clause used | Status |
| --- | --- | --- | --- |
| Slice, supports F-01 | ECSS-E-ST-10C Rev.1 (15 February 2017) | 5.2.3.4a | ready |
| F-01 | ECSS-E-ST-10-02C Rev.1 (1 February 2018) | 5.2.1e | ready |
| F-02 | ECSS-Q-ST-70C Rev.2 (15 October 2019) | 4.4a | ready |
| F-03 | ECSS-E-ST-10-03C Rev.1 (31 May 2022) | 4.5.2a | ready |
| F-04 | ECSS-Q-ST-30C Rev.1 (15 February 2017) | 6.4.2.2a | ready, in dispute |
| Launch constraint for F-03 | SpaceX Rideshare Payload User's Guide | — | waiting on upload |

## ECSS-E-ST-10C Rev.1 — system engineering

**ready**

- Opened from the zip: `Files_PDF/ECSS-E-ST-10C-Rev.1(15February2017).pdf`
- Cover read: ECSS-E-ST-10C Rev.1, 15 February 2017, Space engineering — System engineering general requirements
- The 6 March 2009 issue is also in the zip and was not opened

**5.2.2.** Every requirement is traced in both directions: to its source, to any lower-level requirement, to a design change that modifies it, and to the verification that closes it. The project keeps a requirements traceability matrix for that. Lumen-1 already gives each requirement a parent, so traceability is not one of the four planted gaps.

**5.2.3.4a.** Each requirement in the technical specification has one verification method, or a combination of them. **5.2.3.4b** puts those methods in the verification matrix. REQ-IMG-03 has neither. That is the same gap as F-01, which is also cited from the verification standard on `main`.

## ECSS-E-ST-10-02C Rev.1 — verification

**ready**

- File on `main`: `ECSS-E-ST-10-02C-Rev.1(1February2018).pdf`
- Cover read: ECSS-E-ST-10-02C Rev.1, 1 February 2018, Space engineering — Verification

The standard is how a project shows that a deliverable meets the requirements it was given. Planning ends in a verification control document. The first issue of that document is the verification matrix.

**5.2.1e.** Every requirement that is in the verification set needs a strategy written in that matrix: which methods, at which product level, and at which stage. The customer approves that first issue. A requirement whose matrix row has no method has no strategy.

**5.2.2.1a.** A method is one or more of these four: test (including demonstration), analysis (including similarity), review of design, and inspection. Those are the only entries that close a matrix cell.

**5.2.4.2a.** The qualification stage is where the supplier shows that the design, margins included, meets the requirements. It is done on hardware and software that represent the flight item. This clause supports F-03; F-01 itself is the empty matrix cell.

## ECSS-Q-ST-30C Rev.1 — dependability

**ready**

- Opened from the zip: `Files_PDF/ECSS-Q-ST-30C-Rev.1(15February2017).pdf`
- Cover read: ECSS-Q-ST-30C Rev.1, 15 February 2017, Space product assurance — Dependability
- The 6 March 2009 issue is also in the zip and was not opened. `ECSS-Q-ST-30-02` is in the zip and was not opened. The parent states the FMEA obligation and points at that document for the worksheet rules.

**6.4.2.2a.** An FMEA, or an FMECA where criticality is included, is part of the dependability work. The how-to sits in ECSS-Q-ST-30-02. **6.4.2.2b** is the content that matters here: the analysis names the potential failure modes and classes them by the severity of the consequences, or by criticality when a FMECA is used. A reliability number with no such list is an assertion. The clause does not, by itself, require a second camera. That split is why F-04 stays in dispute.

## ECSS-Q-ST-70C Rev.2 — materials, contamination, and outgassing

**ready**

- Opened from the zip: `Files_PDF/ECSS-Q-ST-70C-Rev.2(15October2019).pdf`
- Cover read: ECSS-Q-ST-70C Rev.2, 15 October 2019, Space product assurance — Materials, mechanical parts and processes
- The 2009 issue and Rev.1 (15 October 2014) are in the zip and were not opened. `ECSS-Q-ST-70-01` and `ECSS-Q-ST-70-02` are in the zip and were not opened. The parent states the obligations and names those documents for the detailed plans and the screening method. No acceptance percentages are taken from them.

**4.4a.** The supplier keeps a contamination and cleanliness control programme. The minimum content is cleaning procedures and a way to monitor cleanliness. Lumen-1 has neither. **4.4c** adds a chemical and particle requirement specification, and a cleanliness control plan, when the application is cleanliness-critical or contamination-critical. An optic whose film or particles would change the image is that case. The plan's document rules are in ECSS-Q-ST-70-01, which was not opened.

**5.1.4b.** Outgassing screening of materials follows the method in clause 5 of ECSS-Q-ST-70-02. **5.1.4c** says every organic material used on the space system is evaluated for its outgassing behaviour. The silicone stake on the lens retainers is organic, and the baseline has no evaluation.

## ECSS-E-ST-10-03C Rev.1 — testing

**ready**

- File on `main`: `ECSS-E-ST-10-03-Rev.1(31May2022).pdf`
- Cover read: ECSS-E-ST-10-03C Rev.1, 31 May 2022, Space engineering — Testing. The filename omits the letter C; the cover carries it.

The standard says how qualification, acceptance, and protoflight tests are built for space equipment and for larger space-segment elements. Levels and durations live in its tables. The Falcon 9 rideshare environment those tests have to cover is the user's guide. That guide is not among the 317 names in the zip, and it is not on `main`, so its sections are not cited below.

**4.5.1b.** When the test programme of a space-segment element is written, tests that show compatibility with the launch segment are part of that programme.

**4.5.2a.** Qualification testing is the evidence that the equipment or element meets its specification in the environments it is intended to see, with the qualification margins. It is run on a dedicated qualification model, unless the project is using a protoflight approach. The verification report from that test is what later closes the matrix.

**5.1a and 5.1b.** The equipment test baseline is tailored to the equipment type. A unit that fits more than one type takes the required tests of each type. The standard's own example is a star sensor, which is both electronic and optical.

**5.2a and Table 5-1.** The qualification baseline for equipment is that table, read with 5.1b. Types are listed at the foot of the table: type **a** is electronic, electrical, and RF equipment; type **i** is optical equipment. In the qualification table, sinusoidal vibration and shock are required for both of those types. Random vibration is required for type a, and is a customer decision for type i. A camera with a detector and a controller fits both types, so the required column of each type applies. Implementation of those mechanical tests is under 5.5.2 (random 5.5.2.3, sinusoidal 5.5.2.5, shock 5.5.2.6).

Table 5-1 uses three marks: R required, X decided by the customer, dash not required. The sentences above are the reading of columns a and i for the three launch-load tests. The table itself is not copied here.

## SpaceX Rideshare Payload User's Guide

**waiting on upload**

Launch-side constraint for this slice, next to the testing clauses above. The zip was listed by name. No rideshare guide, Falcon guide, or payload user's guide is in it. The guide is not on `main` either. No section identifier and no load factor is stated. Lumen-1's own interface note still claims the dispenser covers launch loads. That claim is project text, not a reading of the guide.
