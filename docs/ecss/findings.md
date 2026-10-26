# Lumen-1 finding register

Bilingual finding cards for the four planted issues in `demo-baseline.md`. English is the judged text. Portuguese is the demo toggle. The stage script can run from this file alone.

Clause identifiers are only those in `clause-index.md`. A card whose standard is not on `main` is marked **waiting on upload** and does not invent a clause.

Frozen with the index against `origin/main` at `cde8015`. The 317-file library is going to Google Drive. The link is not in the decisions file. Cards below use only PDFs opened on `main`. This register commits no PDFs.

## F-01 — Requirement with no verification method

- id: F-01
- status: agreed
- auditors: both agree
- severity: critical
- card_status: ready
- clause: ECSS-E-ST-10-02C Rev.1, 5.2.1e
- supporting_clause: ECSS-E-ST-10-02C Rev.1, 5.2.2.1a
- source_file: ECSS-E-ST-10-02C-Rev.1(1February2018).pdf
- evidence: demo-baseline.md, REQ-IMG-03
- review: PDR

### English

REQ-IMG-03 sets an on-orbit modulation transfer function of at least 0.15 at Nyquist. The verification matrix leaves method, level, and stage empty.

Clause 5.2.1e says each requirement in the verification set carries a strategy in the first verification control document: the methods, the product level, and the stage. That document is the matrix. An empty row is not a strategy, so the requirement cannot be closed. Clause 5.2.2.1a limits a method to test, analysis, review of design, or inspection, alone or combined. The row uses none of them.

This is critical at PDR because the image chain can pass the ground-sample-distance row and still be soft at Nyquist. Without a method, nobody can say how that softness would be found before flight.

Change: set REQ-IMG-03 to test, at equipment level, in qualification, on an optical bench that measures modulation transfer at Nyquist. Write those three entries in the matrix and name the bench test in the campaign.

### Português

O REQ-IMG-03 fixa uma função de transferência de modulação em órbita de pelo menos 0,15 em Nyquist. A matriz de verificação deixa método, nível e fase por preencher.

A cláusula 5.2.1e diz que cada requisito no conjunto de verificação tem uma estratégia no primeiro documento de controlo da verificação: os métodos, o nível de produto e a fase. Esse documento é a matriz. Uma linha vazia não é uma estratégia, por isso o requisito não pode ser fechado. A cláusula 5.2.2.1a limita um método a ensaio, análise, revisão de projeto ou inspeção, sozinho ou em combinação. A linha não usa nenhum deles.

É crítico na PDR porque a cadeia de imagem pode cumprir a linha da distância de amostragem ao solo e ainda assim ficar suave em Nyquist. Sem método, ninguém diz como essa suavidade seria descoberta antes do voo.

Alteração: pôr o REQ-IMG-03 como ensaio, ao nível do equipamento, na qualificação, num banco ótico que meça a transferência de modulação em Nyquist. Escrever essas três entradas na matriz e nomear o ensaio no plano de campanha.

## F-02 — No contamination or outgassing control on the optic

- id: F-02
- status: agreed
- auditors: both agree
- severity: critical
- card_status: waiting on upload
- clause: waiting on upload
- expected_document: ECSS-Q-ST-70
- expected_place: Google Drive, when the link is recorded in the decisions file
- source_file: none on main at cde8015
- evidence: demo-baseline.md, section "Materials and the optic"
- review: PDR

### English

Both auditors agree the baseline gap is real and critical. The lens, the silicone stake, the anodized baffle, and the coated filter sit in view of the detector. The file has no cleanliness level, no contamination budget, no bake-out, no witness sample, and no outgassing screen. The integration line is "assemble on a clean bench". A film or a particle on this optic lowers the modulation the image requirements ask for, and launch plus vacuum is when an unscreened silicone can move.

No clause identifier is stated. `ECSS-Q-ST-70` is not on `main`, and the Drive link is not recorded. This card does not invent one, and it does not borrow the old mechanical-materials PDF that is already in the repo.

Change, without a clause number: add a cleanliness requirement and an outgassing screen for every material in view of the detector, and give that requirement a verification method. Numerical limits wait until `ECSS-Q-ST-70` is on `main`.

### Português

Os dois auditores concordam que a falha na linha de base é real e crítica. A lente, o silicone de fixação, o baffle anodizado e o filtro com revestimento estão na vista do detetor. O ficheiro não tem nível de limpeza, orçamento de contaminação, bake-out, amostra testemunha, nem rastreio de desgaseificação. A linha de integração é "montar num banco limpo". Uma película ou uma partícula nesta ótica baixa a modulação que os requisitos de imagem pedem, e o lançamento mais o vácuo é quando um silicone sem rastreio se pode deslocar.

Não se indica identificador de cláusula. A `ECSS-Q-ST-70` não está em `main`, e a ligação do Drive não está registada. Este cartão não inventa um, e não usa o PDF antigo de materiais mecânicos que já está no repositório.

Alteração, sem número de cláusula: acrescentar um requisito de limpeza e um rastreio de desgaseificação para cada material na vista do detetor, e dar a esse requisito um método de verificação. Os limites numéricos esperam até a `ECSS-Q-ST-70` estar em `main`.

## F-03 — No qualification against rideshare launch loads

- id: F-03
- status: agreed
- auditors: both agree
- severity: critical
- card_status: ready
- clause: ECSS-E-ST-10-03C Rev.1, 4.5.2a
- supporting_clauses: ECSS-E-ST-10-03C Rev.1, 4.5.1b; 5.1b; 5.2a with Table 5-1 columns a and i; 5.5.2.3; 5.5.2.5; 5.5.2.6
- launch_constraint: waiting on upload
- expected_document: SpaceX Rideshare Payload User's Guide
- source_file: ECSS-E-ST-10-03-Rev.1(31May2022).pdf
- evidence: demo-baseline.md, REQ-MEC-01 and section "Test campaign at PDR"
- review: PDR

### English

REQ-MEC-01 says the camera survives the Falcon 9 rideshare mechanical environment and keeps optical alignment. The matrix says Test, equipment, qualification. The campaign then marks random vibration, sine, shock, static load, and acoustic as not applicable, because "the dispenser vendor covers launch". No qualification model and no protoflight model exist.

Clause 4.5.2a asks for qualification evidence that the item meets its specification in the intended environments, with the qualification margins, on a qualification model or under a protoflight approach. Clause 4.5.1b puts launch-segment compatibility into the test programme. Clause 5.1b treats a camera as both electronic (type a) and optical (type i). Table 5-1, via 5.2a, marks sinusoidal vibration and shock as required for both types, and random vibration as required for the electronic type. None of those tests is planned.

The rideshare user's guide is the environment those tests are aimed at. It is not on `main`, and the Drive link is not recorded, so this card does not name a guide section or a load factor. Both auditors still agree on the testing clause that is open: the campaign has no qualification model, no protoflight model, and no launch-load test, which leaves 4.5.2a without evidence.

Change: plan a qualification or protoflight campaign for a flight-representative camera against the rideshare mechanical environment, including the sine, random, and shock tests Table 5-1 requires for an electronic optical unit, unless a written customer tailoring narrows that list. Delete the line that the dispenser vendor covers the camera. Point REQ-MEC-01 at that campaign. Fill the environment levels when the guide can be opened.

### Português

O REQ-MEC-01 diz que a câmara sobrevive ao ambiente mecânico do rideshare da Falcon 9 e mantém o alinhamento ótico. A matriz diz ensaio, equipamento, qualificação. A campanha marca depois vibração aleatória, seno, choque, carga estática e acústica como não aplicáveis, porque "o fornecedor do dispenser cobre o lançamento". Não há modelo de qualificação nem modelo protoflight.

A cláusula 4.5.2a pede evidência de qualificação de que o item cumpre a especificação nos ambientes previstos, com as margens de qualificação, num modelo de qualificação ou numa abordagem protoflight. A cláusula 4.5.1b mete a compatibilidade com o segmento de lançamento no programa de ensaios. A cláusula 5.1b trata uma câmara como eletrónica (tipo a) e ótica (tipo i). A Tabela 5-1, pela 5.2a, marca vibração sinusoidal e choque como obrigatórios para os dois tipos, e vibração aleatória como obrigatória para o tipo eletrónico. Nenhum desses ensaios está planeado.

O guia de rideshare é o ambiente a que esses ensaios se destinam. Não está em `main`, e a ligação do Drive não está registada, por isso este cartão não nomeia uma secção do guia nem um fator de carga. Os dois auditores ainda assim concordam na cláusula de ensaio que está aberta: a campanha não tem modelo de qualificação, nem modelo protoflight, nem ensaio de cargas de lançamento, e a 4.5.2a fica sem evidência.

Alteração: planear uma campanha de qualificação ou protoflight de uma câmara representativa de voo contra o ambiente mecânico do rideshare, incluindo os ensaios de seno, vibração aleatória e choque que a Tabela 5-1 exige para uma unidade eletrónica-ótica, salvo uma adaptação escrita do cliente que reduza essa lista. Apagar a frase de que o fornecedor do dispenser cobre a câmara. Apontar o REQ-MEC-01 para essa campanha. Preencher os níveis do ambiente quando o guia puder ser aberto.

## F-04 — Single-string camera, reliability asserted, no FMEA

- id: F-04
- status: in dispute
- auditors: do not agree
- severity: disputed
- card_status: waiting on upload
- clause: waiting on upload
- expected_document: ECSS-Q-ST-30
- expected_place: Google Drive, when the link is recorded in the decisions file
- source_file: none on main at cde8015
- evidence: demo-baseline.md, REQ-REL-01 and section "Reliability claim"
- review: PDR

### English

What both auditors see in the file: one detector, one controller, one power feed, and REQ-REL-01 stating 0.95 over two years. The only evidence offered is the sentence that the detector is commercial and that cameras of this class have flown. There is no failure-modes analysis.

Auditor A treats that as critical. A number in a requirement is a claim that the project has to earn. A single string means a failure of the detector, the controller, or the power feed ends the imaging mission, and the file never lists those modes. Auditor A's change, pending the standard: take 0.95 out of the baseline, or replace the sentence with an analysis of the camera chain that names the single-point failures and what would make each one acceptable. Auditor A does not cite a clause. `ECSS-Q-ST-30` is not on `main`, and the Drive link is not recorded.

Auditor B does not accept the finding as critical. A single-string science camera on a rideshare CubeSat can be a chosen architecture, and the depth of any failure analysis for a payload that is not a safety item is a tailoring question. That question belongs to `ECSS-Q-ST-30`, which is not on `main` and is not yet reachable on Drive. Auditor B will not grade the claim, and will not invent the clause that would settle it.

The dispute stays open. The human decides after the file is uploaded. Until then the card has no clause identifier.

### Português

O que os dois auditores veem no ficheiro: um detetor, um controlador, uma alimentação, e o REQ-REL-01 a declarar 0,95 ao longo de dois anos. A única evidência é a frase de que o detetor é comercial e de que câmaras desta classe já voaram. Não há análise de modos de falha.

O auditor A trata isto como crítico. Um número num requisito é uma afirmação que o projeto tem de sustentar. Uma cadeia simples significa que uma falha do detetor, do controlador ou da alimentação acaba com a missão de imagem, e o ficheiro nunca lista esses modos. A alteração do auditor A, à espera da norma: tirar o 0,95 da linha de base, ou substituir a frase por uma análise da cadeia da câmara que nomeie as falhas de ponto único e o que tornaria cada uma aceitável. O auditor A não cita uma cláusula. A `ECSS-Q-ST-30` não está em `main`, e a ligação do Drive não está registada.

O auditor B não aceita o achado como crítico. Uma câmara científica de cadeia simples num CubeSat de rideshare pode ser uma arquitetura escolhida, e a profundidade de uma análise de falhas para uma carga que não é um item de segurança é uma questão de adaptação. Essa questão pertence à `ECSS-Q-ST-30`, que não está em `main` e ainda não está acessível no Drive. O auditor B não classifica a afirmação, e não inventa a cláusula que a fecharia.

A disputa mantém-se aberta. A pessoa decide depois de o ficheiro ser carregado. Até lá o cartão não tem identificador de cláusula.
