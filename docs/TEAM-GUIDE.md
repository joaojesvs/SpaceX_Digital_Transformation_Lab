# Team guide

Map of what is already on `main`. English is the judged language. Portuguese follows in the second half.

## What this is

An audit agent for a CubeSat camera flying as a Falcon 9 rideshare (piggyback) payload. The scripted baseline is Lumen-1: a 6U CubeSat with one visible camera. The team gives the agent that engineering baseline. It answers ECSS questions against the design, marks what is critical, and proposes the change that brings the project back inside the rules.

The stage demo runs from committed cards. It does not call a model and it does not download the standards library.

## Four findings

F-01, F-02, and F-03 are agreed. F-04 stays in dispute between the two auditors.

| ID | Finding | Status |
| --- | --- | --- |
| F-01 | Requirement with no verification method (REQ-IMG-03) | Agreed |
| F-02 | No contamination or outgassing control on the optic | Agreed |
| F-03 | No qualification against rideshare launch loads | Agreed |
| F-04 | Single-string camera, reliability asserted, no FMEA | In dispute |

Where they live:

- `docs/ecss/findings.md` — finding register, English and Portuguese
- `docs/ecss/demo-baseline.md` — the planted baseline the cards read
- `docs/ecss/clause-index.md` — clause identifiers used on the cards
- `docs/ecss/red-team.md` — the challenge, including the F-04 dispute
- `agent/data/cards/f-01.json` through `agent/data/cards/f-04.json` — cards the audit script loads
- `agent/data/baseline.json` — engineering baseline for the script
- `web/src/data/cards.json` and `web/src/data/baseline.json` — the same demo on the review screen

## Run the demo

From the repository root, the audit script:

```bash
npm --prefix agent --silent run demo
```

The review screen (English by default, EN / PT toggle on the page):

```bash
cd web && npm install && npm run dev
```

Open http://localhost:5173. Load the baseline, run the audit, then read the four cards.

## Folder map

- `agent/` — audit agent. Committed baseline, four cards, and the demo script.
- `web/` — demo UI. Bilingual review screen.
- `docs/ecss/` — clause index, engineering baseline, finding register, and the red-team challenge.
- `docs/pitch/` — five-minute scripts, `en.md` and `pt.md`.
- `docs/design/` — visual direction for the screen.
- `docs/decision-log.md` — locked decisions, later changes, and problems.

PDFs already at the repository root stay where they were uploaded.

## Decks

The judged presentation is the English deck. The Portuguese deck is the parallel talk.

- English: https://www.canva.com/d/n9BpVJvYGEyb2hu
- Portuguese: https://www.canva.com/d/CCGGOlYNz7dAFcr

Spoken scripts for those decks are in `docs/pitch/`.

## Standards library

The 317 standards stay in the Drive zip, `Files_ECSS.zip` (file id `1H2dbtphO6zBMIbwKF5uQ5hnqZ46MCHEo`):

https://drive.google.com/file/d/1H2dbtphO6zBMIbwKF5uQ5hnqZ46MCHEo/view

That zip is not in Git. Do not commit the zip or any new PDF. The demo does not fetch it.

---

# Guia da equipa

Mapa do que já está em `main`. O inglês é a língua avaliada. O português está nesta segunda metade.

## O que é isto

Um agente de auditoria para uma câmara de CubeSat a voar como carga útil de rideshare (piggyback) da Falcon 9. A linha de base do guião é a Lumen-1: um CubeSat 6U com uma câmara visível. A equipa entrega ao agente essa linha de base de engenharia. Ele responde a perguntas ECSS sobre o desenho, marca o que é crítico e propõe a alteração que traz o projeto de volta para dentro das regras.

A demo de palco corre a partir de cartões commitados. Não chama um modelo e não descarrega a biblioteca de normas.

## Quatro achados

F-01, F-02 e F-03 estão acordados. O F-04 fica em disputa entre os dois auditores.

| ID | Achado | Estado |
| --- | --- | --- |
| F-01 | Requisito sem método de verificação (REQ-IMG-03) | Acordado |
| F-02 | Sem controlo de contaminação ou desgaseificação na ótica | Acordado |
| F-03 | Sem qualificação contra as cargas de lançamento do rideshare | Acordado |
| F-04 | Câmara de cadeia simples, fiabilidade afirmada, sem FMEA | Em disputa |

Onde estão:

- `docs/ecss/findings.md` — registo de achados, inglês e português
- `docs/ecss/demo-baseline.md` — a linha de base plantada que os cartões leem
- `docs/ecss/clause-index.md` — identificadores de cláusula usados nos cartões
- `docs/ecss/red-team.md` — o desafio, incluindo a disputa do F-04
- `agent/data/cards/f-01.json` a `agent/data/cards/f-04.json` — cartões que o script de auditoria carrega
- `agent/data/baseline.json` — linha de base de engenharia do script
- `web/src/data/cards.json` e `web/src/data/baseline.json` — a mesma demo no ecrã de revisão

## Correr a demo

Na raiz do repositório, o script de auditoria:

```bash
npm --prefix agent --silent run demo
```

O ecrã de revisão (inglês por omissão, comutador EN / PT na página):

```bash
cd web && npm install && npm run dev
```

Abrir http://localhost:5173. Carregar a linha de base, correr a auditoria e ler os quatro cartões.

## Mapa de pastas

- `agent/` — agente de auditoria. Linha de base commitada, quatro cartões e o script da demo.
- `web/` — interface da demo. Ecrã de revisão bilingue.
- `docs/ecss/` — índice de cláusulas, linha de base de engenharia, registo de achados e o desafio da equipa vermelha.
- `docs/pitch/` — guiões de cinco minutos, `en.md` e `pt.md`.
- `docs/design/` — direção visual do ecrã.
- `docs/decision-log.md` — decisões fechadas, alterações posteriores e problemas.

Os PDFs que já estão na raiz do repositório ficam onde foram carregados.

## Apresentações

A apresentação avaliada é o deck em inglês. O deck em português é a palestra paralela.

- Inglês: https://www.canva.com/d/n9BpVJvYGEyb2hu
- Português: https://www.canva.com/d/CCGGOlYNz7dAFcr

Os guiões falados desses decks estão em `docs/pitch/`.

## Biblioteca de normas

As 317 normas ficam no zip do Drive, `Files_ECSS.zip` (id do ficheiro `1H2dbtphO6zBMIbwKF5uQ5hnqZ46MCHEo`):

https://drive.google.com/file/d/1H2dbtphO6zBMIbwKF5uQ5hnqZ46MCHEo/view

Esse zip não está no Git. Não faças commit do zip nem de qualquer PDF novo. A demo não o descarrega.
