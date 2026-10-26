# Red-team challenge

Third pass, 26 Oct 2026. Bound to the Lumen-1 finding register after the baseline opened `Files_ECSS.zip` on Drive. The register commits no PDFs. This file was checked against `origin/main` at `cde8015` for the standards already there. Clause identifiers below are the ones on the finding cards. Standard text is not copied here.

The product is the Lumen-1 6U CubeSat camera on a Falcon 9 rideshare. A file the cards did not open stays **waiting on upload**. That is not out of scope. No clause is invented for ECSS-Q-ST-70-01, ECSS-Q-ST-70-02, ECSS-Q-ST-30-02, or the rideshare guide.

Pyrotechnics, explosives, and propulsion stay unread. These files are on `main` and were not opened and not cited: `ECSS-E-30part6A25April2000.pdf`, `ECSS-E-33-11A17April2008.pdf`, `ECSS-E-30part5.1A2April2002.pdf`.

| ID | Planted issue | Verdict | Clause |
| --- | --- | --- | --- |
| F-01 | REQ-IMG-03 has no verification method | Agree | ECSS-E-ST-10-02C Rev.1, 5.2.1e. Supporting: 5.2.2.1a; ECSS-E-ST-10C Rev.1, 5.2.3.4a |
| F-02 | No contamination or outgassing control on the optic | Agree | ECSS-Q-ST-70C Rev.2, 4.4a. Supporting: 4.4c; 5.1.4b; 5.1.4c |
| F-03 | No qualification against rideshare launch loads | Agree | ECSS-E-ST-10-03C Rev.1, 4.5.2a. Supporting: 4.5.1b; 5.1b; 5.2a with Table 5-1 columns a and i; 5.5.2.3; 5.5.2.5; 5.5.2.6. Launch guide: waiting on upload. Not in the zip |
| F-04 | Single-string camera, reliability asserted, no FMEA | Dispute | ECSS-Q-ST-30C Rev.1, 6.4.2.2a. Supporting: 6.4.2.2b |

## F-01 — Requirement with no verification method — Agree

Card status on the finding: ready. Evidence: `demo-baseline.md`, REQ-IMG-03.

REQ-IMG-03 sets an on-orbit modulation transfer function of at least 0.15 at Nyquist. The verification matrix leaves method, level, and stage empty.

ECSS-E-ST-10-02C Rev.1 is on `main` (`ECSS-E-ST-10-02C-Rev.1(1February2018).pdf`). Clause 5.2.1e requires, for each requirement to be verified, a strategy in the first issue of the verification matrix: the methods, the levels, and the stages, for customer approval. Clause 5.2.2.1a allows only test, analysis, review of design, or inspection, alone or combined. REQ-IMG-03 uses none of them. An empty row is not a strategy, so the requirement cannot be closed.

ECSS-E-ST-10C Rev.1 was opened from the zip (`Files_PDF/ECSS-E-ST-10C-Rev.1(15February2017).pdf`). Clause 5.2.3.4a says the same thing from the system-engineering side: each requirement in the technical specification has a verification method. Clause 5.2.3.4b puts that method in the matrix. The row has neither.

Agree. The identifiers are the ones on the card.

## F-02 — No contamination or outgassing control on the optic — Agree

Card status on the finding: ready. Evidence: `demo-baseline.md`, "Materials and the optic".

Opened from the zip: `Files_PDF/ECSS-Q-ST-70C-Rev.2(15October2019).pdf`.

The lens, the silicone stake, the anodized baffle, and the coated filter sit in view of the detector. The baseline has no cleanliness level, no contamination budget, no bake-out, no witness sample, and no outgassing screen. Integration is "assemble on a clean bench".

ECSS-Q-ST-70C Rev.2, clause 4.4a, requires a contamination and cleanliness control programme. The minimum is cleaning procedures and a way to monitor cleanliness. The baseline has neither. Clause 4.4c applies because this optic is contamination-critical: it asks for a chemical and particle requirement specification and a cleanliness control plan. The detailed plan rules are in ECSS-Q-ST-70-01, which the card did not open, so this review does not invent them. Clause 5.1.4b requires outgassing screening of the materials. Clause 5.1.4c requires every organic material to be evaluated for outgassing. The silicone stake is organic and has no evaluation. The screening method is in ECSS-Q-ST-70-02, which the card did not open, so no acceptance percentages are stated.

Agree. Both auditors agree this is critical at PDR. The change on the card is the one to carry: add the cleanliness programme and an outgassing evaluation of every material in view of the detector, including the silicone, and give that requirement a verification method. Write the detailed plan and the screening limits only when ECSS-Q-ST-70-01 and ECSS-Q-ST-70-02 are opened.

## F-03 — No qualification against rideshare launch loads — Agree

Card status on the finding: ready. Evidence: `demo-baseline.md`, REQ-MEC-01 and "Test campaign at PDR".

REQ-MEC-01 says the camera survives the Falcon 9 rideshare mechanical environment and keeps optical alignment. The matrix says test, equipment, qualification. The campaign then marks random vibration, sine, shock, static load, and acoustic as not applicable, because the dispenser vendor covers launch. No qualification model and no protoflight model are named.

ECSS-E-ST-10-03C Rev.1 is on `main` (`ECSS-E-ST-10-03-Rev.1(31May2022).pdf`). The cover carries the letter C; the filename omits it.

- **4.5.2a** requires qualification evidence that the item meets its specification in the intended environments, with the qualification margins. That evidence is not in the baseline. The next requirement, **4.5.2b**, is the one that places the test on a dedicated qualification model unless the project uses protoflight. The finding's prose folds that model rule into 4.5.2a. The red team still agrees: neither the evidence nor the model is there.
- **4.5.1b** puts launch-segment compatibility into the test programme of a space-segment element. The equipment obligation for this camera is the pair below.
- **5.1b** applies every required test of each type the unit fits. The standard's own example is a unit that is both electronic and optical. A camera with a detector and a controller fits type a and type i.
- **5.2a** sets the qualification baseline as Table 5-1, read with 5.1b. In that table, sinusoidal vibration (5.5.2.5) and shock (5.5.2.6) are required for both type a and type i. Random vibration (5.5.2.3) is required for type a and is a customer decision for type i, so the electronic type makes random required. The campaign plans none of the three.

The SpaceX Rideshare Payload User's Guide is the environment those tests are aimed at. The Drive zip was listed by name and the guide is not in it, and it is not on `main`. The card leaves the guide waiting on upload. This review does not name a guide section or a load factor. Both auditors still agree on the testing clause that is open: the campaign has no qualification model, no protoflight model, and no launch-load test, so 4.5.2a has no evidence.

Agree on ECSS-E-ST-10-03C Rev.1, 4.5.2a. The change on the card is a qualification or protoflight campaign for a flight-representative camera against the rideshare mechanical environment, including the sine, random, and shock tests Table 5-1 requires for an electronic optical unit, unless a written customer tailoring narrows that list. Delete the line that the dispenser vendor covers the camera. Environment levels wait until the guide can be opened.

## F-04 — Single-string camera, reliability asserted, no FMEA — Dispute

This item stays in dispute. It is not agreed, not downgraded, and not escalated.

Card status on the finding: ready, and the auditors do not agree. Evidence: `demo-baseline.md`, REQ-REL-01 and "Reliability claim".

Opened from the zip: `Files_PDF/ECSS-Q-ST-30C-Rev.1(15February2017).pdf`.

What both auditors see: one detector, one controller, one power feed, and REQ-REL-01 stating 0.95 over two years. The only evidence offered is that the detector is commercial and that cameras of this class have flown. There is no failure-modes analysis. The single string is recorded as a mass saving.

ECSS-Q-ST-30C Rev.1, clause 6.4.2.2a, requires an FMEA, or a FMECA when criticality is included. The worksheet rules are in ECSS-Q-ST-30-02, which the card did not open, so this review does not invent them. Clause 6.4.2.2b is the part both auditors use: the analysis names the potential failure modes and classes them by severity, or by criticality if a FMECA is used. The heritage sentence does not do that.

The clause requires that analysis. It does not require a second camera. A science camera on a rideshare CubeSat can stay one string if the analysis records that architecture and the accepted consequences.

Auditor A treats the gap as critical. The 0.95 figure is a claim the project has not earned. On this single string, a failure of the detector, the controller, or the power feed ends the imaging mission, and the file never lists those modes. Auditor A's change is to remove 0.95, or to replace the sentence with an FMEA of the camera chain that names those modes and what would make each consequence acceptable.

Auditor B accepts that 6.4.2.2a asks for the analysis, and that the heritage sentence is not one. Auditor B does not accept "single-string" as the non-conformance. Bundling "no redundancy" into the same critical finding overclaims the clause.

The red team holds that bundle in dispute. The human decides.

## Left closed

ECSS-Q-ST-70-01, ECSS-Q-ST-70-02, and ECSS-Q-ST-30-02 are named by the parent clauses and were not opened. The rideshare guide is not in the zip. No clause, section, load factor, plan rule, or acceptance percentage is taken from those files.
