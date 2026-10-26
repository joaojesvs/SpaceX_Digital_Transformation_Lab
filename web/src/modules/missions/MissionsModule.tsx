import type { Locale } from "../../platform/locale";
import { answer } from "../../platform/answers";
import { useSession } from "../../platform/session";

const copy = {
  kicker: { en: "Aerospace missions", pt: "Missões aeroespaciais" },
  open: { en: "Open record", pt: "Registo aberto" },
  stays: { en: "Stays on this list.", pt: "Fica nesta lista." },
  lumen: {
    en: "6U CubeSat optical camera. Falcon 9 rideshare, piggyback.",
    pt: "Câmara ótica num CubeSat 6U. Rideshare da Falcon 9, em piggyback.",
  },
  halcyon: {
    en: "Hosted S-band beacon. Phase SRR.",
    pt: "Baliza em banda S. Fase SRR.",
  },
  cinder: {
    en: "12U thermal pathfinder. Phase MDR.",
    pt: "Demonstrador térmico 12U. Fase MDR.",
  },
  now: {
    en: "Lumen-1 is in PDR, the Preliminary Design Review. The next phase is CDR, the Critical Design Review.",
    pt: "O Lumen-1 está na PDR, a revisão preliminar de projeto. A fase seguinte é a CDR, a revisão crítica de projeto.",
  },
  budget: { en: "Budget", pt: "Orçamento" },
  spent: { en: "Spent", pt: "Gasto" },
  feed: { en: "This session", pt: "Nesta sessão" },
  feedNote: {
    en: "The employee widget and Ask write into this open mission.",
    pt: "O widget e o Perguntar escrevem nesta missão aberta.",
  },
  empty: { en: "No lines yet.", pt: "Ainda não há linhas." },
  log: { en: "Log", pt: "Diário" },
  question: { en: "Question", pt: "Pergunta" },
};

const others = [
  { id: "halcyon-3", name: "Halcyon-3", text: copy.halcyon },
  { id: "cinder-2", name: "Cinder-2", text: copy.cinder },
];

export function MissionsModule({ locale }: { locale: Locale }) {
  const { notes } = useSession();

  return (
    <div className="stack">
      <p className="lede">{copy.kicker[locale]}</p>
      <article className="card mission-open">
        <header className="mission-head">
          <h2>Lumen-1</h2>
          <span className="pill">{copy.open[locale]}</span>
        </header>
        <p>{copy.lumen[locale]}</p>
        <p className="quiet">{copy.now[locale]}</p>
        <dl className="figures">
          <div>
            <dt>{copy.budget[locale]}</dt>
            <dd>€2,400,000</dd>
          </div>
          <div>
            <dt>{copy.spent[locale]}</dt>
            <dd>€1,100,000</dd>
          </div>
        </dl>
      </article>
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
