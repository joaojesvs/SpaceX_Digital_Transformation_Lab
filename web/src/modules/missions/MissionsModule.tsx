import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Locale } from "../../platform/locale";

const GATES = ["MCR", "SRR", "MDR", "SDR", "PDR", "CDR", "PRR", "TRR", "SAR", "ORR", "FRR"] as const;

const TOTAL = 2_400_000;
const SPENT = 1_100_000;
const LEFT = 1_300_000;
const SPENT_RATIO = SPENT / TOTAL;

const copy = {
  demo: { en: "Demo", pt: "Demonstração" },
  budget: { en: "Budget", pt: "Orçamento" },
  total: { en: "Total", pt: "Total" },
  spent: { en: "Spent", pt: "Gasto" },
  left: { en: "Left", pt: "Restante" },
  ofBudget: { en: "of the demo budget", pt: "do orçamento de demonstração" },
  findings: { en: "Findings", pt: "Constatações" },
  agreed: { en: "agreed", pt: "em acordo" },
  dispute: { en: "in dispute", pt: "em disputa" },
  allocation: { en: "Allocation", pt: "Atribuição" },
  camera: { en: "Camera", pt: "Câmara" },
  platform: { en: "Platform", pt: "Plataforma" },
  ait: { en: "AIT", pt: "AIT" },
  ops: { en: "Operations", pt: "Operações" },
  activity: { en: "Recent activity", pt: "Atividade recente" },
  order: { en: "Review order", pt: "Ordem de revisão" },
  now: { en: "Now", pt: "Agora" },
  done: { en: "Done", pt: "Feita" },
  weeks: { en: "In 8 weeks", pt: "Em 8 semanas" },
  onList: { en: "On the list", pt: "Na lista" },
  srr: { en: "System requirements", pt: "Requisitos de sistema" },
  pdr: { en: "Preliminary design", pt: "Projeto preliminar" },
  cdr: { en: "Critical design", pt: "Projeto crítico" },
  halcyon: { en: "Hosted S-band beacon · SRR", pt: "Baliza em banda S · SRR" },
  cinder: { en: "12U thermal pathfinder · MDR", pt: "Demonstrador térmico 12U · MDR" },
};

const allocation = [
  { key: "camera", label: copy.camera, value: 980_000, color: "#e4b15a" },
  { key: "platform", label: copy.platform, value: 720_000, color: "rgba(228, 177, 90, 0.72)" },
  { key: "ait", label: copy.ait, value: 460_000, color: "rgba(228, 177, 90, 0.5)" },
  { key: "ops", label: copy.ops, value: 240_000, color: "rgba(228, 177, 90, 0.3)" },
] as const;

function euro(value: number) {
  return `€${value.toLocaleString("en-GB")}`;
}

function useCount(target: number, reduced: boolean) {
  const [value, setValue] = useState(reduced ? target : 0);
  useEffect(() => {
    if (reduced) {
      setValue(target);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1100);
      const eased = 1 - (1 - t) ** 3;
      setValue(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, reduced]);
  return value;
}

function lift(reduced: boolean) {
  return reduced ? undefined : { y: -4 };
}

export function MissionsModule({ locale }: { locale: Locale }) {
  const reduced = useReducedMotion() === true;
  const total = useCount(TOTAL, reduced);
  const spent = useCount(SPENT, reduced);
  const left = useCount(LEFT, reduced);
  const agreed = useCount(3, reduced);
  const dispute = useCount(1, reduced);
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const chartLabel = `${copy.spent[locale]} ${euro(SPENT)}. ${copy.left[locale]} ${euro(LEFT)}. ${copy.total[locale]} ${euro(TOTAL)}. ${copy.demo[locale]}.`;

  const activity = [
    { key: "srr", mark: "SRR", title: copy.srr[locale], aside: copy.done[locale], tone: "done" },
    { key: "pdr", mark: "PDR", title: copy.pdr[locale], aside: copy.now[locale], tone: "now" },
    { key: "cdr", mark: "CDR", title: copy.cdr[locale], aside: copy.weeks[locale], tone: "next" },
    { key: "halcyon", mark: "H3", title: "Halcyon-3", aside: copy.onList[locale], detail: copy.halcyon[locale], tone: "quiet" },
    { key: "cinder", mark: "C2", title: "Cinder-2", aside: copy.onList[locale], detail: copy.cinder[locale], tone: "quiet" },
  ];

  return (
    <div className="bento">
      <div className="stat-row">
        <Stat label={copy.total[locale]} value={euro(total)} note={copy.demo[locale]} reduced={reduced} />
        <Stat label={copy.spent[locale]} value={euro(spent)} note={copy.ofBudget[locale]} gold reduced={reduced} />
        <Stat label={copy.left[locale]} value={euro(left)} note={copy.demo[locale]} reduced={reduced} />
        <motion.article className="stat-card" whileHover={lift(reduced)}>
          <p className="stat-label">{copy.findings[locale]}</p>
          <p className="stat-split">
            <span className="stat-value">{agreed}</span>
            <span className="stat-unit">{copy.agreed[locale]}</span>
            <span className="stat-value is-gold">{dispute}</span>
            <span className="stat-unit is-gold">{copy.dispute[locale]}</span>
          </p>
          <p className="stat-note">{copy.demo[locale]}</p>
        </motion.article>
      </div>

      <div className="chart-row">
        <motion.article className="tile chart-main" whileHover={lift(reduced)}>
          <header className="tile-head">
            <h2>{copy.budget[locale]}</h2>
            <span className="demo-pill">{copy.demo[locale]}</span>
          </header>
          <div className="ring-row">
            <div className="ring-wrap">
              <svg width="188" height="188" viewBox="0 0 188 188" role="img" aria-label={chartLabel}>
                <circle cx="94" cy="94" r={radius} fill="none" stroke="rgba(246,241,232,0.12)" strokeWidth="18" />
                <motion.circle
                  cx="94"
                  cy="94"
                  r={radius}
                  fill="none"
                  stroke="#e4b15a"
                  strokeWidth="18"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: reduced ? circumference * (1 - SPENT_RATIO) : circumference }}
                  animate={{ strokeDashoffset: circumference * (1 - SPENT_RATIO) }}
                  transition={{ duration: reduced ? 0 : 1.15, ease: [0.22, 1, 0.36, 1] }}
                  transform="rotate(-90 94 94)"
                />
              </svg>
              <p className="ring-center">
                <span>{Math.round(SPENT_RATIO * 100)}%</span>
                <em>{copy.spent[locale]}</em>
              </p>
            </div>
            <ul className="ring-legend">
              <li>
                <span>{copy.total[locale]}</span>
                <strong>{euro(TOTAL)}</strong>
              </li>
              <li className="is-gold">
                <span>{copy.spent[locale]}</span>
                <strong>{euro(SPENT)}</strong>
              </li>
              <li>
                <span>{copy.left[locale]}</span>
                <strong>{euro(LEFT)}</strong>
              </li>
            </ul>
          </div>
        </motion.article>

        <motion.article className="tile" whileHover={lift(reduced)}>
          <header className="tile-head">
            <h2>{copy.allocation[locale]}</h2>
            <span className="demo-pill">{copy.demo[locale]}</span>
          </header>
          <div
            className="stack-bar"
            role="img"
            aria-label={allocation.map((row) => `${row.label[locale]} ${euro(row.value)}`).join(". ")}
          >
            {allocation.map((row, index) => (
              <motion.span
                key={row.key}
                style={{ background: row.color, flexGrow: row.value, flexBasis: 0, transformOrigin: "left center" }}
                initial={reduced ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: reduced ? 0 : 0.85, delay: reduced ? 0 : 0.12 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
          </div>
          <ul className="legend">
            {allocation.map((row) => (
              <li key={row.key}>
                <span className="legend-name">
                  <i className="swatch" style={{ background: row.color }} />
                  {row.label[locale]}
                </span>
                <span className="amt">{euro(row.value)}</span>
              </li>
            ))}
          </ul>
        </motion.article>
      </div>

      <motion.article className="tile activity" whileHover={lift(reduced)}>
        <header className="tile-head">
          <h2>{copy.activity[locale]}</h2>
          <span className="tile-aside">{copy.order[locale]}</span>
        </header>
        <ol className="gates">
          {GATES.map((gate, index) => {
            const state = gate === "PDR" ? "now" : index < 4 ? "done" : "later";
            return (
              <li key={gate} className={`is-${state}`} aria-current={gate === "PDR" ? "step" : undefined}>
                <span className={state === "now" ? "gate-now" : `gate-dot is-${state}`} />
                <span className="gate-code">{gate}</span>
              </li>
            );
          })}
        </ol>
        <ul className="activity-list">
          {activity.map((row) => (
            <li key={row.key}>
              <span className={`activity-mark is-${row.tone}`}>{row.mark}</span>
              <span className="activity-copy">
                <strong>{row.title}</strong>
                {"detail" in row && row.detail ? <em>{row.detail}</em> : null}
              </span>
              <span className={`activity-aside is-${row.tone}`}>{row.aside}</span>
            </li>
          ))}
        </ul>
      </motion.article>
    </div>
  );
}

function Stat({
  label,
  value,
  note,
  gold,
  reduced,
}: {
  label: string;
  value: string;
  note: string;
  gold?: boolean;
  reduced: boolean;
}) {
  return (
    <motion.article className="stat-card" whileHover={lift(reduced)}>
      <p className="stat-label">{label}</p>
      <p className={gold ? "stat-value is-gold" : "stat-value"}>{value}</p>
      <p className="stat-note">{note}</p>
    </motion.article>
  );
}
