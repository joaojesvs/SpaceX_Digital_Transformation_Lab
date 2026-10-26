import { useCallback, useEffect, useState, type MouseEvent } from "react";
import { AnimatePresence, motion, type Transition } from "framer-motion";
import { phases, scenes, ui, type Lang, type Scene } from "./copy";
import { MissionDesk } from "./desk";

const EASE = [0.4, 0, 0.2, 1] as const;
const STILLS = [
  "/astraea-mark.jpg",
  "/optical-payload.jpg",
  "/atmosphere.jpg",
  "/phase-rail.jpg",
  "/desk-widget.jpg",
];
const DESK_W = 1180;
const DESK_H = 704;

function useReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);
  return reduced;
}

function initialIndex() {
  const raw = new URLSearchParams(window.location.search).get("s") ?? window.location.hash.replace("#", "");
  const scene = Number(raw);
  if (Number.isInteger(scene) && scene >= 1 && scene <= scenes.length) return scene - 1;
  return 0;
}

export function App() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(initialIndex);
  const [lang, setLang] = useState<Lang>("en");
  const [autoplay, setAutoplay] = useState(false);
  const [progress, setProgress] = useState(0);
  const [deskScale, setDeskScale] = useState(1);
  const scene = scenes[index];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    for (const src of STILLS) {
      const image = new Image();
      image.src = src;
    }
  }, []);

  useEffect(() => {
    const measure = () => {
      const width = window.innerWidth * 0.9;
      const height = window.innerHeight * 0.68;
      setDeskScale(Math.min(width / DESK_W, height / DESK_H));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const go = useCallback((direction: number) => {
    setProgress(0);
    setIndex((current) => Math.min(scenes.length - 1, Math.max(0, current + direction)));
  }, []);

  const toggleAutoplay = useCallback(() => {
    setAutoplay((on) => {
      if (!on) {
        setProgress(0);
        setIndex((current) => (current === scenes.length - 1 ? 0 : current));
      }
      return !on;
    });
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "ArrowDown" || event.key === "PageDown") {
        event.preventDefault();
        go(1);
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        go(-1);
      } else if (event.key === "Home") {
        event.preventDefault();
        setProgress(0);
        setIndex(0);
      } else if (event.key === "End") {
        event.preventDefault();
        setProgress(0);
        setIndex(scenes.length - 1);
      } else if (event.key === " ") {
        event.preventDefault();
        toggleAutoplay();
      } else if (event.key === "f" || event.key === "F") {
        event.preventDefault();
        if (document.fullscreenElement) void document.exitFullscreen();
        else void document.documentElement.requestFullscreen().catch(() => undefined);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, toggleAutoplay]);

  useEffect(() => {
    if (!autoplay) return;
    let frame = 0;
    const started = performance.now();
    const duration = scenes[index].ms;
    const step = (now: number) => {
      const ratio = (now - started) / duration;
      if (ratio >= 1) {
        setProgress(0);
        if (index >= scenes.length - 1) setAutoplay(false);
        else setIndex(index + 1);
        return;
      }
      if (!reduced) setProgress(ratio);
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [autoplay, index, reduced]);

  const onStageClick = (event: MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("button")) return;
    const place = event.clientX / window.innerWidth;
    go(place < 0.18 ? -1 : 1);
  };

  const fade: Transition = reduced ? { duration: 0 } : { duration: 0.6, ease: EASE };
  const rise: Transition = reduced ? { duration: 0 } : { duration: 0.55, ease: EASE, delay: 0.06 };

  return (
    <div className="stage" onClick={onStageClick}>
      <AnimatePresence initial={!reduced}>
        <motion.section
          key={scene.id}
          className={`scene scene-${scene.layout}`}
          data-scene={scene.id}
          data-tone={scene.tone ?? "plain"}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={fade}
        >
          {scene.image ? <img className="bleed" src={scene.image} alt="" draggable={false} /> : null}
          <div className="scrim" />
          {scene.layout === "desk" ? (
            <DeskScene scene={scene} lang={lang} scale={deskScale} reduced={reduced} rise={rise} />
          ) : scene.layout === "phase" ? (
            <PhaseScene scene={scene} lang={lang} reduced={reduced} rise={rise} />
          ) : (
            <Copy scene={scene} lang={lang} reduced={reduced} rise={rise} />
          )}
        </motion.section>
      </AnimatePresence>

      <div className="chrome">
        <p className="index">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span className="of"> / {String(scenes.length).padStart(2, "0")}</span>
          <span className={autoplay ? "hint hint-on" : "hint"}>{autoplay ? ui.playing[lang] : ui.hint[lang]}</span>
        </p>
        <div className="lang" role="group" aria-label={ui.language[lang]}>
          <button type="button" aria-pressed={lang === "en"} onClick={() => setLang("en")}>
            EN
          </button>
          <button type="button" aria-pressed={lang === "pt"} onClick={() => setLang("pt")}>
            PT
          </button>
        </div>
      </div>
      {autoplay && !reduced ? (
        <div className="progress" aria-hidden="true">
          <span style={{ width: `${progress * 100}%` }} />
        </div>
      ) : null}
      <p className="sr-only" aria-live="polite">
        {scene.title[lang]}
      </p>
    </div>
  );
}

function Copy({
  scene,
  lang,
  reduced,
  rise,
}: {
  scene: Scene;
  lang: Lang;
  reduced: boolean;
  rise: Transition;
}) {
  return (
    <motion.div
      className="copy"
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={rise}
    >
      <Words scene={scene} lang={lang} />
    </motion.div>
  );
}

function Words({ scene, lang }: { scene: Scene; lang: Lang }) {
  return (
    <>
      {scene.eyebrow ? (
        <p className={scene.tone === "dispute" ? "eyebrow eyebrow-dispute" : "eyebrow"}>{scene.eyebrow[lang]}</p>
      ) : null}
      <h1 className={scene.wide ? "wide" : undefined}>{scene.title[lang]}</h1>
      {scene.detail ? <p className="detail">{scene.detail[lang]}</p> : null}
      {scene.note ? <p className="note">{scene.note}</p> : null}
    </>
  );
}

function PhaseScene({
  scene,
  lang,
  reduced,
  rise,
}: {
  scene: Scene;
  lang: Lang;
  reduced: boolean;
  rise: Transition;
}) {
  return (
    <motion.div
      className="copy phase-copy"
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={rise}
    >
      <div>
        {scene.eyebrow ? <p className="eyebrow">{scene.eyebrow[lang]}</p> : null}
        <h1>{scene.title[lang]}</h1>
      </div>
      <div className="rail-block">
        {scene.detail ? <p className="detail phase-detail">{scene.detail[lang]}</p> : null}
        <ol className="phases">
          {phases.map((code) => (
            <li key={code} data-state={code === "PDR" ? "now" : code === "CDR" ? "next" : "idle"}>
              {code}
            </li>
          ))}
        </ol>
        {scene.aside ? <p className="aside">{scene.aside[lang]}</p> : null}
      </div>
    </motion.div>
  );
}

function DeskScene({
  scene,
  lang,
  scale,
  reduced,
  rise,
}: {
  scene: Scene;
  lang: Lang;
  scale: number;
  reduced: boolean;
  rise: Transition;
}) {
  return (
    <div className="desk-scene">
      <motion.div
        className="desk-caption"
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={rise}
      >
        {scene.eyebrow ? <p className="eyebrow">{scene.eyebrow[lang]}</p> : null}
        <h1>{scene.title[lang]}</h1>
      </motion.div>
      <div className="desk-fit" style={{ width: DESK_W * scale, height: DESK_H * scale }}>
        <div className="desk-scale" style={{ transform: `scale(${scale})` }}>
          <MissionDesk lang={lang} />
        </div>
      </div>
    </div>
  );
}
