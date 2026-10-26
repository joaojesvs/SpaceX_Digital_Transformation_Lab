type Locale = "en" | "pt";

const copy = {
  en: { title: "Correspondence", sample: "Sample" },
  pt: { title: "Correspondência", sample: "Amostra" },
} as const;

const notes = [
  {
    id: "F-01",
    en: "Optical MTF method still open",
    pt: "O método de MTF ótica continua em aberto",
  },
  {
    id: "F-02",
    en: "Contamination and outgassing still open",
    pt: "Contaminação e desgaseificação continuam em aberto",
  },
  {
    id: "F-03",
    en: "Rideshare qualification still open",
    pt: "A qualificação do rideshare continua em aberto",
  },
] as const;

export function CorrespondenceModule({ locale }: { locale: Locale }) {
  const text = copy[locale];

  return (
    <section className="mail-panel scan-page" lang={locale} aria-labelledby="mail-title">
      <h1 id="mail-title">{text.title}</h1>
      <ul className="scan-list">
        {notes.map((note) => (
          <li key={note.id} className="scan-row review">
            <span className="scan-id">{note.id}</span>
            <span className="scan-title">{note[locale]}</span>
            <span className="scan-status">{text.sample}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
