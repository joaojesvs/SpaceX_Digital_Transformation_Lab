type Locale = "en" | "pt";

const copy = {
  en: { title: "Tests", missing: "Missing" },
  pt: { title: "Ensaios", missing: "Em falta" },
} as const;

const rows = [
  {
    id: "F-01",
    en: "Optical MTF, REQ-IMG-03",
    pt: "MTF ótica, REQ-IMG-03",
  },
  {
    id: "F-02",
    en: "Contamination and outgassing on the optic",
    pt: "Contaminação e desgaseificação na ótica",
  },
  {
    id: "F-03",
    en: "Rideshare mechanical qualification",
    pt: "Qualificação mecânica do rideshare",
  },
] as const;

export function TestsModule({ locale }: { locale: Locale }) {
  const text = copy[locale];

  return (
    <section className="tests-panel scan-page" lang={locale} aria-labelledby="tests-title">
      <h1 id="tests-title">{text.title}</h1>
      <ul className="scan-list">
        {rows.map((row) => (
          <li key={row.id} className="scan-row review">
            <span className="scan-id">{row.id}</span>
            <span className="scan-title">{row[locale]}</span>
            <span className="scan-status is-missing">{text.missing}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
