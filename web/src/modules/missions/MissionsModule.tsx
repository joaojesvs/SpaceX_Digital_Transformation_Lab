import type { Locale } from "../../platform/locale";

const GATES = ["MCR", "SRR", "MDR", "SDR", "PDR", "CDR", "PRR", "TRR", "SAR", "ORR", "FRR"] as const;

const copy = {
  subtitle: {
    en: "6U optical camera  ·  Falcon 9 rideshare",
    pt: "Câmara ótica 6U  ·  Rideshare da Falcon 9",
  },
  now: { en: "PDR", pt: "PDR" },
  next: { en: "Next, CDR", pt: "Seguinte, CDR" },
  budget: { en: "Budget", pt: "Orçamento" },
  total: { en: "Total", pt: "Total" },
  spent: { en: "Spent", pt: "Gasto" },
  left: { en: "Left", pt: "Restante" },
  allocation: { en: "Allocation", pt: "Atribuição" },
  camera: { en: "Camera", pt: "Câmara" },
  platform: { en: "Platform", pt: "Plataforma" },
  ait: { en: "AIT", pt: "AIT" },
  ops: { en: "Operations", pt: "Operações" },
  findings: { en: "Findings", pt: "Constatações" },
  agreed: { en: "agreed", pt: "em acordo" },
  dispute: { en: "in dispute", pt: "em disputa" },
  order: { en: "Review order", pt: "Ordem de revisão" },
  caption: {
    en: "SRR done  ·  PDR now  ·  CDR in 8 weeks",
    pt: "SRR feita  ·  PDR agora  ·  CDR em 8 semanas",
  },
  onList: { en: "On the list", pt: "Na lista" },
  halcyon: { en: "Hosted S-band beacon  ·  SRR", pt: "Baliza em banda S  ·  SRR" },
  cinder: { en: "12U thermal pathfinder  ·  MDR", pt: "Demonstrador térmico 12U  ·  MDR" },
};

const allocation = [
  { key: "camera", label: copy.camera, value: 980000, swatch: "#e4b15a" },
  { key: "platform", label: copy.platform, value: 720000, swatch: "rgba(228, 177, 90, 0.72)" },
  { key: "ait", label: copy.ait, value: 460000, swatch: "rgba(228, 177, 90, 0.5)" },
  { key: "ops", label: copy.ops, value: 240000, swatch: "rgba(228, 177, 90, 0.3)" },
] as const;

const quiet = [
  { name: "Halcyon-3", text: copy.halcyon },
  { name: "Cinder-2", text: copy.cinder },
];

function euro(value: number) {
  return `€${value.toLocaleString("en-GB")}`;
}

function GateStar() {
  return (
    <svg className="gate-star" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path fill="currentColor" d="M7 0.64 7.67 6.33 13.36 7 7.67 7.67 7 13.36 6.33 7.67 0.64 7 6.33 6.33Z" />
    </svg>
  );
}

export function MissionsModule({ locale }: { locale: Locale }) {
  const spent = 1100000;
  const total = 2400000;
  const remaining = 1300000;
  const chartLabel = `${copy.spent[locale]} ${euro(spent)}. ${copy.left[locale]} ${euro(remaining)}. ${copy.total[locale]} ${euro(total)}.`;

  return (
    <div className="bento">
      <header className="bento-head">
        <div>
          <h1>Lumen-1</h1>
          <p className="bento-sub">{copy.subtitle[locale]}</p>
        </div>
        <div className="phase-pills">
          <span className="pill-now">{copy.now[locale]}</span>
          <span className="pill-next">{copy.next[locale]}</span>
        </div>
      </header>

      <div className="bento-charts">
        <article className="tile">
          <h2 className="tile-label">{copy.budget[locale]}</h2>
          <div className="budget-body">
            <svg width="188" height="188" viewBox="0 0 188 188" role="img" aria-label={chartLabel}>
              <path
                d="M188 94C188 145.915 145.915 188 94 188C42.0852 188 0 145.915 0 94C0 42.0852 42.0852 0 94 0C145.915 0 188 42.0852 188 94ZM28.2 94C28.2 130.34 57.6597 159.8 94 159.8C130.34 159.8 159.8 130.34 159.8 94C159.8 57.6597 130.34 28.2 94 28.2C57.6597 28.2 28.2 57.6597 28.2 94Z"
                fill="#F6F1E8"
                fillOpacity="0.12"
              />
              <path
                d="M94 0C116.805 0 138.833 8.29056 155.979 23.3271C173.124 38.3636 184.219 59.1205 187.196 81.7305C190.172 104.341 184.828 127.262 172.158 146.224C159.488 165.185 140.357 178.895 118.329 184.797L111.03 157.558C126.45 153.426 139.842 143.83 148.711 130.557C157.58 117.283 161.321 101.238 159.237 85.4114C157.153 69.5843 149.387 55.0545 137.385 44.5289C125.383 34.0034 109.964 28.2 94 28.2L94 0Z"
                fill="#E4B15A"
              />
            </svg>
            <div className="figures">
              <p>
                <span className="figure-label">{copy.total[locale]}</span>
                <span className="figure">{euro(total)}</span>
              </p>
              <p>
                <span className="figure-label">{copy.spent[locale]}</span>
                <span className="figure figure-spent">{euro(spent)}</span>
              </p>
              <p>
                <span className="figure-label">{copy.left[locale]}</span>
                <span className="figure figure-left">{euro(remaining)}</span>
              </p>
            </div>
          </div>
        </article>

        <article className="tile">
          <h2 className="tile-label">{copy.allocation[locale]}</h2>
          <div className="stack-bar" role="img" aria-label={allocation.map((row) => `${row.label[locale]} ${euro(row.value)}`).join(". ")}>
            {allocation.map((row) => (
              <span key={row.key} className={row.key} />
            ))}
          </div>
          <ul className="legend">
            {allocation.map((row) => (
              <li key={row.key}>
                <span className="legend-name">
                  <i className="swatch" style={{ background: row.swatch }} />
                  {row.label[locale]}
                </span>
                <span className="amt">{euro(row.value)}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>

      <div className="bento-status">
        <article className="tile">
          <h2 className="tile-label">{copy.findings[locale]}</h2>
          <div className="counts">
            <p className="count-agreed">
              <span className="count-num">3</span>
              <span className="count-label">{copy.agreed[locale]}</span>
            </p>
            <p className="count-dispute">
              <span className="count-num">1</span>
              <span className="count-label">{copy.dispute[locale]}</span>
            </p>
          </div>
          <svg className="pips" width="58" height="10" viewBox="0 0 58 10" aria-hidden="true">
            <circle cx="5" cy="5" r="4.25" fill="#E4B15A" stroke="#E4B15A" strokeWidth="1.5" />
            <circle cx="21" cy="5" r="4.25" fill="#E4B15A" stroke="#E4B15A" strokeWidth="1.5" />
            <circle cx="37" cy="5" r="4.25" fill="#E4B15A" stroke="#E4B15A" strokeWidth="1.5" />
            <circle cx="53" cy="5" r="4.25" fill="none" stroke="#E4B15A" strokeWidth="1.5" />
          </svg>
        </article>

        <article className="tile">
          <h2 className="tile-label">{copy.order[locale]}</h2>
          <ol className="gates">
            {GATES.map((gate, index) => {
              const state = gate === "PDR" ? "now" : index < 4 ? "done" : "later";
              return (
                <li key={gate} className={`is-${state}`} aria-current={gate === "PDR" ? "step" : undefined}>
                  {state === "now" ? <GateStar /> : <span className={`gate-dot is-${state}`} />}
                  <span className="gate-code">{gate}</span>
                </li>
              );
            })}
          </ol>
          <p className="phase-caption">{copy.caption[locale]}</p>
        </article>
      </div>

      <div className="bento-quiet">
        {quiet.map((mission) => (
          <article key={mission.name} className="quiet-row">
            <p className="quiet-main">
              <strong>{mission.name}</strong>
              <span>{mission.text[locale]}</span>
            </p>
            <p className="quiet-note">{copy.onList[locale]}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
