# English pitch (judged)

**Length:** 5:00. **Language:** English. **Room deadline:** 27 October 2026, 13:00, Europe/Lisbon.

**Mission:** a CubeSat optical payload — a camera — on a Falcon 9 rideshare. Keep this instrument for the whole talk.

**Library:** 317 ECSS files in a Google Drive folder, arriving in parts. A Git repo holds the project pack and the cards. The demo reads the cards, not all 317 files. The Drive link is not public. Do not invent a URL.

**Demo:** the four planted issues below, from committed data. No live model. English on screen, Portuguese on a toggle.

**Slides:** [English deck](https://www.canva.com/d/n9BpVJvYGEyb2hu)

## Score map

| Clock | Beat | What it earns |
| --- | --- | --- |
| 0:00–1:10 | Problem | Impact 20%. The use case inside innovation 30%. |
| 1:10–3:20 | Live demo | Presentation 20%. Innovation 30%: the answer is about this baseline, and the two auditors can disagree. |
| 3:20–4:00 | Results | Impact 20%. |
| 4:00–5:00 | Architecture | Technical implementation 30%. |

Presentation 20% is the whole five minutes: short lines, one demo, English, committed data.

## Before you walk up

- Say the source system in two parts: a Google Drive folder of the 317 ECSS files, and a Git repo that holds the project pack and the cards.
- Say that the demo does not read all 317 files. It reads the cards.
- Do not invent a URL. The Drive link is not public yet. If someone asks for it, say it is not public yet.
- Cards you may name: ECSS-E-ST-10, ECSS-E-ST-10-02, ECSS-Q-ST-30, ECSS-Q-ST-70, ECSS-E-ST-10-03, and the public SpaceX Rideshare Payload User's Guide.
- Use our sentences and the clause identifier. Do not read clause text. Do not read the rideshare guide aloud.
- No catch-rate percentage. This does not certify the camera.
- Leave the 13:00 deadline off the slides. It is the room clock, not a result.
- If the UI fails, read slide 4. Do not invent a fifth issue.

## Slide 1 — Audit the review

**0:00–0:15**

**On the slide**

- Audit the review
- CubeSat optical payload
- Falcon 9 rideshare
- One engineering baseline

**Say**

This is an audit for one review. The payload is a CubeSat camera, flying as a Falcon 9 rideshare. We hand the agent the engineering baseline. It marks what is critical, and it names the change.

**Notes**

Stay on this camera. The scores start here as impact and innovation. Do not announce the rubric.

## Slide 2 — The review waits on one reader

**0:15–1:10**

**On the slide**

- A requirement with no verification method
- An optic with no contamination control
- Launch loads never qualified
- One camera. One review.

**Say**

A design review of this camera waits on the person who can read ECSS and the design together. When that person is the bottleneck, three gaps come back as rework. A requirement with no verification method. An optic with no contamination or outgassing control. Launch loads the camera was never qualified against. We built a checker for that review, on this camera, in these two days.

**Notes**

Impact 20%. These three are the agreed findings. The disputed FMEA comes in the demo.

## Slide 3 — What the demo runs

**1:10–1:35**

**On the slide**

- Committed baseline, no live model
- Two auditors
- English on screen, Portuguese on a toggle
- The engineer decides

**Say**

Switch to the demo. It runs from committed data, so the room network is not the show. English is on the screen. Portuguese is a toggle. Two auditors read this baseline. I will show the three they both accept, and the one they leave open.

**Notes**

Presentation 20%. Open the demo now. Backup is the next slide.

## Slide 4 — Four issues, one left open

**1:35–3:20**

**On the slide**

- No verification method — both agree
- No contamination or outgassing control — both agree
- No rideshare launch qualification — both agree
- Single-string camera, no FMEA — in dispute

**Say**

First. A requirement has no verification method. Both auditors agree. The change is a method — test, analysis, inspection, or review of design — so it stays traceable under ECSS-E-ST-10 and ECSS-E-ST-10-02.

Second. No contamination or outgassing control on the optic. Both agree. The change is a control on the optical surfaces, under ECSS-Q-ST-70. A fogged optic does not take the picture.

Third. No qualification against the rideshare launch loads. Both agree. The change is a qualification for the Falcon 9 mechanical environment, under ECSS-E-ST-10-03, beside our summary of the public rideshare guide.

Fourth. The camera is single-string. Reliability is asserted, and there is no FMEA. This one stays in dispute. One auditor wants the analysis under ECSS-Q-ST-30. The other does not close it. I leave it open, and I accept one of the first three. The engineer decides. The baseline stays unedited.

**Notes**

Innovation 30% and presentation 20%. Point at the finding card. Verdicts, in order: agree, agree, agree, dispute. If the clock slips, cut the list of methods and keep each verdict and the change.

## Slide 5 — Three closed, one still open

**3:20–4:00**

**On the slide**

- Three findings both auditors accept
- One dispute stays with the engineer
- Each finding names the change
- This does not certify the camera

**Say**

On this baseline, both auditors agree on three of the four planted issues and leave the fourth in dispute. Each agreed finding names the change that puts the project back inside the rules. Put the verification method, the contamination control, and the rideshare qualification back in, and those three findings go away. The engineer still accepts or dismisses. This does not certify the camera.

**Notes**

Impact 20%. State the three, the dispute, and the human decision. No percentage.

## Slide 6 — The source system

**4:00–4:18**

**On the slide**

- The source system
- Google Drive + Git
- Requirements
- FMEA
- Verification plan

**Say**

The source system is two places. A Google Drive folder holds the 317 ECSS files. A Git repo holds the project pack — the requirements, the FMEA, and the verification plan — and the cards. The demo does not read all 317 files.

**Notes**

Technical implementation 30%. Say Google Drive, the Git repo, the project pack, and the cards. Say requirements, FMEA, and verification plan. No URL on this slide.

## Slide 7 — Four data domains

**4:18–4:50**

**On the slide**

- ECSS applicability index
- Cards in Git. Not all 317 files.
- Project configuration
- Finding register
- Falcon 9 rideshare constraints

**Say**

Four data domains. The ECSS applicability index. The project configuration. The finding register. And the Falcon 9 rideshare constraints. The index is the card slice in the Git repo: system engineering, verification, dependability, materials and contamination, testing, and the rideshare guide. Then the second auditor, then the human.

**Notes**

Technical implementation 30%. The 317 files stay in Drive. The demo reads the cards.

## Slide 8 — The next review

**4:50–5:00**

**On the slide**

- The next review of this camera
- The specialist takes the dispute
- Thank you

**Say**

Next we take the same cards into the next review of this class of camera. The specialist spends that meeting on the dispute. Thank you.

**Notes**

Stop at five minutes. Questions after the clock.

## If a judge asks

- The 317 ECSS files are in a Google Drive folder. The project pack and the cards are in a Git repo. The Drive link is not public. Do not invent one.
- The demo reads the cards, not every file in the folder. The card states the identifier it was written from.
- Pyrotechnics, explosives, and propulsion sit outside this camera.
- Nothing on this stage is a compliance certificate.
