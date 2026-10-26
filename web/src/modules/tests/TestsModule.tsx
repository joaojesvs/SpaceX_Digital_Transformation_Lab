type Locale = "en" | "pt";

const copy = {
  en: { title: "Tests", planned: "Planned", missing: "Missing" },
  pt: { title: "Ensaios", planned: "Planeado", missing: "Em falta" },
} as const;

const rows = [
  {
    id: "REQ-IMG-01",
    status: "planned",
    procedure: "TP-L1-GSD",
    en: "Ground sample distance",
    pt: "Distância de amostragem ao solo",
  },
  {
    id: "REQ-IMG-02",
    status: "planned",
    procedure: "TP-L1-BAND",
    en: "Spectral band",
    pt: "Banda espectral",
  },
  {
    id: "REQ-IMG-03",
    status: "missing",
    procedure: "",
    en: "Optical MTF",
    pt: "MTF ótica",
  },
  {
    id: "TP-L1-DET",
    status: "planned",
    procedure: "TP-L1-DET",
    en: "Detector and controller",
    pt: "Detetor e controlador",
  },
] as const;

export function TestsModule({ locale }: { locale: Locale }) {
  const text = copy[locale];

  return (
    <section className="tests-panel scan-page" lang={locale} aria-labelledby="tests-title">
      <h1 id="tests-title">{text.title}</h1>
      <ul className="scan-list">
        {rows.map((row) => {
          const missing = row.status === "missing";
          return (
            <li key={row.id} className="scan-row">
              <span className="scan-id">{row.id}</span>
              <span className="scan-title">{row[locale]}</span>
              <span className={missing ? "scan-status is-missing" : "scan-status"}>
                {missing ? text.missing : text.planned}
              </span>
              <span className="scan-clause">{row.procedure}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
