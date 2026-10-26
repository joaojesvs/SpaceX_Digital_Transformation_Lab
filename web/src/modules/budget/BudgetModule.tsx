import { useId, type CSSProperties } from "react";
import "./budget.css";

type Locale = "en" | "pt";

const TOTAL = 2_400_000;
const SPENT = 1_100_000;
const REMAINING = 1_300_000;

const SPLIT = [
  { id: "camera", en: "Camera payload", pt: "Carga útil da câmara", amount: 980_000 },
  { id: "platform", en: "Platform", pt: "Plataforma", amount: 720_000 },
  { id: "ait", en: "AIT and tests", pt: "AIT e ensaios", amount: 460_000 },
  { id: "ops", en: "Operations", pt: "Operações", amount: 240_000 },
] as const;

const allocated = SPLIT.reduce((sum, item) => sum + item.amount, 0);
if (allocated !== TOTAL || SPENT + REMAINING !== TOTAL) {
  throw new Error("Lumen-1 demonstration budget does not balance");
}

const copy = {
  title: { en: "Budget", pt: "Orçamento" },
  fictional: { en: "Fictional", pt: "Fictício" },
  disclaimer: {
    en: "Fictional demonstration figures.",
    pt: "Valores de demonstração fictícios.",
  },
  total: { en: "Total", pt: "Total" },
  spent: { en: "Spent", pt: "Gasto" },
  remaining: { en: "Remaining", pt: "Restante" },
  ofTotal: { en: "of the total", pt: "do total" },
  split: { en: "Split", pt: "Repartição" },
  splitLead: {
    en: "Of the total budget.",
    pt: "Do orçamento total.",
  },
} as const;

function formatEuro(locale: Locale, amount: number): string {
  return new Intl.NumberFormat(locale === "pt" ? "pt-PT" : "en-GB", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatShare(locale: Locale, amount: number): string {
  return new Intl.NumberFormat(locale === "pt" ? "pt-PT" : "en-GB", {
    style: "percent",
    maximumFractionDigits: 1,
  }).format(amount / TOTAL);
}

function weight(amount: number): CSSProperties {
  return { "--weight": String(amount) } as CSSProperties;
}

function fill(amount: number): CSSProperties {
  return { "--fill": `${(amount / TOTAL) * 100}%` } as CSSProperties;
}

export function BudgetModule({ locale }: { locale: "en" | "pt" }) {
  const titleId = useId();

  return (
    <section className="budget-module" lang={locale} aria-labelledby={titleId}>
      <header className="budget-head">
        <div className="budget-head-row">
          <p className="budget-kicker">Lumen-1</p>
          <p className="budget-flag">{copy.fictional[locale]}</p>
        </div>
        <h2 id={titleId} className="budget-title">
          {copy.title[locale]}
        </h2>
        <p className="budget-disclaimer">{copy.disclaimer[locale]}</p>
      </header>

      <ul className="budget-totals">
        <li className="budget-stat">
          <p className="budget-label">{copy.total[locale]}</p>
          <p className="budget-value">{formatEuro(locale, TOTAL)}</p>
        </li>
        <li className="budget-stat">
          <p className="budget-label">{copy.spent[locale]}</p>
          <p className="budget-value">{formatEuro(locale, SPENT)}</p>
          <p className="budget-sub">
            {formatShare(locale, SPENT)} {copy.ofTotal[locale]}
          </p>
        </li>
        <li className="budget-stat">
          <p className="budget-label">{copy.remaining[locale]}</p>
          <p className="budget-value">{formatEuro(locale, REMAINING)}</p>
          <p className="budget-sub">
            {formatShare(locale, REMAINING)} {copy.ofTotal[locale]}
          </p>
        </li>
      </ul>

      <div className="budget-card">
        <div className="budget-meter" aria-hidden="true">
          <span className="budget-meter-spent" style={fill(SPENT)} />
        </div>
        <p className="budget-meter-key">
          <span className="budget-key budget-key-spent">{copy.spent[locale]}</span>
          <span className="budget-key budget-key-left">{copy.remaining[locale]}</span>
        </p>

        <div className="budget-split">
          <div className="budget-split-head">
            <h3>{copy.split[locale]}</h3>
            <p>{copy.splitLead[locale]}</p>
          </div>
          <div className="budget-compose" aria-hidden="true">
            {SPLIT.map((item) => (
              <span key={item.id} data-part={item.id} style={weight(item.amount)} />
            ))}
          </div>
          <ul className="budget-lines">
            {SPLIT.map((item) => (
              <li key={item.id} className="budget-line" data-part={item.id}>
                <div className="budget-line-text">
                  <span className="budget-line-name">{item[locale]}</span>
                  <span className="budget-line-fig">
                    <span className="budget-line-amount">{formatEuro(locale, item.amount)}</span>
                    <span className="budget-line-share">{formatShare(locale, item.amount)}</span>
                  </span>
                </div>
                <div className="budget-line-track" aria-hidden="true">
                  <span className="budget-line-fill" style={fill(item.amount)} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
