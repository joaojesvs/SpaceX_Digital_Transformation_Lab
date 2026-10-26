# Red-team challenge

Reviewed 26 Oct 2026 against `origin/main` at `cde8015`. The product stays the CubeSat optical payload (camera) on a Falcon 9 rideshare. The four planted issues are the ones in the locked decisions. Colleague uploads were left in place.

`docs/ecss/findings.md` was not on `main` and not in the project store. This challenge is written against the four issues in the decision log. **Clause identifiers are not bound.** Reconcile every identifier in the baseline onto this file when `docs/ecss/findings.md` lands. A document name below is not a clause identifier.

The regulation library is 317 files and is still arriving in parts. This batch is `README.md` plus 65 engineering PDFs. It does not describe a different mission. A missing PDF does not take a slice standard out of scope. Where the decision log marks a card “waiting on upload”, the finding cannot be accepted until that file is in the repo, and no clause is invented from a file the repo does not hold.

Pyrotechnics, explosives, and propulsion are out of this review. Those files are already on `main` and were not opened and not cited: `ECSS-E-30part6A25April2000.pdf`, `ECSS-E-33-11A17April2008.pdf`, `ECSS-E-30part5.1A2April2002.pdf`.

## What this batch can support

On `main`, and in the slice:

- `ECSS-E-ST-10-02C-Rev.1(1February2018).pdf` — ECSS-E-ST-10-02C Rev.1, 1 February 2018, Verification. The 6 March 2009 issue of the same standard is also on `main`. Cite Rev.1. The 17 November 1998 issue (`ECSS-E-10-02A`) is an older document and is not the citation.
- `ECSS-E-ST-10-03-Rev.1(31May2022).pdf` — ECSS-E-ST-10-03C Rev.1, 31 May 2022, Testing.

In the slice, not on `main` at `cde8015`. The decision log marks these cards “waiting on upload”. They stay in scope:

- ECSS-Q-ST-70, materials, contamination, and outgassing
- ECSS-Q-ST-30, dependability
- The SpaceX Rideshare Payload User’s Guide

The parent system-engineering standard ECSS-E-ST-10 is also not in this batch. The tree has numbered E-ST-10 parts and the superseded ECSS-E-10A and ECSS-E-10 Part 1B. Those older files are not cited as ECSS-E-ST-10. Issue 1 does not wait on the parent: the verification-method rule is in ECSS-E-ST-10-02C Rev.1, which is on `main`.

No project requirements list, verification matrix, materials list, or test plan was in the upload. The four issues are the scripted baseline.

| # | Planted issue | Verdict | Acceptance |
| --- | --- | --- | --- |
| 1 | Requirement with no verification method | Agree | File is on `main`. Bind the clause when the baseline names it. |
| 2 | No contamination or outgassing control on the optic | Agree | Cannot be accepted until ECSS-Q-ST-70 is in the repo. |
| 3 | No qualification against rideshare launch loads | Agree | Cannot be accepted until the Rideshare Payload User’s Guide is in the repo. |
| 4 | Single-string camera, reliability asserted, no FMEA | Dispute | Cannot be accepted until ECSS-Q-ST-30 is in the repo. The dispute stays after that file arrives. |

## 1. Requirement with no verification method — Agree

ECSS-E-ST-10-02C Rev.1 is on `main`. A requirement that carries no verification method cannot be shown to be verified. That is the verification slice. The upload contains no project matrix that already assigns a method to this requirement.

Agree. The finding can be accepted once the baseline names the clause in the file the repo holds. This review does not supply that clause number. If a baseline card marks ECSS-E-ST-10-02C Rev.1 as “waiting on upload”, that mark does not match `main`.

## 2. No contamination or outgassing control on the optic — Agree

The optic has no contamination control and no outgassing control. ECSS-Q-ST-70 is the slice standard for materials, contamination, and outgassing on an optical payload. The standard stays in scope.

The file is not on `main` at `cde8015`. The decision log marks that card “waiting on upload”. The finding cannot be accepted until ECSS-Q-ST-70 is in the repo. No clause is cited. Nothing in this batch shows the optic already under that control. The pyrotechnic, explosive, and propulsion files were not used to fill the gap.

## 3. No qualification against rideshare launch loads — Agree

ECSS-E-ST-10-03C Rev.1 is on `main`. It is the testing standard for this slice, aimed at the Falcon 9 rideshare mechanical environment. A camera with no qualification against that environment, and no declared protoflight in its place, is outside the testing slice. The clause inside ECSS-E-ST-10-03C Rev.1 is not invented here. Bind it from the baseline. A “waiting on upload” mark on this testing standard would not match `main`.

The loads come from the public SpaceX Rideshare Payload User’s Guide. In short, that guide requires the payload to be tested in its integrated flight configuration against the published flight environment. The mechanical cases in that environment are quasi-static loads, sine vibration, acoustic loading, and shock. Levels and spectra stay in the guide.

The guide is not on `main`. The decision log marks that card “waiting on upload”. The finding cannot be accepted until the SpaceX Rideshare Payload User’s Guide is in the repo. ECSS-E-ST-10-03C Rev.1 does not replace the guide, and the missing file does not take the launch constraint out of scope.

## 4. Single-string camera, reliability asserted, no FMEA — Dispute

This item stays in dispute. It is not agreed, not downgraded, and not escalated.

ECSS-Q-ST-30 stays in the slice. It is not on `main`. The decision log marks that card “waiting on upload”. The finding cannot be accepted until ECSS-Q-ST-30 is in the repo. The absent file is an acceptance hold. It is not the dispute, and it does not take dependability out of scope.

The dispute is the bundled claim. Two different statements are being scored as one finding.

A single-string camera is an architecture choice. Dependability work has to analyse the failure and has to show the reliability requirement or record the accepted risk. A second camera is not the rule. A CubeSat optical payload is often single-string. Scoring “no redundancy” as a critical non-conformance overclaims the standard, so the bundled finding is not agreed and not escalated.

A reliability figure with no FMEA is a separate gap. Where the project states a reliability or availability number for the camera, that number is not evidence until the failure modes and effects are analysed and the single-point failure is identified. Closing the whole item as “no finding” would let that assertion through, so the item is not downgraded.

When ECSS-Q-ST-30 is on `main`, the baseline has to split the two claims and name a clause from that file. Agreement is then available for “reliability asserted, no FMEA”. Agreement is not available for “single-string, therefore non-compliant” on its own. Until that split is written, the red team holds the item open.

## Reconciliation

`docs/ecss/findings.md` was absent at `cde8015` and absent from the project store. Clause identifiers in the baseline have to be reconciled onto this challenge. A card marked “waiting on upload” keeps its finding unaccepted until that file is on `main`. A later baseline clause that points at a file already on `main` should be bound here by the red-team owner.
