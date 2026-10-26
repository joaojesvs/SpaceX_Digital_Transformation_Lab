# Pitch em português (paralelo)

**Duração:** 5:00. O pitch julgado é o inglês. **Prazo da sala:** 27 de outubro de 2026, 13:00, hora de Lisboa.

**Missão:** carga útil ótica de um CubeSat — uma câmara — num rideshare da Falcon 9. Manter este instrumento em toda a fala.

**Biblioteca:** 317 ficheiros ECSS numa pasta Google Drive, a chegar por partes. Um repositório Git guarda o pacote de projeto e as fichas. A demonstração lê as fichas, não os 317 ficheiros. A ligação do Drive está nas notas da pergunta. Não entra num diapositivo.

**Demonstração:** os quatro problemas plantados abaixo, a partir de dados commitados. Sem modelo ao vivo. Inglês no ecrã, português num botão.

**Diapositivos:** [deck em português](https://www.canva.com/d/CCGGOlYNz7dAFcr)

## Mapa das pontuações

| Relógio | Momento | O que pontua |
| --- | --- | --- |
| 0:00–1:10 | Problema | Impacto 20%. O caso de uso dentro de inovação 30%. |
| 1:10–3:20 | Demonstração ao vivo | Apresentação 20%. Inovação 30%: a resposta é sobre esta linha de base, e os dois auditores podem discordar. |
| 3:20–4:00 | Resultados | Impacto 20%. |
| 4:00–5:00 | Arquitetura | Implementação técnica 30%. |

A apresentação 20% é os cinco minutos inteiros: frases curtas, uma demonstração, inglês no palco, dados commitados.

## Antes de subir

- Dizer o sistema de origem em duas partes: uma pasta Google Drive com os 317 ficheiros ECSS, e um repositório Git com o pacote de projeto e as fichas.
- Dizer que a demonstração não lê os 317 ficheiros. Lê as fichas.
- A ligação do Drive está em “Se um júri perguntar”. Dá-la só se a pedirem. Não a pôr num diapositivo.
- No momento dos quatro problemas, citar as cláusulas abertas. Verificação: ECSS-E-ST-10-02C Rev.1, 5.2.1e, e ECSS-E-ST-10C Rev.1, 5.2.3.4a. Contaminação: ECSS-Q-ST-70C Rev.2, 4.4a. Cargas de lançamento: ECSS-E-ST-10-03C Rev.1, 4.5.2a. FMEA: ECSS-Q-ST-30C Rev.1, 6.4.2.2a.
- A contaminação está citada. Já não está à espera.
- A FMEA fica em disputa. A cláusula 6.4.2.2a exige a análise. Não exige uma segunda câmara.
- Não nomear uma secção do guia de rideshare nem um valor de carga. Deixar por citar a ECSS-Q-ST-70-01, a ECSS-Q-ST-70-02 e a ECSS-Q-ST-30-02. Esses ficheiros não foram abertos. Não ler o texto da cláusula em voz alta.
- Sem percentagem de acerto. Isto não certifica a câmara.
- O prazo das 13:00 fica fora dos diapositivos. É o relógio da sala, não um resultado.
- Se a interface falhar, ler o diapositivo 4. Não inventar um quinto problema.

## Diapositivo 1 — Auditar a revisão

**0:00–0:15**

**No diapositivo**

- Auditar a revisão
- Carga útil ótica de um CubeSat
- Rideshare da Falcon 9
- Uma linha de base de engenharia

**Dizer**

Isto é uma auditoria para uma revisão. A carga útil é uma câmara de CubeSat, a voar como rideshare numa Falcon 9. Entregamos ao agente a linha de base de engenharia. Ele marca o que é crítico e nomeia a alteração.

**Notas**

Ficar nesta câmara. As pontuações começam aqui como impacto e inovação. Não anunciar a grelha.

## Diapositivo 2 — A revisão espera por um leitor

**0:15–1:10**

**No diapositivo**

- Um requisito sem método de verificação
- Uma ótica sem controlo de contaminação
- Cargas de lançamento nunca qualificadas
- Uma câmara. Uma revisão.

**Dizer**

A revisão de projeto desta câmara espera pela pessoa que consegue ler a ECSS e o desenho ao mesmo tempo. Quando essa pessoa é o estrangulamento, três falhas voltam como retrabalho. Um requisito sem método de verificação. Uma ótica sem controlo de contaminação ou de desgaseificação. Cargas de lançamento para as quais a câmara nunca foi qualificada. Construímos um verificador para essa revisão, nesta câmara, nestes dois dias.

**Notas**

Impacto 20%. Estes três são os achados em acordo. A FMEA em disputa vem na demonstração.

## Diapositivo 3 — O que a demonstração corre

**1:10–1:35**

**No diapositivo**

- Linha de base commitada, sem modelo ao vivo
- Dois auditores
- Inglês no ecrã, português num botão
- O engenheiro decide

**Dizer**

Mudar para a demonstração. Corre a partir de dados commitados, por isso a rede da sala não é o espetáculo. O inglês está no ecrã. O português é um botão. Dois auditores leem esta linha de base. Vou mostrar os três que os dois aceitam, e o que deixam em aberto.

**Notas**

Apresentação 20%. Abrir a demonstração agora. A reserva é o diapositivo seguinte.

## Diapositivo 4 — Quatro problemas, um em aberto

**1:35–3:20**

**No diapositivo**

- Sem método de verificação — 5.2.1e e 10C 5.2.3.4a — concordam
- Contaminação e desgaseificação — Q-ST-70C Rev.2, 4.4a — concordam
- Sem qualificação às cargas — 10-03C Rev.1, 4.5.2a — concordam
- Sem FMEA — 30C 6.4.2.2a — em disputa

**Dizer**

Primeiro. Um requisito não tem método de verificação. Os dois auditores concordam. A alteração é um método — ensaio, análise, inspeção ou revisão do desenho. A ficha cita a ECSS-E-ST-10-02C Rev.1, cláusula 5.2.1e, e a ECSS-E-ST-10C Rev.1, cláusula 5.2.3.4a.

Segundo. Não há controlo de contaminação nem de desgaseificação na ótica. Os dois concordam. A alteração é um programa de limpeza e uma avaliação de desgaseificação dos materiais na vista do detetor. A ficha cita a ECSS-Q-ST-70C Rev.2, cláusula 4.4a. Uma ótica embaciada não tira a fotografia.

Terceiro. Não há qualificação contra as cargas de lançamento do rideshare. Os dois concordam. A alteração é uma qualificação para esse ambiente mecânico. A ficha cita a ECSS-E-ST-10-03C Rev.1, cláusula 4.5.2a.

Quarto. A fiabilidade é afirmada, e não há FMEA. Os dois auditores veem que a ECSS-Q-ST-30C Rev.1, cláusula 6.4.2.2a, exige a análise. A cláusula não exige uma segunda câmara. É essa a disputa. Deixo-o em aberto e aceito um dos três primeiros. O engenheiro decide. A linha de base não é editada.

**Notas**

Inovação 30% e apresentação 20%. Apontar para o cartão do achado. Veredictos, por ordem: concordam na 5.2.1e e na 5.2.3.4a; concordam na 4.4a; concordam na 4.5.2a; disputa na 6.4.2.2a. Se o relógio apertar, manter cada veredicto e a sua cláusula. Se um júri pedir as cláusulas de apoio, acrescentar a 5.2.2.1a na verificação, a 4.4c, a 5.1.4b e a 5.1.4c na contaminação, e a 6.4.2.2b na FMEA. Deixar por citar a 70-01, a 70-02 e a 30-02.

## Diapositivo 5 — Três fechados, um em aberto

**3:20–4:00**

**No diapositivo**

- Três achados aceites pelos dois auditores
- Uma disputa fica com o engenheiro
- Cada achado nomeia a alteração
- Isto não certifica a câmara

**Dizer**

Nesta linha de base, os dois auditores concordam em três dos quatro problemas plantados e deixam o quarto em disputa. Cada achado aceite nomeia a alteração que põe o projeto de volta dentro das regras. Reponham o método de verificação, o controlo de contaminação e a qualificação do rideshare, e esses três achados desaparecem. O engenheiro continua a aceitar ou a dispensar. Isto não certifica a câmara.

**Notas**

Impacto 20%. Dizer os três, a disputa e a decisão humana. Sem percentagem.

## Diapositivo 6 — O sistema de origem

**4:00–4:18**

**No diapositivo**

- O sistema de origem
- Google Drive + Git
- 317 ficheiros ECSS
- Requisitos
- FMEA
- Plano de verificação

**Dizer**

O sistema de origem são dois sítios. Uma pasta Google Drive guarda os 317 ficheiros ECSS. Um repositório Git guarda o pacote de projeto — os requisitos, a FMEA e o plano de verificação — e as fichas. A demonstração não lê os 317 ficheiros.

**Notas**

Implementação técnica 30%. Dizer Google Drive, o repositório Git, o pacote de projeto e as fichas. Dizer requisitos, FMEA e plano de verificação. Sem URL neste diapositivo.

## Diapositivo 7 — Quatro domínios de dados

**4:18–4:50**

**No diapositivo**

- Índice de aplicabilidade ECSS
- Fichas no Git. Não são os 317 ficheiros.
- Configuração do projeto
- Registo de achados
- Restrições do rideshare da Falcon 9

**Dizer**

Quatro domínios de dados. O índice de aplicabilidade ECSS. A configuração do projeto. O registo de achados. E as restrições do rideshare da Falcon 9. O índice é o recorte em fichas no repositório Git. Depois o segundo auditor, depois a pessoa.

**Notas**

Implementação técnica 30%. Os 317 ficheiros ficam no Drive. A demonstração lê as fichas.

## Diapositivo 8 — A próxima revisão

**4:50–5:00**

**No diapositivo**

- A próxima revisão desta câmara
- O especialista fica com a disputa
- Obrigado

**Dizer**

A seguir levamos as mesmas fichas à próxima revisão desta classe de câmara. O especialista gasta essa reunião na disputa. Obrigado.

**Notas**

Parar aos cinco minutos. Perguntas depois do relógio.

## Se um júri perguntar

- Os 317 ficheiros ECSS estão numa pasta Google Drive. O pacote de projeto e as fichas estão num repositório Git. Se pedirem a pasta, a ligação é https://drive.google.com/file/d/1H2dbtphO6zBMIbwKF5uQ5hnqZ46MCHEo/view. Dá-la só como resposta. Fica fora dos diapositivos.
- A demonstração lê as fichas, não todos os ficheiros da pasta. Citações abertas: ECSS-E-ST-10-02C Rev.1, 5.2.1e; ECSS-E-ST-10C Rev.1, 5.2.3.4a; ECSS-Q-ST-70C Rev.2, 4.4a; ECSS-E-ST-10-03C Rev.1, 4.5.2a; ECSS-Q-ST-30C Rev.1, 6.4.2.2a. A FMEA fica em disputa: a cláusula exige a análise e não exige uma segunda câmara. Sem secção do guia de rideshare.
- Pirotecnia, explosivos e propulsão ficam fora desta câmara.
- Nada neste palco é um certificado de conformidade.
