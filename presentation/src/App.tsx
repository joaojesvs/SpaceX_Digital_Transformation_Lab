import { useCallback, useEffect, useState, type MouseEvent } from "react";
import { AnimatePresence, motion, type Transition } from "framer-motion";
import { scenes, ui, type Lang, type Scene } from "./copy";
import { BrandScene, Figure } from "./figures";

const EASE = [0.4, 0, 0.2, 1] as const;
const STILLS = ["/astrea-mark.png", "/astrea-wordmark.png", "/astraea-mark.jpg"];

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
          data-tone="plain"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={fade}
        >
          {scene.image ? <img className="bleed" src={scene.image} alt="" draggable={false} /> : null}
          <div className="scrim" />
          {scene.layout === "brand" ? (
            <BrandScene lang={lang} />
          ) : (
            <Copy scene={scene} lang={lang} reduced={reduced} rise={rise} />
          )}
        </motion.section>
      </AnimatePresence>

      {scene.id !== "cover" ? (
        <div className="lockup" aria-hidden="true">
          <img className="lockup-mark" src="/astrea-mark.png" alt="" />
          <img className="lockup-word" src="/astrea-wordmark.png" alt="" />
        </div>
      ) : null}

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
      className={scene.figure && scene.figure !== "close" ? "copy has-figure" : "copy"}
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={rise}
    >
      <div className="words">
        <Words scene={scene} lang={lang} />
      </div>
      {scene.figure ? <Figure scene={scene} lang={lang} /> : null}
    </motion.div>
  );
}

function Words({ scene, lang }: { scene: Scene; lang: Lang }) {
  return (
    <>
      {scene.eyebrow ? (
        <p className="eyebrow">{scene.eyebrow[lang]}</p>
      ) : null}
      <h1 className={scene.wide ? "wide" : undefined}>{scene.title[lang]}</h1>
      {scene.detail ? <p className="detail">{scene.detail[lang]}</p> : null}
    </>
  );
}
