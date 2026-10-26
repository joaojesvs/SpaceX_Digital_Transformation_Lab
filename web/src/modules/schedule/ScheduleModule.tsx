import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Locale = "en" | "pt";

const TODAY = "2026-10-26";

const MONTHS = {
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  pt: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
} as const;

const WEEKDAYS = {
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  pt: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
} as const;

const EVENTS: Record<string, { id: string; en: string; pt: string }> = {
  "2026-10-26": { id: "PDR", en: "Now", pt: "Agora" },
  "2026-12-21": { id: "CDR", en: "In 8 weeks", pt: "Em 8 semanas" },
  "2027-03-15": { id: "TRR", en: "In 20 weeks", pt: "Em 20 semanas" },
  "2027-07-05": { id: "FRR", en: "In 36 weeks", pt: "Em 36 semanas" },
};

const jumps = [
  { key: "2026-10-26", year: 2026, month: 9 },
  { key: "2026-12-21", year: 2026, month: 11 },
  { key: "2027-03-15", year: 2027, month: 2 },
  { key: "2027-07-05", year: 2027, month: 6 },
] as const;

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function stamp(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function cells(year: number, month: number) {
  const first = new Date(year, month, 1);
  const start = new Date(year, month, 1 - first.getDay());
  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + index);
    return date;
  });
}

export function ScheduleModule({ locale }: { locale: Locale }) {
  const reduced = useReducedMotion() === true;
  const [cursor, setCursor] = useState({ year: 2026, month: 9 });
  const days = useMemo(() => cells(cursor.year, cursor.month), [cursor]);
  const copy = locale === "pt"
    ? { demo: "Demonstração", done: "Feita", prev: "Mês anterior", next: "Mês seguinte", known: "Marcos conhecidos" }
    : { demo: "Demo", done: "Done", prev: "Previous month", next: "Next month", known: "Known gates" };

  function shift(step: number) {
    setCursor((current) => {
      const date = new Date(current.year, current.month + step, 1);
      return { year: date.getFullYear(), month: date.getMonth() };
    });
  }

  return (
    <section className="cal-screen screen-pad" lang={locale === "pt" ? "pt-PT" : "en"}>
      <div className="cal-layout">
        <div className="cal-main">
          <header className="cal-head">
            <div>
              <p className="screen-kicker">{copy.demo}</p>
              <h2>{MONTHS[locale][cursor.month]} {cursor.year}</h2>
            </div>
            <div className="cal-nav">
              <button type="button" aria-label={copy.prev} onClick={() => shift(-1)}>‹</button>
              <button type="button" aria-label={copy.next} onClick={() => shift(1)}>›</button>
            </div>
          </header>
          <div className="cal-week" aria-hidden="true">
            {WEEKDAYS[locale].map((day) => <span key={day}>{day}</span>)}
          </div>
          <div className="cal-grid" role="grid">
            {days.map((date) => {
              const key = stamp(date);
              const event = EVENTS[key];
              const inMonth = date.getMonth() === cursor.month;
              const today = key === TODAY;
              return (
                <div key={key} role="gridcell" className={`cal-day${inMonth ? "" : " is-out"}${today ? " is-today" : ""}${event ? " has-gate" : ""}`}>
                  <span className="cal-num">{date.getDate()}</span>
                  {event ? <em>{event.id}</em> : null}
                </div>
              );
            })}
          </div>
        </div>
        <aside className="cal-side">
          <p className="screen-kicker">{copy.known}</p>
          <div className="cal-srr">
            <span>SRR</span>
            <strong>{copy.done}</strong>
          </div>
          <ul>
            {jumps.map((item, index) => {
              const event = EVENTS[item.key];
              const on = cursor.year === item.year && cursor.month === item.month;
              return (
                <motion.li key={item.key} initial={reduced ? false : { opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: reduced ? 0 : index * 0.05 }}>
                  <button type="button" className={on ? "is-on" : undefined} onClick={() => setCursor({ year: item.year, month: item.month })}>
                    <span>{event.id}</span>
                    <strong>{event[locale]}</strong>
                    <em>{item.key.slice(8)} {MONTHS[locale][item.month].slice(0, 3)} {item.year}</em>
                  </button>
                </motion.li>
              );
            })}
          </ul>
        </aside>
      </div>
    </section>
  );
}
