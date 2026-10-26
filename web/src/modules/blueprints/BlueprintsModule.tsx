import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Locale = "en" | "pt";
type ModelId = "camera" | "optic" | "detector" | "baffle";

const models: {
  id: ModelId;
  en: string;
  pt: string;
  material: { en: string; pt: string };
  role: { en: string; pt: string };
  volume: { en: string; pt: string };
}[] = [
  {
    id: "camera",
    en: "Lumen-1 camera",
    pt: "Câmara Lumen-1",
    material: { en: "Demo", pt: "Demonstração" },
    role: { en: "Finished 6U optical camera", pt: "Câmara ótica 6U acabada" },
    volume: { en: "Demo, 6U envelope", pt: "Demonstração, envelope 6U" },
  },
  {
    id: "optic",
    en: "Optic",
    pt: "Ótica",
    material: { en: "Demo", pt: "Demonstração" },
    role: { en: "Image path", pt: "Caminho de imagem" },
    volume: { en: "Demo, inside the 6U envelope", pt: "Demonstração, dentro do envelope 6U" },
  },
  {
    id: "detector",
    en: "Detector",
    pt: "Detetor",
    material: { en: "Demo", pt: "Demonstração" },
    role: { en: "Records the image", pt: "Regista a imagem" },
    volume: { en: "Demo, inside the 6U envelope", pt: "Demonstração, dentro do envelope 6U" },
  },
  {
    id: "baffle",
    en: "Baffle",
    pt: "Baffle",
    material: { en: "Anodized · Demo", pt: "Anodizado · Demonstração" },
    role: { en: "Limits stray light on the optic", pt: "Limita a luz parasita na ótica" },
    volume: { en: "Demo, inside the 6U envelope", pt: "Demonstração, dentro do envelope 6U" },
  },
];

const fields = {
  en: { material: "Material", role: "Role", volume: "Volume", temperature: "Temperature", pressure: "Pressure", demo: "Demo", not: "Not a test result.", pick: "Open a mark", temp: "Demo, 22 °C", press: "Demo, 1 atm" },
  pt: { material: "Material", role: "Função", volume: "Volume", temperature: "Temperatura", pressure: "Pressão", demo: "Demonstração", not: "Não é um resultado de ensaio.", pick: "Abrir uma marca", temp: "Demonstração, 22 °C", press: "Demonstração, 1 atm" },
} as const;

function Schematic({ id }: { id: ModelId }) {
  if (id === "optic") {
    return (
      <svg viewBox="0 0 220 140" aria-hidden="true">
        <ellipse cx="110" cy="70" rx="54" ry="28" />
        <ellipse cx="110" cy="70" rx="24" ry="12" />
        <path d="M56 70h108M110 42v56" />
      </svg>
    );
  }
  if (id === "detector") {
    return (
      <svg viewBox="0 0 220 140" aria-hidden="true">
        <rect x="62" y="34" width="96" height="72" />
        <rect x="86" y="52" width="48" height="36" />
        <path d="M62 34l12 12M158 34l-12 12M62 106l12-12M158 106l-12-12" />
      </svg>
    );
  }
  if (id === "baffle") {
    return (
      <svg viewBox="0 0 220 140" aria-hidden="true">
        <ellipse cx="110" cy="70" rx="70" ry="32" />
        <ellipse cx="110" cy="70" rx="46" ry="20" />
        <ellipse cx="110" cy="70" rx="22" ry="9" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 220 140" aria-hidden="true">
      <rect x="78" y="28" width="64" height="84" />
      <path d="M78 48h64M78 92h64M70 36h16M134 36h16M70 104h16M134 104h16" />
      <circle cx="110" cy="70" r="14" />
    </svg>
  );
}

export function BlueprintsModule({ locale }: { locale: Locale }) {
  const reduced = useReducedMotion() === true;
  const [modelId, setModelId] = useState<ModelId>("camera");
  const [hot, setHot] = useState<string | null>(null);
  const model = models.find((item) => item.id === modelId) ?? models[0];
  const text = fields[locale];
  const marks = locale === "pt" ? ["Corpo", "Marca"] : ["Body", "Mark"];

  function choose(next: ModelId) {
    setModelId(next);
    setHot(null);
  }

  return (
    <section className="bp-screen screen-pad" lang={locale === "pt" ? "pt-PT" : "en"}>
      <div className="bp-layout">
        <div className="bp-picker" role="list">
          {models.map((item) => (
            <button key={item.id} type="button" role="listitem" className={item.id === modelId ? "is-on" : undefined} aria-pressed={item.id === modelId} onClick={() => choose(item.id)}>
              <Schematic id={item.id} />
              <span>{item[locale]}</span>
            </button>
          ))}
        </div>
        <div className="bp-stage">
          <div className="bp-frame" aria-hidden="true" />
          <p className="bp-stamp">{text.demo}</p>
          <p className="bp-warn">{text.not}</p>
          <div className="bp-split">
            <div className="bp-flat">
              <span>2D</span>
              <Schematic id={model.id} />
            </div>
            <div className="bp-view">
              <div className={`bp-rotor is-${model.id}`}>
                <i className="front" />
                <i className="back" />
                <i className="left" />
                <i className="right" />
                <i className="top" />
                <i className="bottom" />
              </div>
              {marks.map((mark, index) => (
                <button key={mark} type="button" className={hot === mark ? "bp-hot is-on" : "bp-hot"} style={{ ["--hot" as string]: index }} aria-pressed={hot === mark} onClick={() => setHot(mark)}>
                  {index + 1}
                  <em>{mark}</em>
                </button>
              ))}
            </div>
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.aside key={hot ? `${model.id}-${hot}` : "idle"} className="bp-note" initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <p className="screen-kicker">{model[locale]}</p>
            {hot ? (
              <dl>
                <div><dt>{text.material}</dt><dd>{model.material[locale]}</dd></div>
                <div><dt>{text.role}</dt><dd>{model.role[locale]}</dd></div>
                <div><dt>{text.volume}</dt><dd>{model.volume[locale]}</dd></div>
                <div><dt>{text.temperature}</dt><dd>{text.temp}</dd></div>
                <div><dt>{text.pressure}</dt><dd>{text.press}</dd></div>
              </dl>
            ) : <p className="bp-idle">{text.pick}</p>}
            <p className="bp-foot">{text.not}</p>
          </motion.aside>
        </AnimatePresence>
      </div>
    </section>
  );
}
