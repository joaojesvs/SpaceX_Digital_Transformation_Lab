# Lumen-1 finding register

Bilingual finding cards for the four planted issues in `demo-baseline.md`. English is the judged text. Portuguese is the demo toggle. The stage script can run from this file alone.

Clause identifiers are only those in `clause-index.md`. A card whose file was not opened stays **waiting on upload**.

Read with the index against `origin/main` at `cde8015` and against `Files_ECSS.zip` on Drive (file id `1H2dbtphO6zBMIbwKF5uQ5hnqZ46MCHEo`). This register commits no PDFs.

## F-01 — Requirement with no verification method

- id: F-01
- status: agreed
- auditors: both agree
- severity: critical
- card_status: ready
- clause: ECSS-E-ST-10-02C Rev.1, 5.2.1e
- supporting_clauses: ECSS-E-ST-10-02C Rev.1, 5.2.2.1a; ECSS-E-ST-10C Rev.1, 5.2.3.4a
- source_file: ECSS-E-ST-10-02C-Rev.1(1February2018).pdf
- also_opened: Files_PDF/ECSS-E-ST-10C-Rev.1(15February2017).pdf in the Drive zip
- evidence: demo-baseline.md, REQ-IMG-03
- review: PDR

### English

REQ-IMG-03 sets an on-orbit modulation transfer function of at least 0.15 at Nyquist. The verification matrix leaves method, level, and stage empty.

Clause 5.2.1e says each requirement in the verification set carries a strategy in the first verification control document: the methods, the product level, and the stage. That document is the matrix. An empty row has no strategy, so the requirement cannot be closed. Clause 5.2.2.1a limits a method to test, analysis, review of design, or inspection, alone or combined. The row uses none of them. Clause 5.2.3.4a of ECSS-E-ST-10C Rev.1, opened from the Drive zip, says the same thing from the system-engineering side: each requirement in the technical specification has a verification method, and 5.2.3.4b puts that method in the matrix.

This is critical at PDR because the image chain can pass the ground-sample-distance row and still be soft at Nyquist. Without a method, nobody can say how that softness would be found before flight.

Change: set REQ-IMG-03 to test, at equipment level, in qualification, on an optical bench that measures modulation transfer at Nyquist. Write those three entries in the matrix and name the bench test in the campaign.

### Português

O REQ-IMG-03 fixa uma função de transferência de modulação em órbita de pelo menos 0,15 em Nyquist. A matriz de verificação deixa método, nível e fase por preencher.

A cláusula 5.2.1e diz que cada requisito no conjunto de verificação tem uma estratégia no primeiro documento de controlo da verificação: os métodos, o nível de produto e a fase. Esse documento é a matriz. Uma linha vazia não tem estratégia, por isso o requisito não pode ser fechado. A cláusula 5.2.2.1a limita um método a ensaio, análise, revisão de projeto ou inspeção, sozinho ou em combinação. A linha não usa nenhum deles. A cláusula 5.2.3.4a da ECSS-E-ST-10C Rev.1, aberta no zip do Drive, diz o mesmo do lado da engenharia de sistemas: cada requisito da especificação técnica tem um método de verificação, e a 5.2.3.4b põe esse método na matriz.

É crítico na PDR porque a cadeia de imagem pode cumprir a linha da distância de amostragem ao solo e ainda assim ficar suave em Nyquist. Sem método, ninguém diz como essa suavidade seria descoberta antes do voo.

Alteração: pôr o REQ-IMG-03 como ensaio, ao nível do equipamento, na qualificação, num banco ótico que meça a transferência de modulação em Nyquist. Escrever essas três entradas na matriz e nomear o ensaio no plano de campanha.

## F-02 — No contamination or outgassing control on the optic

- id: F-02
- status: agreed
- auditors: both agree
- severity: critical
- card_status: ready
- clause: ECSS-Q-ST-70C Rev.2, 4.4a
- supporting_clauses: ECSS-Q-ST-70C Rev.2, 4.4c; 5.1.4b; 5.1.4c
- source_file: Files_PDF/ECSS-Q-ST-70C-Rev.2(15October2019).pdf in the Drive zip
- evidence: demo-baseline.md, section "Materials and the optic"
- review: PDR

### English

Both auditors agree this is critical. The lens, the silicone stake, the anodized baffle, and the coated filter sit in view of the detector. The file has no cleanliness level, no contamination budget, no bake-out, no witness sample, and no outgassing screen. The integration line is "assemble on a clean bench". A film or a particle on this optic lowers the modulation the image requirements ask for, and vacuum is when an unscreened silicone can move.

Clause 4.4a requires a contamination and cleanliness control programme, and the minimum is cleaning procedures plus a way to monitor cleanliness. The baseline has neither. Clause 4.4c applies because this optic is contamination-critical: it asks for a chemical and particle requirement specification and a cleanliness control plan. The detailed plan rules are in ECSS-Q-ST-70-01, which was not opened, so this card does not invent those rules. Clause 5.1.4b requires outgassing screening of the materials. Clause 5.1.4c requires every organic material to be evaluated for outgassing. The silicone stake is organic and has no evaluation. The screening method is in ECSS-Q-ST-70-02, which was not opened, so no acceptance percentages are stated here.

Change: add the cleanliness programme and an outgassing evaluation of every material in view of the detector, including the silicone, and give that requirement a verification method. Write the detailed plan and the screening limits only from ECSS-Q-ST-70-01 and ECSS-Q-ST-70-02 when those files are opened.

### Português

Os dois auditores concordam que isto é crítico. A lente, o silicone de fixação, o baffle anodizado e o filtro com revestimento estão na vista do detetor. O ficheiro não tem nível de limpeza, orçamento de contaminação, bake-out, amostra testemunha, nem rastreio de desgaseificação. A linha de integração é "montar num banco limpo". Uma película ou uma partícula nesta ótica baixa a modulação que os requisitos de imagem pedem, e o vácuo é quando um silicone sem rastreio se pode deslocar.

A cláusula 4.4a exige um programa de controlo de contaminação e limpeza, e o mínimo são procedimentos de limpeza mais uma forma de vigiar a limpeza. A linha de base não tem nenhum dos dois. A cláusula 4.4c aplica-se porque esta ótica é crítica à contaminação: pede uma especificação de requisitos químicos e de partículas e um plano de controlo de limpeza. As regras detalhadas do plano estão na ECSS-Q-ST-70-01, que não foi aberta, por isso este cartão não inventa essas regras. A cláusula 5.1.4b exige o rastreio de desgaseificação dos materiais. A cláusula 5.1.4c exige que cada material orgânico seja avaliado quanto à desgaseificação. O silicone de fixação é orgânico e não tem avaliação. O método de rastreio está na ECSS-Q-ST-70-02, que não foi aberta, por isso não se indicam percentagens de aceitação.

Alteração: acrescentar o programa de limpeza e uma avaliação de desgaseificação de cada material na vista do detetor, incluindo o silicone, e dar a esse requisito um método de verificação. Escrever o plano detalhado e os limites de rastreio só a partir da ECSS-Q-ST-70-01 e da ECSS-Q-ST-70-02 quando esses ficheiros forem abertos.

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

The rideshare user's guide is the environment those tests are aimed at. The Drive zip was listed by name and the guide is not in it, and it is not on `main`, so this card does not name a guide section or a load factor. Both auditors still agree on the testing clause that is open: the campaign has no qualification model, no protoflight model, and no launch-load test, which leaves 4.5.2a without evidence.

Change: plan a qualification or protoflight campaign for a flight-representative camera against the rideshare mechanical environment, including the sine, random, and shock tests Table 5-1 requires for an electronic optical unit, unless a written customer tailoring narrows that list. Delete the line that the dispenser vendor covers the camera. Point REQ-MEC-01 at that campaign. Fill the environment levels when the guide can be opened.

### Português

O REQ-MEC-01 diz que a câmara sobrevive ao ambiente mecânico do rideshare da Falcon 9 e mantém o alinhamento ótico. A matriz diz ensaio, equipamento, qualificação. A campanha marca depois vibração aleatória, seno, choque, carga estática e acústica como não aplicáveis, porque "o fornecedor do dispenser cobre o lançamento". Não há modelo de qualificação nem modelo protoflight.

A cláusula 4.5.2a pede evidência de qualificação de que o item cumpre a especificação nos ambientes previstos, com as margens de qualificação, num modelo de qualificação ou numa abordagem protoflight. A cláusula 4.5.1b mete a compatibilidade com o segmento de lançamento no programa de ensaios. A cláusula 5.1b trata uma câmara como eletrónica (tipo a) e ótica (tipo i). A Tabela 5-1, pela 5.2a, marca vibração sinusoidal e choque como obrigatórios para os dois tipos, e vibração aleatória como obrigatória para o tipo eletrónico. Nenhum desses ensaios está planeado.

O guia de rideshare é o ambiente a que esses ensaios se destinam. O zip do Drive foi listado pelo nome e o guia não está lá, nem está em `main`, por isso este cartão não nomeia uma secção do guia nem um fator de carga. Os dois auditores ainda assim concordam na cláusula de ensaio que está aberta: a campanha não tem modelo de qualificação, nem modelo protoflight, nem ensaio de cargas de lançamento, e a 4.5.2a fica sem evidência.

Alteração: planear uma campanha de qualificação ou protoflight de uma câmara representativa de voo contra o ambiente mecânico do rideshare, incluindo os ensaios de seno, vibração aleatória e choque que a Tabela 5-1 exige para uma unidade eletrónica-ótica, salvo uma adaptação escrita do cliente que reduza essa lista. Apagar a frase de que o fornecedor do dispenser cobre a câmara. Apontar o REQ-MEC-01 para essa campanha. Preencher os níveis do ambiente quando o guia puder ser aberto.

## F-04 — Single-string camera, reliability asserted, no FMEA

- id: F-04
- status: in dispute
- auditors: do not agree
- severity: disputed
- card_status: ready
- clause: ECSS-Q-ST-30C Rev.1, 6.4.2.2a
- supporting_clause: ECSS-Q-ST-30C Rev.1, 6.4.2.2b
- source_file: Files_PDF/ECSS-Q-ST-30C-Rev.1(15February2017).pdf in the Drive zip
- evidence: demo-baseline.md, REQ-REL-01 and section "Reliability claim"
- review: PDR

### English

What both auditors see in the file: one detector, one controller, one power feed, and REQ-REL-01 stating 0.95 over two years. The only evidence offered is the sentence that the detector is commercial and that cameras of this class have flown. There is no failure-modes analysis.

Clause 6.4.2.2a requires an FMEA, or a FMECA when criticality is included. The worksheet rules are in ECSS-Q-ST-30-02, which was not opened, so this card does not invent them. Clause 6.4.2.2b is the part both auditors use: the analysis names the potential failure modes and classes them by severity, or by criticality if a FMECA is used. The heritage sentence does not do that.

Auditor A treats the gap as critical. The 0.95 figure is a claim the project has not earned. On this single string, a failure of the detector, the controller, or the power feed ends the imaging mission, and the file never lists those modes. Auditor A's change: remove 0.95, or replace the sentence with an FMEA of the camera chain that names those modes and what would make each consequence acceptable.

Auditor B accepts that 6.4.2.2a asks for the analysis, and that the heritage sentence is not one. Auditor B does not accept "single-string" as the non-conformance. The clause does not require a second camera. A science camera on a rideshare CubeSat can stay one string if the analysis records that architecture and the accepted consequences. Bundling "no redundancy" into the same critical finding overclaims the clause. The dispute stays on that bundle. The human decides.

### Português

O que os dois auditores veem no ficheiro: um detetor, um controlador, uma alimentação, e o REQ-REL-01 a declarar 0,95 ao longo de dois anos. A única evidência é a frase de que o detetor é comercial e de que câmaras desta classe já voaram. Não há análise de modos de falha.

A cláusula 6.4.2.2a exige uma FMEA, ou uma FMECA quando se inclui a criticidade. As regras da folha de trabalho estão na ECSS-Q-ST-30-02, que não foi aberta, por isso este cartão não as inventa. A cláusula 6.4.2.2b é a parte que os dois auditores usam: a análise nomeia os modos de falha potenciais e classifica-os pela severidade, ou pela criticidade se for uma FMECA. A frase de herança de voo não faz isso.

O auditor A trata a falha como crítica. O valor 0,95 é uma afirmação que o projeto não sustentou. Nesta cadeia simples, uma falha do detetor, do controlador ou da alimentação acaba com a missão de imagem, e o ficheiro nunca lista esses modos. A alteração do auditor A: tirar o 0,95, ou substituir a frase por uma FMEA da cadeia da câmara que nomeie esses modos e o que tornaria cada consequência aceitável.

O auditor B aceita que a 6.4.2.2a pede a análise, e que a frase de herança não é uma análise. O auditor B não aceita "cadeia simples" como a não-conformidade. A cláusula não exige uma segunda câmara. Uma câmara científica num CubeSat de rideshare pode manter uma cadeia simples se a análise registar essa arquitetura e as consequências aceites. Juntar "sem redundância" ao mesmo achado crítico estica a cláusula. A disputa fica nesse conjunto. A pessoa decide.
