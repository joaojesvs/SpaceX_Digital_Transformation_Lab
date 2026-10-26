type Locale = "en" | "pt";

const copy = {
  en: { title: "Correspondence", sample: "Sample" },
  pt: { title: "Correspondência", sample: "Amostra" },
} as const;

const notes = [
  {
    id: "SYS",
    en: "Review order for Lumen-1",
    pt: "Ordem de revisão do Lumen-1",
    mark: "PDR",
  },
  {
    id: "OPT",
    en: "MTF row still empty",
    pt: "A linha de MTF continua vazia",
    mark: "REQ-IMG-03",
  },
  {
    id: "AIT",
    en: "Bench functional stays planned",
    pt: "O funcional de banco continua planeado",
    mark: "TP-L1-DET",
  },
] as const;

export function CorrespondenceModule({ locale }: { locale: Locale }) {
  const text = copy[locale];

  return (
    <section className="mail-panel scan-page" lang={locale} aria-labelledby="mail-title">
      <h1 id="mail-title">{text.title}</h1>
      <ul className="scan-list">
        {notes.map((note) => (
          <li key={note.id} className="scan-row">
            <span className="scan-id">{note.id}</span>
            <span className="scan-title">{note[locale]}</span>
            <span className="scan-status">{text.sample}</span>
            <span className="scan-clause">{note.mark}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
