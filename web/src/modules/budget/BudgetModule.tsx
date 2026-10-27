import { motion, useReducedMotion } from "framer-motion";

type Locale = "en" | "pt";

const TOTAL = 2_400_000;
const SPENT = 1_100_000;
const LEFT = 1_300_000;
const SPLIT = [
  { id: "camera", en: "Camera", pt: "Câmara", amount: 980_000, color: "#e4b15a" },
  { id: "platform", en: "Platform", pt: "Plataforma", amount: 720_000, color: "#c4954a" },
  { id: "ait", en: "AIT", pt: "AIT", amount: 460_000, color: "#a87b3a" },
  { id: "ops", en: "Operations", pt: "Operações", amount: 240_000, color: "#6e624f" },
] as const;

const allocated = SPLIT.reduce((sum, item) => sum + item.amount, 0);
if (allocated !== TOTAL || SPENT + LEFT !== TOTAL) {
  throw new Error("Lumen-1 demonstration budget does not balance");
}

function euro(locale: Locale, amount: number) {
  return new Intl.NumberFormat(locale === "pt" ? "pt-PT" : "en-GB", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function BudgetModule({ locale }: { locale: Locale }) {
  const reduced = useReducedMotion() === true;
  const r = 68;
  const c = 2 * Math.PI * r;
  let cursor = 0;
  const copy = locale === "pt"
    ? {
        demo: "Demonstração",
        spent: "Gasto",
        left: "Restante",
        total: "Total",
        split: "Repartição",
        objectives: "Objetivos",
        same: "O mesmo dinheiro de demonstração.",
      }
    : {
        demo: "Demo",
        spent: "Spent",
        left: "Left",
        total: "Total",
        split: "Split",
        objectives: "Objectives",
        same: "The same demonstration money.",
      };
  const aim = {
    camera: { en: "Optical payload", pt: "Carga ótica" },
    platform: { en: "6U bus", pt: "Barramento 6U" },
    ait: { en: "Assembly and integration", pt: "Montagem e integração" },
    ops: { en: "Mission operations", pt: "Operações da missão" },
  } as const;

  return (
    <section className="money-screen screen-pad" lang={locale === "pt" ? "pt-PT" : "en"}>
      <p className="screen-kicker">{copy.demo}</p>
      <div className="money-grid">
        <article className="money-card">
          <h2>{copy.total}</h2>
          <div className="money-pie">
            <svg viewBox="0 0 180 180" aria-hidden="true">
              {SPLIT.map((part) => {
                const len = (part.amount / TOTAL) * c;
                const dash = `${len} ${c - len}`;
                const offset = cursor;
                cursor += len;
                return (
                  <motion.circle
                    key={part.id}
                    cx="90"
                    cy="90"
                    r={r}
                    fill="none"
                    stroke={part.color}
                    strokeWidth="22"
                    strokeDasharray={reduced ? dash : `0 ${c}`}
                    animate={{ strokeDasharray: dash }}
                    transition={{ duration: reduced ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
                    strokeDashoffset={-offset}
                    transform="rotate(-90 90 90)"
                  />
                );
              })}
            </svg>
            <div>
              <strong>{euro(locale, TOTAL)}</strong>
              <span>{copy.demo}</span>
            </div>
          </div>
          <ul className="money-legend">
            {SPLIT.map((part) => (
              <li key={part.id}><i style={{ background: part.color }} />{part[locale]}<b>{euro(locale, part.amount)}</b></li>
            ))}
          </ul>
        </article>
        <article className="money-card">
          <h2>{copy.spent}</h2>
          {[
            { id: "spent", label: copy.spent, amount: SPENT },
            { id: "left", label: copy.left, amount: LEFT },
          ].map((bar) => (
            <div key={bar.id} className="money-bar">
              <div><span>{bar.label}</span><b>{euro(locale, bar.amount)}</b></div>
              <div className="money-track">
                <motion.span initial={{ width: reduced ? `${(bar.amount / TOTAL) * 100}%` : 0 }} animate={{ width: `${(bar.amount / TOTAL) * 100}%` }} transition={{ duration: reduced ? 0 : 0.8 }} />
              </div>
            </div>
          ))}
          <h2 className="money-sub">{copy.split}</h2>
          {SPLIT.map((part) => (
            <div key={part.id} className="money-bar is-split">
              <div><span>{part[locale]}</span><b>{euro(locale, part.amount)}</b></div>
              <div className="money-track">
                <motion.span style={{ background: part.color }} initial={{ width: reduced ? `${(part.amount / TOTAL) * 100}%` : 0 }} animate={{ width: `${(part.amount / TOTAL) * 100}%` }} transition={{ duration: reduced ? 0 : 0.8 }} />
              </div>
            </div>
          ))}
        </article>
      </div>
      <article className="money-detail">
        <header className="money-detail-head">
          <h2>{copy.objectives}</h2>
          <span>{copy.demo}</span>
        </header>
        <p className="money-same">{copy.same}</p>
        <ul className="money-objs">
          {SPLIT.map((part) => (
            <li key={part.id}>
              <i style={{ background: part.color }} />
              <span>{part[locale]}</span>
              <em>{aim[part.id][locale]}</em>
              <b>{euro(locale, part.amount)}</b>
            </li>
          ))}
        </ul>
        <dl className="money-sums">
          <div><dt>{copy.total}</dt><dd>{euro(locale, TOTAL)}</dd></div>
          <div><dt>{copy.spent}</dt><dd>{euro(locale, SPENT)}</dd></div>
          <div><dt>{copy.left}</dt><dd>{euro(locale, LEFT)}</dd></div>
        </dl>
      </article>
    </section>
  );
}
