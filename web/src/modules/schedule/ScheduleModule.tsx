const MARKERS = [
  { id: "SRR", en: "Done", pt: "Feita" },
  { id: "PDR", en: "Now", pt: "Agora" },
  { id: "CDR", en: "In 8 weeks", pt: "Em 8 semanas" },
  { id: "TRR", en: "In 20 weeks", pt: "Em 20 semanas" },
  { id: "FRR", en: "In 36 weeks", pt: "Em 36 semanas" },
] as const;

const copy = {
  title: { en: "Schedule", pt: "Cronograma" },
} as const;

export function ScheduleModule({ locale }: { locale: "en" | "pt" }) {
  return (
    <section className="schedule-module scan-page" lang={locale} aria-labelledby="schedule-title">
      <h1 id="schedule-title" className="schedule-title">
        {copy.title[locale]}
      </h1>
      <ul className="scan-list">
        {MARKERS.map((marker) => (
          <li key={marker.id} className={marker.id === "PDR" ? "scan-row review is-now" : "scan-row review"}>
            <span className="scan-id">{marker.id}</span>
            <span className="scan-title">{marker[locale]}</span>
            <span className="scan-status" />
          </li>
        ))}
      </ul>
    </section>
  );
}
