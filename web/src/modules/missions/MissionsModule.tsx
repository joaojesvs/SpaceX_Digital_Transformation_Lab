import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Locale } from "../../platform/locale";

const GATES = ["MCR", "SRR", "MDR", "SDR", "PDR", "CDR", "PRR", "TRR", "SAR", "ORR", "FRR"] as const;

const copy = {
  demo: { en: "Demo", pt: "Demonstração" },
  findings: { en: "Findings", pt: "Constatações" },
  agreed: { en: "agreed", pt: "em acordo" },
  dispute: { en: "in dispute", pt: "em disputa" },
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
  const agreed = useCount(3, reduced);
  const dispute = useCount(1, reduced);

  const activity = [
    { key: "srr", mark: "SRR", title: copy.srr[locale], aside: copy.done[locale], tone: "done" },
    { key: "pdr", mark: "PDR", title: copy.pdr[locale], aside: copy.now[locale], tone: "now" },
    { key: "cdr", mark: "CDR", title: copy.cdr[locale], aside: copy.weeks[locale], tone: "next" },
    { key: "halcyon", mark: "H3", title: "Halcyon-3", aside: copy.onList[locale], detail: copy.halcyon[locale], tone: "quiet" },
    { key: "cinder", mark: "C2", title: "Cinder-2", aside: copy.onList[locale], detail: copy.cinder[locale], tone: "quiet" },
  ];

  return (
    <div className="bento">
      <div className="stat-row compact">
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
