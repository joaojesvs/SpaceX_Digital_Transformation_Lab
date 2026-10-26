import type { Locale } from "../../platform/locale";
import { answer } from "../../platform/answers";
import { useSession } from "../../platform/session";

const GATES = ["MCR", "SRR", "MDR", "SDR", "PDR", "CDR", "PRR", "TRR", "SAR", "ORR", "FRR"] as const;

const copy = {
  kicker: { en: "Lumen-1  ·  Demo", pt: "Lumen-1  ·  Demonstração" },
  title: { en: "Missions", pt: "Missões" },
  lumen: {
    en: "6U CubeSat optical camera. Falcon 9 rideshare, piggyback.",
    pt: "Câmara ótica num CubeSat 6U. Rideshare da Falcon 9, em piggyback.",
  },
  stays: { en: "Stays on this list.", pt: "Fica nesta lista." },
  halcyon: { en: "Hosted S-band beacon. Phase SRR.", pt: "Baliza em banda S. Fase SRR." },
  cinder: { en: "12U thermal pathfinder. Phase MDR.", pt: "Demonstrador térmico 12U. Fase MDR." },
  budget: { en: "Budget", pt: "Orçamento" },
  spent: { en: "Spent", pt: "Gasto" },
  left: { en: "Left", pt: "Restante" },
  split: { en: "Split", pt: "Repartição" },
  camera: { en: "Camera", pt: "Câmara" },
  platform: { en: "Platform", pt: "Plataforma" },
  ait: { en: "AIT", pt: "AIT" },
  ops: { en: "Operations", pt: "Operações" },
  findings: { en: "Findings", pt: "Constatações" },
  agreed: { en: "3 agreed", pt: "3 em acordo" },
  dispute: { en: "1 in dispute", pt: "1 em disputa" },
  phase: { en: "Phase  ·  PDR of 11", pt: "Fase  ·  PDR de 11" },
  srr: { en: "SRR done", pt: "SRR feita" },
  pdr: { en: "PDR now", pt: "PDR agora" },
  cdr: { en: "CDR in 8 weeks", pt: "CDR em 8 semanas" },
  feed: { en: "This session", pt: "Nesta sessão" },
  feedNote: {
    en: "The corner chat writes into this open mission.",
    pt: "O chat do canto escreve nesta missão aberta.",
  },
  empty: { en: "No lines yet.", pt: "Ainda não há linhas." },
  log: { en: "Log", pt: "Diário" },
  question: { en: "Question", pt: "Pergunta" },
};

const split = [
  { label: copy.camera, value: 980000 },
  { label: copy.platform, value: 720000 },
  { label: copy.ait, value: 460000 },
  { label: copy.ops, value: 240000 },
];

const others = [
  { id: "halcyon-3", name: "Halcyon-3", text: copy.halcyon },
  { id: "cinder-2", name: "Cinder-2", text: copy.cinder },
];

function euro(value: number) {
  return `€${value.toLocaleString("en-GB")}`;
}

export function MissionsModule({ locale }: { locale: Locale }) {
  const { notes } = useSession();
  const spent = 1100000;
  const total = 2400000;
  const remaining = 1300000;

  return (
    <div className="stack">
      <p className="demo-kicker">{copy.kicker[locale]}</p>
      <h1 className="serif-title">{copy.title[locale]}</h1>
      <p className="lede">{copy.lumen[locale]}</p>
      <div className="chart-grid">
        <article className="chart-card chart-budget">
          <p className="chart-label">{copy.budget[locale]}</p>
          <p className="chart-figure">{euro(total)}</p>
          <svg className="budget-bar" viewBox="0 0 400 10" role="img" aria-label={`${copy.spent[locale]} ${euro(spent)}. ${copy.left[locale]} ${euro(remaining)}.`}>
            <rect x="0" y="1" width="400" height="8" rx="4" fill="#a87b3a" />
            <rect x="0" y="1" width={(spent / total) * 400} height="8" rx="4" fill="#e4b15a" />
          </svg>
          <p className="chart-meta">
            {copy.spent[locale]} {euro(spent)}
            <span>{copy.left[locale]} {euro(remaining)}</span>
          </p>
        </article>
        <article className="chart-card">
          <p className="chart-label">{copy.split[locale]}</p>
          <ul className="split-list">
            {split.map((row) => (
              <li key={row.label.en}>
                <span>{row.label[locale]} {euro(row.value)}</span>
                <svg viewBox="0 0 160 6" aria-hidden="true">
                  <rect x="0" y="0" width={(row.value / 980000) * 160} height="6" rx="3" fill="#e4b15a" />
                </svg>
              </li>
            ))}
          </ul>
        </article>
        <article className="chart-card">
          <p className="chart-label">{copy.findings[locale]}</p>
          <p className="chart-strong">{copy.agreed[locale]}</p>
          <p className="chart-gold">{copy.dispute[locale]}</p>
        </article>
        <article className="chart-card chart-phase">
          <p className="chart-label">{copy.phase[locale]}</p>
          <ol className="gate-dots">
            {GATES.map((gate, index) => (
              <li key={gate} className={gate === "PDR" ? "is-now" : index < 4 ? "is-earlier" : "is-later"} aria-current={gate === "PDR" ? "step" : undefined}>
                {gate === "PDR" ? (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="currentColor" d="M12 1.1 13.15 10.85 22.9 12 13.15 13.15 12 22.9 10.85 13.15 1.1 12 10.85 10.85Z" />
                  </svg>
                ) : (
                  <span />
                )}
                <em>{gate}</em>
              </li>
            ))}
          </ol>
          <p className="chart-meta">
            {copy.srr[locale]}
            <span>{copy.pdr[locale]}</span>
            <span>{copy.cdr[locale]}</span>
          </p>
        </article>
      </div>
      <div className="mission-list">
        {others.map((mission) => (
          <article key={mission.id} className="card mission-side">
            <h2>{mission.name}</h2>
            <p>{mission.text[locale]}</p>
            <p className="quiet">{copy.stays[locale]}</p>
          </article>
        ))}
      </div>
      <section className="card" id="mission-activity" aria-live="polite">
        <p className="kicker">{copy.feed[locale]}</p>
        <p className="quiet">{copy.feedNote[locale]}</p>
        {notes.length === 0 ? <p>{copy.empty[locale]}</p> : null}
        <ul className="feed">
          {notes.map((note) => (
            <li key={note.id}>
              <span className="pill">{note.kind === "log" ? copy.log[locale] : copy.question[locale]}</span>
              <p>{note.text}</p>
              {note.intent ? <p className="quiet">{answer(locale, note.intent)}</p> : null}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
