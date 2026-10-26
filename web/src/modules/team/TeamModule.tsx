type Locale = "en" | "pt";

const copy = {
  en: { title: "Team", fictional: "Fictional" },
  pt: { title: "Equipa", fictional: "Fictício" },
} as const;

const seats = [
  { code: "SYS", en: "Systems lead", pt: "Responsável de sistemas" },
  { code: "OPT", en: "Optical engineer", pt: "Engenheiro ótico" },
  { code: "AIT", en: "AIT engineer", pt: "Engenheiro de AIT" },
  { code: "PA", en: "Product assurance", pt: "Garantia do produto" },
] as const;

export function TeamModule({ locale }: { locale: Locale }) {
  const text = copy[locale];

  return (
    <section className="team-panel scan-page" lang={locale} aria-labelledby="team-title">
      <h1 id="team-title">{text.title}</h1>
      <ul className="scan-list">
        {seats.map((seat) => (
          <li key={seat.code} className="scan-row pair">
            <span className="scan-id">{seat.code}</span>
            <span className="scan-title">{seat[locale]}</span>
            <span className="scan-status">{text.fictional}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
