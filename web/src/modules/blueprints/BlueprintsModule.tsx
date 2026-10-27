import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Locale = "en" | "pt";
type ModelId = "camera" | "optic" | "detector" | "baffle";

const models: { id: ModelId; en: string; pt: string }[] = [
  { id: "camera", en: "Lumen-1 camera", pt: "Câmara Lumen-1" },
  { id: "optic", en: "Optic", pt: "Ótica" },
  { id: "detector", en: "Detector", pt: "Detetor" },
  { id: "baffle", en: "Baffle", pt: "Baffle" },
];

const fields = {
  en: { mark: "Mark", note: "Note", temperature: "Temperature", pressure: "Pressure", demo: "Demo", not: "Not a test result.", pick: "Open a mark", temp: "Demo, 22 °C", press: "Demo, 1 atm" },
  pt: { mark: "Marca", note: "Nota", temperature: "Temperatura", pressure: "Pressão", demo: "Demonstração", not: "Não é um resultado de ensaio.", pick: "Abrir uma marca", temp: "Demonstração, 22 °C", press: "Demonstração, 1 atm" },
} as const;

const hots: Record<ModelId, { id: string; en: string; pt: string; note: { en: string; pt: string }; x: string; y: string }[]> = {
  camera: [
    { id: "body", en: "Body", pt: "Corpo", x: "8%", y: "16%", note: { en: "Demo. 6U envelope.", pt: "Demonstração. Envelope 6U." } },
    { id: "lens", en: "Lens", pt: "Lente", x: "72%", y: "14%", note: { en: "Demo. Image path.", pt: "Demonstração. Caminho de imagem." } },
    { id: "rail", en: "Rail", pt: "Calha", x: "6%", y: "68%", note: { en: "Demo. Side interface.", pt: "Demonstração. Interface lateral." } },
    { id: "cover", en: "Cover", pt: "Tampa", x: "70%", y: "66%", note: { en: "Demo. Closes the body.", pt: "Demonstração. Fecha o corpo." } },
  ],
  optic: [
    { id: "element", en: "Element", pt: "Elemento", x: "8%", y: "16%", note: { en: "Demo. Image path.", pt: "Demonstração. Caminho de imagem." } },
    { id: "stop", en: "Stop", pt: "Diafragma", x: "72%", y: "14%", note: { en: "Demo. Limits the beam.", pt: "Demonstração. Limita o feixe." } },
    { id: "barrel", en: "Barrel", pt: "Barrilete", x: "6%", y: "68%", note: { en: "Demo. Holds the optic.", pt: "Demonstração. Segura a ótica." } },
    { id: "stake", en: "Stake", pt: "Fixação", x: "70%", y: "66%", note: { en: "Demo. Silicone stake on the optic.", pt: "Demonstração. Fixação de silicone na ótica." } },
  ],
  detector: [
    { id: "plane", en: "Plane", pt: "Plano", x: "8%", y: "16%", note: { en: "Demo. Records the image.", pt: "Demonstração. Regista a imagem." } },
    { id: "window", en: "Window", pt: "Janela", x: "72%", y: "14%", note: { en: "Demo. In front of the plane.", pt: "Demonstração. À frente do plano." } },
    { id: "board", en: "Board", pt: "Placa", x: "6%", y: "68%", note: { en: "Demo. Inside the 6U envelope.", pt: "Demonstração. Dentro do envelope 6U." } },
    { id: "harness", en: "Harness", pt: "Cablagem", x: "70%", y: "66%", note: { en: "Demo. Leaves the board.", pt: "Demonstração. Sai da placa." } },
  ],
  baffle: [
    { id: "vane", en: "Vane", pt: "Aleta", x: "8%", y: "16%", note: { en: "Demo. Limits stray light.", pt: "Demonstração. Limita a luz parasita." } },
    { id: "aperture", en: "Aperture", pt: "Abertura", x: "72%", y: "14%", note: { en: "Demo. Open to the optic.", pt: "Demonstração. Aberta para a ótica." } },
    { id: "wall", en: "Wall", pt: "Parede", x: "6%", y: "68%", note: { en: "Demo. Anodized.", pt: "Demonstração. Anodizado." } },
    { id: "mount", en: "Mount", pt: "Suporte", x: "70%", y: "66%", note: { en: "Demo. Inside the 6U envelope.", pt: "Demonstração. Dentro do envelope 6U." } },
  ],
};

function Schematic({ id, compact }: { id: ModelId; compact?: boolean }) {
  if (compact && id === "optic") {
    return (
      <svg viewBox="0 0 220 140" aria-hidden="true">
        <ellipse cx="110" cy="70" rx="54" ry="28" />
        <ellipse cx="110" cy="70" rx="22" ry="11" />
        <path d="M40 70h140" />
      </svg>
    );
  }
  if (compact && id === "detector") {
    return (
      <svg viewBox="0 0 220 140" aria-hidden="true">
        <rect x="62" y="34" width="96" height="72" />
        <rect x="86" y="52" width="48" height="36" />
        <path d="M158 70h28" />
      </svg>
    );
  }
  if (compact && id === "baffle") {
    return (
      <svg viewBox="0 0 220 140" aria-hidden="true">
        <ellipse cx="110" cy="70" rx="70" ry="32" />
        <ellipse cx="110" cy="70" rx="42" ry="18" />
        <ellipse cx="110" cy="70" rx="16" ry="7" />
      </svg>
    );
  }
  if (compact) {
    return (
      <svg viewBox="0 0 220 140" aria-hidden="true">
        <rect x="78" y="28" width="64" height="84" />
        <path d="M78 48h64M78 92h64" />
        <circle cx="110" cy="70" r="16" />
        <circle cx="110" cy="70" r="5" />
      </svg>
    );
  }
  if (id === "optic") {
    return (
      <svg viewBox="0 0 240 160" aria-hidden="true">
        <path className="dim" d="M16 80h208" />
        <path d="M40 48c20 8 20 56 0 64-20-8-20-56 0-64z" />
        <path d="M72 54c14 7 14 45 0 52-14-7-14-45 0-52z" />
        <path d="M108 42c24 10 24 68 0 78-24-10-24-68 0-78z" />
        <path d="M150 46h8v68h-8z" />
        <path d="M158 80h48M190 58v44" />
        <path d="M28 48h18M28 112h18M198 44h18M198 116h18" />
      </svg>
    );
  }
  if (id === "detector") {
    return (
      <svg viewBox="0 0 240 160" aria-hidden="true">
        <path className="dim" d="M120 18v124M28 80h184" />
        <rect x="40" y="34" width="128" height="92" />
        <rect x="58" y="50" width="76" height="60" />
        <rect x="74" y="64" width="44" height="32" />
        <path d="M48 42h8M48 50h8M48 118h8M48 110h8M152 42h8M152 50h8M152 118h8M152 110h8" />
        <path d="M168 80h28" />
        <rect x="192" y="68" width="28" height="24" />
        <path d="M198 74h16M198 80h16M198 86h16" />
      </svg>
    );
  }
  if (id === "baffle") {
    return (
      <svg viewBox="0 0 240 160" aria-hidden="true">
        <path className="dim" d="M120 16v128M24 80h192" />
        <ellipse cx="120" cy="80" rx="92" ry="44" />
        <ellipse cx="120" cy="80" rx="70" ry="32" />
        <ellipse cx="120" cy="80" rx="46" ry="20" />
        <ellipse cx="120" cy="80" rx="20" ry="8" />
        <rect x="22" y="68" width="16" height="24" />
        <rect x="202" y="68" width="16" height="24" />
        <path d="M30 68l8 8M30 92l8-8M210 68l-8 8M210 92l-8-8" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 240 160" aria-hidden="true">
      <path className="dim" d="M120 14v132M36 80h168" />
      <rect x="78" y="22" width="84" height="116" />
      <path d="M78 42h84M78 118h84" />
      <path d="M64 32h20M156 32h20M64 128h20M156 128h20" />
      <circle cx="120" cy="78" r="24" />
      <circle cx="120" cy="78" r="12" />
      <circle cx="120" cy="78" r="3" />
      <rect x="96" y="102" width="48" height="8" />
      <path d="M96 22v-8h48v8" />
    </svg>
  );
}

export function BlueprintsModule({ locale }: { locale: Locale }) {
  const reduced = useReducedMotion() === true;
  const [modelId, setModelId] = useState<ModelId>("camera");
  const [hot, setHot] = useState<string | null>(null);
  const model = models.find((item) => item.id === modelId) ?? models[0];
  const text = fields[locale];
  const marks = hots[model.id];
  const active = marks.find((mark) => mark.id === hot);

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
              <Schematic id={item.id} compact />
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
                <i className="front"><b /><s /></i>
                <i className="back"><b /></i>
                <i className="left"><b /></i>
                <i className="right"><b /></i>
                <i className="top"><b /></i>
                <i className="bottom"><b /></i>
              </div>
              {marks.map((mark, index) => (
                <button key={mark.id} type="button" className={hot === mark.id ? "bp-hot is-on" : "bp-hot"} style={{ left: mark.x, top: mark.y }} aria-pressed={hot === mark.id} onClick={() => setHot(mark.id)}>
                  {index + 1}
                  <em>{mark[locale]}</em>
                </button>
              ))}
            </div>
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.aside key={hot ? `${model.id}-${hot}` : "idle"} className="bp-note" initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <p className="screen-kicker">{model[locale]}</p>
            {active ? (
              <dl>
                <div><dt>{text.mark}</dt><dd>{active[locale]}</dd></div>
                <div><dt>{text.note}</dt><dd>{active.note[locale]}</dd></div>
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
