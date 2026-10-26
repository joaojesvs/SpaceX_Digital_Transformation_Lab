import { useId, type CSSProperties } from "react";
import "./schedule.css";

const PHASES = ["MCR", "SRR", "MDR", "SDR", "PDR", "CDR", "PRR", "TRR", "SAR", "ORR", "FRR"] as const;

const HORIZON_WEEKS = 36;
const NOW = 0.2;

function weekAt(weeksFromNow: number): number {
  return NOW + (weeksFromNow / HORIZON_WEEKS) * (1 - NOW);
}

const MARKERS = [
  { id: "SRR", at: 0.07, state: "done", en: "Done", pt: "Concluída" },
  { id: "PDR", at: NOW, state: "now", en: "Now", pt: "Agora" },
  { id: "CDR", at: weekAt(8), state: "ahead", en: "In 8 weeks", pt: "Dentro de 8 semanas" },
  { id: "TRR", at: weekAt(20), state: "ahead", en: "In 20 weeks", pt: "Dentro de 20 semanas" },
  { id: "FRR", at: weekAt(36), state: "ahead", en: "In 36 weeks", pt: "Dentro de 36 semanas" },
] as const;

const TICKS = [
  { at: NOW, edge: "mid", en: "Now", pt: "Agora" },
  { at: weekAt(36), edge: "end", en: "+36 wk", pt: "+36 sem." },
] as const;

const DELIVERABLES = new Set<string>(MARKERS.map((marker) => marker.id));

const copy = {
  title: { en: "Schedule", pt: "Cronograma" },
  fictional: { en: "Fictional", pt: "Fictício" },
  disclaimer: {
    en: "Fictional demonstration schedule.",
    pt: "Cronograma de demonstração fictício.",
  },
  caption: {
    en: "SRR is complete and drawn before today, with no duration. CDR, TRR, and FRR are weeks from now.",
    pt: "A SRR está concluída e desenhada antes de hoje, sem duração. CDR, TRR e FRR contam-se em semanas a partir de agora.",
  },
  current: { en: "Current phase", pt: "Fase atual" },
  phases: { en: "Review phases", pt: "Fases de revisão" },
  deliverables: { en: "Deliverables", pt: "Entregáveis" },
} as const;

function at(value: number): CSSProperties {
  return { "--at": String(value) } as CSSProperties;
}

function phaseState(phase: string): "done" | "now" | "ahead" | "context" {
  if (phase === "SRR") return "done";
  if (phase === "PDR") return "now";
  if (phase === "CDR" || phase === "TRR" || phase === "FRR") return "ahead";
  return "context";
}

export function ScheduleModule({ locale }: { locale: "en" | "pt" }) {
  const phaseLabelId = useId();
  const chartLabelId = useId();

  return (
    <section
      className="schedule-module"
      lang={locale}
      aria-labelledby={chartLabelId}
      style={{ "--now": String(NOW) } as CSSProperties}
    >
      <header className="schedule-head">
        <div className="schedule-head-row">
          <p className="schedule-kicker">Lumen-1</p>
          <p className="schedule-flag">{copy.fictional[locale]}</p>
        </div>
        <h2 id={chartLabelId} className="schedule-title">
          {copy.title[locale]}
        </h2>
        <p className="schedule-disclaimer">{copy.disclaimer[locale]}</p>
      </header>

      <div className="schedule-card">
        <p className="schedule-current">
          <span className="schedule-current-label">{copy.current[locale]}</span>
          <span className="schedule-current-phase">PDR</span>
        </p>

        <div className="schedule-rail">
          <p id={phaseLabelId} className="schedule-rail-label">
            {copy.phases[locale]}
          </p>
          <ol className="schedule-phases" aria-labelledby={phaseLabelId}>
            {PHASES.map((phase) => {
              const state = phaseState(phase);
              const marker = DELIVERABLES.has(phase);
              return (
                <li
                  key={phase}
                  className={`schedule-phase is-${state}${marker ? " has-marker" : ""}`}
                  aria-current={phase === "PDR" ? "step" : undefined}
                >
                  {phase}
                </li>
              );
            })}
          </ol>
        </div>

        <div className="schedule-chart">
          <p className="schedule-chart-label">{copy.deliverables[locale]}</p>
          <div className="schedule-scale" aria-hidden="true">
            <span className="schedule-scale-code" />
            <div className="schedule-scale-track">
              {TICKS.map((tick) => (
                <span
                  key={tick.en}
                  className="schedule-tick"
                  data-edge={tick.edge}
                  style={at(tick.at)}
                >
                  {tick[locale]}
                </span>
              ))}
            </div>
            <span className="schedule-scale-when" />
          </div>
          <ol className="schedule-rows" aria-label={copy.deliverables[locale]}>
            {MARKERS.map((marker) => (
              <li key={marker.id} className={`schedule-row is-${marker.state}`}>
                <span className="schedule-code">{marker.id}</span>
                <div className="schedule-track" aria-hidden="true">
                  <span className="schedule-now" />
                  <span className={`schedule-mark is-${marker.state}`} style={at(marker.at)}>
                    <svg className="schedule-diamond" viewBox="0 0 16 16">
                      <path d="M8 1.4 14.6 8 8 14.6 1.4 8Z" />
                    </svg>
                  </span>
                </div>
                <span className="schedule-when">{marker[locale]}</span>
              </li>
            ))}
          </ol>
          <p className="schedule-caption">{copy.caption[locale]}</p>
        </div>
      </div>
    </section>
  );
}
