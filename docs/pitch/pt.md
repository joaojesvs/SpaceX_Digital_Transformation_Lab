# Pitch em português (paralelo)

**Duração:** 5:00. O pitch julgado é o inglês. **Prazo da sala:** 27 de outubro de 2026, 13:00, hora de Lisboa.

**Missão:** carga útil ótica de um CubeSat — uma câmara — num rideshare da Falcon 9. Manter este instrumento em toda a fala.

**Biblioteca:** 317 ficheiros ECSS numa pasta Google Drive, a chegar por partes. Um repositório Git guarda o pacote de projeto e as fichas. A demonstração lê as fichas, não os 317 ficheiros. A ligação do Drive não é pública. Não inventar um URL.

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
- Não inventar um URL. A ligação do Drive ainda não é pública. Se a pedirem, dizer que não é pública.
- Fichas que se podem nomear: ECSS-E-ST-10, ECSS-E-ST-10-02, ECSS-Q-ST-30, ECSS-Q-ST-70, ECSS-E-ST-10-03, e o guia público SpaceX Rideshare Payload User's Guide.
- Frases nossas e o identificador da cláusula. Não ler o texto da cláusula. Não ler o guia do rideshare em voz alta.
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

- Sem método de verificação — os dois concordam
- Sem controlo de contaminação ou desgaseificação — os dois concordam
- Sem qualificação às cargas do rideshare — os dois concordam
- Câmara em cadeia única, sem FMEA — em disputa

**Dizer**

Primeiro. Um requisito não tem método de verificação. Os dois auditores concordam. A alteração é um método — ensaio, análise, inspeção ou revisão do desenho — para se manter rastreável ao abrigo da ECSS-E-ST-10 e da ECSS-E-ST-10-02.

Segundo. Não há controlo de contaminação nem de desgaseificação na ótica. Os dois concordam. A alteração é um controlo das superfícies óticas, ao abrigo da ECSS-Q-ST-70. Uma ótica embaciada não tira a fotografia.

Terceiro. Não há qualificação contra as cargas de lançamento do rideshare. Os dois concordam. A alteração é uma qualificação para o ambiente mecânico da Falcon 9, ao abrigo da ECSS-E-ST-10-03, ao lado do nosso resumo do guia público do rideshare.

Quarto. A câmara é de cadeia única. A fiabilidade é afirmada, e não há FMEA. Este fica em disputa. Um auditor quer a análise ao abrigo da ECSS-Q-ST-30. O outro não fecha o achado. Deixo-o em aberto e aceito um dos três primeiros. O engenheiro decide. A linha de base não é editada.

**Notas**

Inovação 30% e apresentação 20%. Apontar para o cartão do achado. Veredictos, por ordem: concordam, concordam, concordam, disputa. Se o relógio apertar, cortar a lista de métodos e manter cada veredicto e a alteração.

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

Quatro domínios de dados. O índice de aplicabilidade ECSS. A configuração do projeto. O registo de achados. E as restrições do rideshare da Falcon 9. O índice é o recorte em fichas no repositório Git: engenharia de sistemas, verificação, fiabilidade, materiais e contaminação, ensaios, e o guia do rideshare. Depois o segundo auditor, depois a pessoa.

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

- Os 317 ficheiros ECSS estão numa pasta Google Drive. O pacote de projeto e as fichas estão num repositório Git. A ligação do Drive não é pública. Não inventar uma.
- A demonstração lê as fichas, não todos os ficheiros da pasta. A ficha declara o identificador de que foi escrita.
- Pirotecnia, explosivos e propulsão ficam fora desta câmara.
- Nada neste palco é um certificado de conformidade.
