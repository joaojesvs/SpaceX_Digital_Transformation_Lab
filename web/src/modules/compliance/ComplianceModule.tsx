import "./compliance.css";

type FindingStatus = "agreed" | "dispute";

type Finding = {
  id: string;
  status: FindingStatus;
  layer: string;
  title: string;
  clauses: string[];
  body: string[];
  change: string;
  dispute?: string;
};

type WaitingRow = {
  id: string;
  title: string;
  body: string[];
};

type ComplianceCopy = {
  kicker: string;
  title: string;
  lede: string;
  legend: string;
  judged: string;
  waiting: string;
  layerWord: string;
  agreed: string;
  dispute: string;
  notOpened: string;
  notPass: string;
  change: string;
  differ: string;
  agreedCount: string;
  disputeCount: string;
  waitingCount: string;
  footnote: string;
  findings: Finding[];
  closed: WaitingRow[];
};

const copy: Record<"en" | "pt", ComplianceCopy> = {
  en: {
    kicker: "Lumen-1",
    title: "Compliance",
    lede: "Cross-check of the layers for this camera. Only four findings are judged.",
    legend:
      "Agreed means both auditors agree the gap is real. It is not a pass. An unopened layer is not a pass.",
    judged: "Judged",
    waiting: "Not opened",
    layerWord: "Layer",
    agreed: "Agreed · critical",
    dispute: "In dispute",
    notOpened: "Not opened",
    notPass: "Not a pass",
    change: "Change",
    differ: "Where they differ",
    agreedCount: "agreed findings",
    disputeCount: "in dispute",
    waitingCount: "not opened",
    footnote: "This cross-check is not a compliance certificate.",
    findings: [
      {
        id: "F-01",
        status: "agreed",
        layer: "Verification",
        title: "Missing verification method for REQ-IMG-03 (optical MTF).",
        clauses: ["ECSS-E-ST-10-02C Rev.1 5.2.1e", "ECSS-E-ST-10C Rev.1 5.2.3.4a"],
        body: [
          "Both auditors agree this gap is critical at PDR.",
          "REQ-IMG-03 sets an on-orbit modulation transfer function of at least 0.15 at Nyquist. The verification matrix leaves method, level, and stage empty.",
          "ECSS-E-ST-10-02C Rev.1 5.2.1e requires a verification strategy in that matrix: the methods, the product level, and the stage. ECSS-E-ST-10C Rev.1 5.2.3.4a requires a verification method on each requirement in the technical specification. The row has neither, so the requirement cannot be closed.",
        ],
        change:
          "Set REQ-IMG-03 to test, at equipment level, in qualification, on an optical bench that measures modulation transfer at Nyquist.",
      },
      {
        id: "F-02",
        status: "agreed",
        layer: "Contamination",
        title: "Missing contamination / outgassing control on the optic.",
        clauses: ["ECSS-Q-ST-70C Rev.2 4.4a"],
        body: [
          "Both auditors agree this gap is critical at PDR.",
          "The lens, the silicone stake, the anodized baffle, and the coated filter sit in view of the detector. The baseline has no cleanliness level, no contamination budget, and no outgassing control. The integration line is to assemble on a clean bench.",
          "ECSS-Q-ST-70C Rev.2 4.4a requires a contamination and cleanliness control programme. The baseline does not have one. A film or a particle on this optic lowers the modulation the image requirements ask for.",
        ],
        change:
          "Add the cleanliness programme and an outgassing evaluation of every material in view of the detector, including the silicone, and give that requirement a verification method.",
      },
      {
        id: "F-03",
        status: "agreed",
        layer: "Launch qualification",
        title: "Missing qualification against the rideshare mechanical environment.",
        clauses: ["ECSS-E-ST-10-03C Rev.1 4.5.2a"],
        body: [
          "Both auditors agree this gap is critical at PDR.",
          "REQ-MEC-01 says the camera survives the Falcon 9 rideshare mechanical environment and keeps optical alignment. The campaign marks random vibration, sine, shock, static load, and acoustic as not applicable, because the dispenser vendor covers launch. There is no qualification model and no protoflight model.",
          "ECSS-E-ST-10-03C Rev.1 4.5.2a asks for qualification evidence that the item meets its specification in the intended environments, with the qualification margins, on a qualification model or under a protoflight approach. That evidence is missing. The rideshare guide is not opened, so no section and no load factor are stated.",
        ],
        change:
          "Plan a qualification or protoflight campaign for a flight-representative camera against the rideshare mechanical environment, and point REQ-MEC-01 at that campaign. Fill the environment levels when the guide is opened.",
      },
      {
        id: "F-04",
        status: "dispute",
        layer: "Reliability",
        title: "Reliability asserted with no FMEA.",
        clauses: ["ECSS-Q-ST-30C Rev.1 6.4.2.2a"],
        body: [
          "REQ-REL-01 states 0.95 over two years. The file shows one detector, one controller, and one power feed. The only evidence is that the detector is commercial and that cameras of this class have flown. There is no failure-modes analysis.",
          "ECSS-Q-ST-30C Rev.1 6.4.2.2a requires the analysis, not a second camera.",
        ],
        change:
          "Do not add a second camera to close this row. The human decides whether to drop 0.95 until an FMEA exists, or to keep the single string once the analysis records that architecture and the accepted consequences.",
        dispute:
          "Both auditors see the missing analysis. They do not agree that a single string is the non-conformance. A science camera on a rideshare CubeSat can stay one string if the analysis records that architecture and the accepted consequences. The human decides.",
      },
    ],
    closed: [
      {
        id: "iso",
        title: "ISO",
        body: [
          "No ISO document was opened for Lumen-1. No clause is named, and nothing in this row is judged.",
        ],
      },
      {
        id: "rideshare-guide",
        title: "SpaceX Rideshare Payload User's Guide",
        body: [
          "The guide was not opened. No section and no load factor are stated. The blank row is not evidence that the rideshare environment is met.",
        ],
      },
    ],
  },
  pt: {
    kicker: "Lumen-1",
    title: "Conformidade",
    lede: "Cruzamento das camadas desta câmara. Só quatro achados são julgados.",
    legend:
      "Acordado significa que os dois auditores concordam que a falha é real. Não é uma aprovação. Uma camada por abrir não é uma aprovação.",
    judged: "Julgados",
    waiting: "Por abrir",
    layerWord: "Camada",
    agreed: "Acordado · crítico",
    dispute: "Em disputa",
    notOpened: "Não aberto",
    notPass: "Não é uma aprovação",
    change: "Alteração",
    differ: "Onde divergem",
    agreedCount: "achados acordados",
    disputeCount: "em disputa",
    waitingCount: "por abrir",
    footnote: "Este cruzamento não é um certificado de conformidade.",
    findings: [
      {
        id: "F-01",
        status: "agreed",
        layer: "Verificação",
        title: "Método de verificação em falta no REQ-IMG-03 (MTF ótica).",
        clauses: ["ECSS-E-ST-10-02C Rev.1 5.2.1e", "ECSS-E-ST-10C Rev.1 5.2.3.4a"],
        body: [
          "Os dois auditores concordam que esta falha é crítica na PDR.",
          "O REQ-IMG-03 fixa uma função de transferência de modulação em órbita de pelo menos 0,15 em Nyquist. A matriz de verificação deixa método, nível e fase por preencher.",
          "A ECSS-E-ST-10-02C Rev.1 5.2.1e exige uma estratégia de verificação nessa matriz: os métodos, o nível de produto e a fase. A ECSS-E-ST-10C Rev.1 5.2.3.4a exige um método de verificação em cada requisito da especificação técnica. A linha não tem nenhum dos dois, por isso o requisito não pode ser fechado.",
        ],
        change:
          "Pôr o REQ-IMG-03 como ensaio, ao nível do equipamento, na qualificação, num banco ótico que meça a transferência de modulação em Nyquist.",
      },
      {
        id: "F-02",
        status: "agreed",
        layer: "Contaminação",
        title: "Controlo de contaminação / desgaseificação em falta na ótica.",
        clauses: ["ECSS-Q-ST-70C Rev.2 4.4a"],
        body: [
          "Os dois auditores concordam que esta falha é crítica na PDR.",
          "A lente, o silicone de fixação, o baffle anodizado e o filtro com revestimento estão na vista do detetor. A linha de base não tem nível de limpeza, orçamento de contaminação, nem controlo de desgaseificação. A integração é montar num banco limpo.",
          "A ECSS-Q-ST-70C Rev.2 4.4a exige um programa de controlo de contaminação e limpeza. A linha de base não o tem. Uma película ou uma partícula nesta ótica baixa a modulação que os requisitos de imagem pedem.",
        ],
        change:
          "Acrescentar o programa de limpeza e uma avaliação de desgaseificação de cada material na vista do detetor, incluindo o silicone, e dar a esse requisito um método de verificação.",
      },
      {
        id: "F-03",
        status: "agreed",
        layer: "Qualificação de lançamento",
        title: "Qualificação em falta face ao ambiente mecânico do rideshare.",
        clauses: ["ECSS-E-ST-10-03C Rev.1 4.5.2a"],
        body: [
          "Os dois auditores concordam que esta falha é crítica na PDR.",
          "O REQ-MEC-01 diz que a câmara sobrevive ao ambiente mecânico do rideshare da Falcon 9 e mantém o alinhamento ótico. A campanha marca vibração aleatória, seno, choque, carga estática e acústica como não aplicáveis, porque o fornecedor do dispenser cobre o lançamento. Não há modelo de qualificação nem modelo protoflight.",
          "A ECSS-E-ST-10-03C Rev.1 4.5.2a pede evidência de qualificação de que o item cumpre a especificação nos ambientes previstos, com as margens de qualificação, num modelo de qualificação ou numa abordagem protoflight. Essa evidência não existe. O guia de rideshare não foi aberto, por isso não há secção nem fator de carga.",
        ],
        change:
          "Planear uma campanha de qualificação ou protoflight de uma câmara representativa de voo contra o ambiente mecânico do rideshare, e apontar o REQ-MEC-01 para essa campanha. Preencher os níveis do ambiente quando o guia for aberto.",
      },
      {
        id: "F-04",
        status: "dispute",
        layer: "Fiabilidade",
        title: "Fiabilidade afirmada sem FMEA.",
        clauses: ["ECSS-Q-ST-30C Rev.1 6.4.2.2a"],
        body: [
          "O REQ-REL-01 declara 0,95 ao longo de dois anos. O ficheiro mostra um detetor, um controlador e uma alimentação. A única evidência é que o detetor é comercial e que câmaras desta classe já voaram. Não há análise de modos de falha.",
          "A ECSS-Q-ST-30C Rev.1 6.4.2.2a exige a análise, não uma segunda câmara.",
        ],
        change:
          "Não acrescentar uma segunda câmara para fechar esta linha. A pessoa decide se retira o 0,95 até existir uma FMEA, ou se mantém a cadeia simples quando a análise registar essa arquitetura e as consequências aceites.",
        dispute:
          "Os dois auditores veem a análise em falta. Não concordam que uma cadeia simples seja a não-conformidade. Uma câmara científica num CubeSat de rideshare pode manter uma cadeia simples se a análise registar essa arquitetura e as consequências aceites. A pessoa decide.",
      },
    ],
    closed: [
      {
        id: "iso",
        title: "ISO",
        body: [
          "Nenhum documento ISO foi aberto para a Lumen-1. Não se nomeia nenhuma cláusula e nada nesta linha é julgado.",
        ],
      },
      {
        id: "rideshare-guide",
        title: "Guia do utilizador de carga útil Rideshare da SpaceX",
        body: [
          "O guia não foi aberto. Não há secção nem fator de carga. A linha em branco não é evidência de que o ambiente de rideshare está cumprido.",
        ],
      },
    ],
  },
};

export function ComplianceModule({ locale }: { locale: "en" | "pt" }) {
  const text = copy[locale];
  const agreedCount = text.findings.filter((item) => item.status === "agreed").length;
  const disputeCount = text.findings.length - agreedCount;
  const htmlLang = locale === "pt" ? "pt-PT" : "en";

  return (
    <section className="astraea-compliance" lang={htmlLang} aria-labelledby="astraea-compliance-title">
      <p className="ac-kicker">{text.kicker}</p>
      <h1 className="ac-title" id="astraea-compliance-title">
        {text.title}
      </h1>
      <p className="ac-lede">{text.lede}</p>
      <p className="ac-legend">{text.legend}</p>
      <ul className="ac-counts">
        <li>
          {agreedCount} {text.agreedCount}
        </li>
        <li>
          {disputeCount} {text.disputeCount}
        </li>
        <li>
          {text.closed.length} {text.waitingCount}
        </li>
      </ul>

      <h2 className="ac-section">{text.judged}</h2>
      <div className="ac-stack">
        {text.findings.map((item) => (
          <article key={item.id} className={`ac-card ac-card-${item.status}`} id={`compliance-${item.id}`}>
            <div className="ac-card-top">
              <p className="ac-id">{item.id}</p>
              <p className={item.status === "agreed" ? "ac-pill ac-pill-agreed" : "ac-pill ac-pill-dispute"}>
                {item.status === "agreed" ? text.agreed : text.dispute}
              </p>
            </div>
            <p className="ac-layer">{item.layer}</p>
            <h3>{item.title}</h3>
            <ul className="ac-clauses">
              {item.clauses.map((clause) => (
                <li key={clause}>{clause}</li>
              ))}
            </ul>
            {item.body.map((paragraph) => (
              <p className="ac-body" key={paragraph}>
                {paragraph}
              </p>
            ))}
            <p className="ac-change">
              <span>{text.change}</span>
              {item.change}
            </p>
            {item.dispute ? (
              <p className="ac-dispute">
                <span>{text.differ}</span>
                {item.dispute}
              </p>
            ) : null}
          </article>
        ))}
      </div>

      <h2 className="ac-section">{text.waiting}</h2>
      <div className="ac-stack">
        {text.closed.map((item) => (
          <article key={item.id} className="ac-card ac-card-wait" id={`compliance-${item.id}`}>
            <div className="ac-card-top">
              <p className="ac-id">{text.layerWord}</p>
              <p className="ac-pill ac-pill-wait">{text.notOpened}</p>
              <p className="ac-not-pass">{text.notPass}</p>
            </div>
            <h3>{item.title}</h3>
            {item.body.map((paragraph) => (
              <p className="ac-body" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </article>
        ))}
      </div>

      <p className="ac-footnote">{text.footnote}</p>
    </section>
  );
}
