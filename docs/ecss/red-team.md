# Red-team challenge

Second pass, 26 Oct 2026. Bound to the Lumen-1 finding register in the project store and on [PR #3](https://github.com/joaojesvs/SpaceX_Digital_Transformation_Lab/pull/3) (`docs/ecss/findings.md`, `docs/ecss/clause-index.md`, `docs/ecss/demo-baseline.md`). Those three files match. This file was checked against `origin/main` at `cde8015`.

The product is the Lumen-1 6U CubeSat camera on a Falcon 9 rideshare. The 317-file library goes to Google Drive, not into Git. The Drive link is not in `docs/decisions.md`. A file that cannot be opened is **waiting on upload**. That is not out of scope. No clause is invented for a card marked waiting on upload.

Pyrotechnics, explosives, and propulsion stay out. These files are on `main` and were not opened and not cited: `ECSS-E-30part6A25April2000.pdf`, `ECSS-E-33-11A17April2008.pdf`, `ECSS-E-30part5.1A2April2002.pdf`.

Clause identifiers below are the ones on the finding cards. For F-01 and F-03 the identifiers were confirmed in the PDFs on `main`. The standard text is not copied here.

| ID | Planted issue | Verdict | Clause |
| --- | --- | --- | --- |
| F-01 | REQ-IMG-03 has no verification method | Agree | ECSS-E-ST-10-02C Rev.1, 5.2.1e. Supporting: 5.2.2.1a |
| F-02 | No contamination or outgassing control on the optic | Agree | waiting on upload. Expected document: ECSS-Q-ST-70. No clause invented |
| F-03 | No qualification against rideshare launch loads | Agree | ECSS-E-ST-10-03C Rev.1, 4.5.2a. Supporting: 4.5.1b; 5.1b; 5.2a with Table 5-1 columns a and i; 5.5.2.3; 5.5.2.5; 5.5.2.6. Launch: Rideshare Payload User's Guide, Version 10 (September 2024), sections 4.1.2.1, 4.1.6, and 6.6 |
| F-04 | Single-string camera, reliability asserted, no FMEA | Dispute | waiting on upload. Expected document: ECSS-Q-ST-30. No clause invented |

## F-01 — Requirement with no verification method — Agree

Card status on the finding: ready. Evidence: `demo-baseline.md`, REQ-IMG-03.

REQ-IMG-03 sets an on-orbit modulation transfer function of at least 0.15 at Nyquist. The verification matrix leaves method, level, and stage empty.

ECSS-E-ST-10-02C Rev.1 is on `main` (`ECSS-E-ST-10-02C-Rev.1(1February2018).pdf`). Clause 5.2.1e requires, for each requirement to be verified, a strategy in the first issue of the verification matrix: the methods, the levels, and the stages, for customer approval. Clause 5.2.2.1a allows only test, analysis, review of design, or inspection, alone or combined. REQ-IMG-03 uses none of them. An empty row is not a strategy, so the requirement cannot be closed.

Agree. Both identifiers are in that file. The card is not waiting on upload.

## F-02 — No contamination or outgassing control on the optic — Agree

Card status on the finding: waiting on upload. Clause on the card: waiting on upload. Expected document: ECSS-Q-ST-70. Evidence: `demo-baseline.md`, "Materials and the optic".

The lens, the silicone stake, the anodized baffle, and the coated filter sit in view of the detector. The baseline has no cleanliness level, no contamination budget, no bake-out, no witness sample, and no outgassing screen. Integration is "assemble on a clean bench". Both auditors agree that gap is real and critical at PDR. The red team agrees.

The finding cannot be accepted until ECSS-Q-ST-70 can be opened. The file is not on `main`, and the Drive link is not in the decision log. No clause identifier is stated here. `ECSS-E-30 Part 8A` is not used as a substitute. The pyrotechnic, explosive, and propulsion files are not used either. Waiting on upload leaves the standard in the slice.

## F-03 — No qualification against rideshare launch loads — Agree

Card status on the finding: ready. Evidence: `demo-baseline.md`, REQ-MEC-01 and "Test campaign at PDR".

REQ-MEC-01 says the camera survives the Falcon 9 rideshare mechanical environment and keeps optical alignment. The matrix says test, equipment, qualification. The campaign then marks random vibration, sine, shock, static load, and acoustic as not applicable, because the dispenser vendor covers launch. No qualification model and no protoflight model are named.

ECSS-E-ST-10-03C Rev.1 is on `main` (`ECSS-E-ST-10-03-Rev.1(31May2022).pdf`). The cover carries the letter C; the filename omits it.

- **4.5.2a** requires qualification evidence that the item meets its specification in the intended environments, with the qualification margins. That evidence is not in the baseline. The next requirement, **4.5.2b**, is the one that places the test on a dedicated qualification model unless the project uses protoflight. The finding's prose folds that model rule into 4.5.2a. The red team still agrees: neither the evidence nor the model is there.
- **4.5.1b** puts launch-segment compatibility into the test programme of a space-segment element. The equipment obligation for this camera is the pair below.
- **5.1b** applies every required test of each type the unit fits. The standard's own example is a unit that is both electronic and optical. A camera with a detector and a controller fits type a and type i.
- **5.2a** sets the qualification baseline as Table 5-1, read with 5.1b. In that table, sinusoidal vibration (5.5.2.5) and shock (5.5.2.6) are required for both type a and type i. Random vibration (5.5.2.3) is required for type a and is a customer decision for type i, so the electronic type makes random required. The campaign plans none of the three.

The launch constraint is the public SpaceX Rideshare Payload User's Guide, Version 10 (September 2024), sections 4.1.2.1, 4.1.6, and 6.6, as named on the card. It is a public summary, not one of the 317 files, and the card does not mark it waiting on upload. Under the fully containerized claim, section 6.6 still requires a random-vibration test of the CubeSat. Section 4.1.6 is that environment. Section 4.1.2.1 is the dispenser load, not a number to copy onto the lens barrel. The guide does not require sine at CubeSat level in that containerized case, while Table 5-1 does, unless the customer tailors it. The project has done neither the random test the guide requires nor the qualification 4.5.2a describes.

Agree. The proposed change on the card is the one an engineer can carry out: a qualification or protoflight random-vibration test of a flight-representative camera, three axes, against the guide's random environment and the section 6.6 margin; sine and shock as Table 5-1 requires, or a written customer tailoring; delete the line that the dispenser vendor covers the camera.

## F-04 — Single-string camera, reliability asserted, no FMEA — Dispute

This item stays in dispute. It is not agreed, not downgraded, and not escalated.

Card status on the finding: waiting on upload. Clause on the card: waiting on upload. Expected document: ECSS-Q-ST-30. Evidence: `demo-baseline.md`, REQ-REL-01 and "Reliability claim".

What the file shows, and what both auditors already see: one detector, one controller, one power feed, and REQ-REL-01 stating 0.95 over two years. The only evidence offered is that the detector is commercial and that cameras of this class have flown. There is no failure-modes analysis. The single string is recorded as a mass saving.

The finding cannot be accepted until ECSS-Q-ST-30 can be opened. The file is not on `main`, and the Drive link is not in the decision log. No clause identifier is invented. Waiting on upload is an acceptance hold. It leaves dependability in the slice, and it is not the dispute.

The dispute is the bundled claim.

A single-string science camera can be a chosen architecture. Dependability work has to analyse the failure and has to show the reliability requirement or record the accepted risk. A second camera is not the rule. Scoring "no redundancy" as a critical non-conformance overclaims a standard this review has not opened.

REQ-REL-01 states 0.95, and the draft closes it with a heritage sentence. A number in a requirement is a claim the project has to earn. That claim is a different gap from the choice to fly one string. Dropping the whole item would let the number through. Holding it as one critical finding would treat the architecture itself as the violation.

When ECSS-Q-ST-30 can be opened, the baseline has to split the two claims and name a clause read from that file. Agreement is then available for the unsupported 0.95. Agreement is not available for "single-string, therefore non-compliant" on its own. Until that split is written against an opened file, the red team holds F-04 open. The human decides.

## What this pass did not reopen

ECSS-E-ST-10, the parent system-engineering standard, is waiting on upload. No `ECSS-E-ST-10` file is on `main`. No clause is stated for it. F-01 does not depend on it. The older ECSS-E-10A, ECSS-E-10 Part 1B, and ECSS-E-ST-10-06C files are not used as stand-ins.
