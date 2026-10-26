import { copy } from "../i18n";
import type { Lang } from "../types";

type IntroProps = {
  lang: Lang;
  onRun: () => void;
};

export function Intro({ lang, onRun }: IntroProps) {
  return (
    <section className="intro">
      <div className="sheet">
        <h1>{copy.introTitle[lang]}</h1>
        <p className="lede">{copy.introBody[lang]}</p>
        <button type="button" className="btn" onClick={onRun}>
          {copy.run[lang]}
        </button>
        <p className="checks">{copy.checksLine[lang]}</p>
        <p className="whisper">{copy.source[lang]}</p>
      </div>
    </section>
  );
}
