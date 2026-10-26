# Lumen-1 engineering baseline

Synthetic project configuration for the stage demo. Not a flown mission and not a company design. The audit reads this file. It does not need a live model.

Data domains in this file: project configuration, and the rideshare constraint the project claims to meet. Clause identifiers live in `clause-index.md`. Findings live in `findings.md`.

- Project: Lumen-1
- Product: 6U CubeSat, single visible camera
- Launch: Falcon 9 rideshare, piggyback, inside a CubeSat dispenser on a rideshare plate
- Dispenser claim: fully containerized, loaded mass above 20 kg
- Orbit assumed for the image requirement: sun-synchronous, 500 km
- Review named for the demo: Preliminary Design Review (PDR)
- Language of this baseline: English

## Configuration

One string. One detector, one detector controller, one power feed, one refractive lens. No cold spare, no cross-strap, no second aperture. The lens is held by an aluminium barrel. Retainers are staked with a commercial silicone. The baffle is black-anodized aluminium. The bandpass filter is a stock coated glass element.

The project states that the dispenser vendor "covers launch loads", and that the camera is therefore not qualified for them.

## Requirements

Parent need, so the tree is traceable when `ECSS-E-ST-10` arrives:

- **MIS-01.** Image land areas in daylight from the stated orbit and return the frames to the ground.

| ID | Text | Parent | Verification method | Level | Stage |
| --- | --- | --- | --- | --- | --- |
| REQ-IMG-01 | From 500 km, the ground sample distance shall be 20 m or finer at nadir. | MIS-01 | Test | Equipment | Acceptance |
| REQ-IMG-02 | The spectral band shall be 450 nm to 700 nm. | MIS-01 | Inspection | Equipment | Qualification |
| REQ-IMG-03 | The on-orbit modulation transfer function at Nyquist shall be at least 0.15. | MIS-01 | none | none | none |
| REQ-MEC-01 | The camera shall survive the Falcon 9 rideshare mechanical environment with no permanent loss of optical alignment. | MIS-01 | Test | Equipment | Qualification |
| REQ-REL-01 | The camera reliability shall be 0.95 over a 2-year mission. | MIS-01 | Review of design | Equipment | Qualification |

REQ-IMG-03 is planted issue 1: the requirement exists, and the verification matrix has no method.

REQ-MEC-01 names a method. The test campaign below does not contain the test. That is planted issue 3, not a second empty cell.

There is no cleanliness requirement, no contamination budget, and no outgassing requirement. That absence is planted issue 2.

## Verification matrix note

The table above is the initial verification control document. REQ-IMG-03 has no method, no level, and no stage. Nothing is submitted for customer approval on that row.

## Materials and the optic

Materials in view of the detector:

- Stock glass lens, commercial catalogue part, no lot data
- Silicone stake on the retainers, commercial grade, no screening record
- Black anodized aluminium baffle
- Coated glass filter, stock part

No cleanliness level. No clean-room class for integration. No bake-out. No witness sample. No list of materials screened for outgassing. No prohibition on materials that deposit on glass. The integration procedure says "assemble on a clean bench".

## Test campaign at PDR

Planned:

- Bench functional test of the detector and controller at room temperature
- Visual inspection of the filter band edges against the drawing (closes REQ-IMG-02)
- GSD check by analysis of pixel scale and orbit altitude (the matrix row for REQ-IMG-01 says Test; the campaign has not yet named the test article)

Not planned, and marked "not applicable — dispenser vendor covers launch":

- Random vibration
- Sinusoidal vibration
- Shock
- Static load or sine burst
- Acoustic
- Modal survey, or any other check of elastic frequencies

No qualification model and no protoflight model are identified. No test levels are derived from the rideshare environment.

## Reliability claim

REQ-REL-01 is closed, in the project's draft, by this sentence in the design description:

"Reliability is 0.95 because the detector is a commercial part and cameras of this class have flown."

No failure-modes list. No worksheet. No single-point-failure record. No severity. No detection or recovery. The architecture is one string by choice, recorded as a mass saving. This is planted issue 4.

## Rideshare constraint the project is using

The project points at the public SpaceX Rideshare Payload User's Guide, Version 10 (September 2024), and then does not apply it.

What the project wrote in the interface note:

"Falcon 9 rideshare, CubeSat dispenser, fully containerized. Launch loads are the dispenser's problem. Lumen-1 has no structural qualification."

What that guide actually asks, in summary (see `clause-index.md` for the section pointers, not a copy of the tables):

- A loaded dispenser that meets the guide's conditions is designed to combined factors of 10 g axial and 17 g lateral.
- A fully containerized CubeSat still has a required random-vibration test at constituent level. Shock is advised. Quasi-static, sine, and acoustic tests are not required on the CubeSat itself under that containerized rule.

Lumen-1 records the containerized claim and schedules none of those tests.

## Planted issues, for the script

1. REQ-IMG-03 has no verification method. Both auditors agree.
2. The optic has no contamination or outgassing control. Both auditors agree.
3. There is no qualification against the rideshare launch loads. Both auditors agree.
4. The camera is single-string and its reliability is asserted with no FMEA. The two auditors do not agree. The dependability file is not on `main` yet, so neither side cites a clause.
