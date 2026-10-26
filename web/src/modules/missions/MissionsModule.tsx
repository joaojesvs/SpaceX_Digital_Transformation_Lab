import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Locale } from "../../platform/locale";

const GATES = ["MCR", "SRR", "MDR", "SDR", "PDR", "CDR", "PRR", "TRR", "SAR", "ORR", "FRR"] as const;

const copy = {
  demo: { en: "Demo", pt: "Demonstração" },
  findings: { en: "Findings", pt: "Constatações" },
  agreed: { en: "agreed", pt: "em acordo" },
  dispute: { en: "in dispute", pt: "em disputa" },
  order: { en: "Review order", pt: "Ordem de revisão" },
  records: { en: "Records", pt: "Registos" },
  open: { en: "Open record", pt: "Registo aberto" },
  list: { en: "On the list", pt: "Na lista" },
  next: { en: "Next, CDR", pt: "Seguinte, CDR" },
  weeks: { en: "In 8 weeks", pt: "Em 8 semanas" },
  lumen: { en: "6U optical camera · Falcon 9 rideshare", pt: "Câmara ótica 6U · Rideshare da Falcon 9" },
  halcyon: { en: "Hosted S-band beacon", pt: "Baliza em banda S alojada" },
  cinder: { en: "12U thermal pathfinder", pt: "Demonstrador térmico 12U" },
  notOpen: { en: "Not the open record", pt: "Não é o registo aberto" },
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

const records = [
  { id: "lumen", mark: "L1", title: "Lumen-1", phase: "PDR" },
  { id: "halcyon", mark: "H3", title: "Halcyon-3", phase: "SRR" },
  { id: "cinder", mark: "C2", title: "Cinder-2", phase: "MDR" },
] as const;

type RecordId = (typeof records)[number]["id"];

export function MissionsModule({ locale }: { locale: Locale }) {
  const reduced = useReducedMotion() === true;
  const agreed = useCount(3, reduced);
  const dispute = useCount(1, reduced);
  const [selected, setSelected] = useState<RecordId>("lumen");

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
          <h2>{copy.records[locale]}</h2>
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
          {records.map((record) => {
            const on = selected === record.id;
            const detail =
              record.id === "lumen" ? copy.lumen[locale] : record.id === "halcyon" ? copy.halcyon[locale] : copy.cinder[locale];
            const aside =
              record.id === "lumen"
                ? record.phase
                : record.id === "halcyon"
                  ? `${record.phase} · Demo €0.86M`
                  : `${record.phase} · Demo €1.15M`;
            return (
              <li key={record.id}>
                <button type="button" className={on ? "is-on" : undefined} aria-pressed={on} onClick={() => setSelected(record.id)}>
                  <span className={`activity-mark${record.id === "lumen" ? " is-now" : ""}`}>{record.mark}</span>
                  <span className="activity-copy">
                    <strong>{record.title}</strong>
                    <em>{detail}</em>
                  </span>
                  <span className={`activity-aside${record.id === "lumen" ? " is-now" : ""}`}>{aside}</span>
                </button>
              </li>
            );
          })}
        </ul>
        <ul className="activity-list record-pack" aria-label={records.find((record) => record.id === selected)?.title}>
          {selected === "lumen" ? (
            <>
              <li>
                <span className="activity-mark is-now">L1</span>
                <span className="activity-copy">
                  <strong>{copy.open[locale]}</strong>
                  <em>{copy.lumen[locale]}</em>
                </span>
                <span className="activity-aside is-now">PDR</span>
              </li>
              <li>
                <span className="activity-mark">CDR</span>
                <span className="activity-copy">
                  <strong>{copy.next[locale]}</strong>
                </span>
                <span className="activity-aside">{copy.weeks[locale]}</span>
              </li>
              <li>
                <span className="activity-mark">3</span>
                <span className="activity-copy">
                  <strong>{copy.findings[locale]}</strong>
                  <em>
                    {agreed} {copy.agreed[locale]} · {dispute} {copy.dispute[locale]}
                  </em>
                </span>
                <span className="activity-aside">{copy.demo[locale]}</span>
              </li>
            </>
          ) : (
            <li>
              <span className="activity-mark">{selected === "halcyon" ? "H3" : "C2"}</span>
              <span className="activity-copy">
                <strong>{copy.list[locale]}</strong>
                <em>{copy.notOpen[locale]}</em>
              </span>
              <span className="activity-aside">{selected === "halcyon" ? "Demo €0.86M" : "Demo €1.15M"}</span>
            </li>
          )}
        </ul>
      </motion.article>
    </div>
  );
}
