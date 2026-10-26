export type Lang = "en" | "pt";

export type Pair = Record<Lang, string>;

export type Layout = "mark" | "poster" | "brand";

export type FigureId = "context" | "findings" | "cursor" | "grok" | "close";

export type Scene = {
  id: string;
  ms: number;
  layout: Layout;
  image?: string;
  wide?: boolean;
  figure?: FigureId;
  eyebrow?: Pair;
  title: Pair;
  detail?: Pair;
  aside?: Pair;
};

const line = {
  en: "Astrea is the mission desk that audits a space project against the standards it has actually opened.",
  pt: "Astrea é a secretária da missão que audita um projeto espacial face às normas que realmente abriu.",
} as const;

export const scenes: Scene[] = [
  {
    id: "cover",
    ms: 8000,
    layout: "brand",
    title: line,
  },
  {
    id: "context",
    ms: 10000,
    layout: "poster",
    figure: "context",
    eyebrow: { en: "Lumen-1", pt: "Lumen-1" },
    title: { en: "A 6U optical camera.", pt: "Uma câmara ótica 6U." },
    detail: { en: "Falcon 9 rideshare. PDR now.", pt: "Rideshare da Falcon 9. PDR agora." },
  },
  {
    id: "dashboard",
    ms: 12000,
    layout: "poster",
    wide: true,
    figure: "findings",
    eyebrow: { en: "The dashboard", pt: "O painel" },
    title: { en: "It reads the opened cards.", pt: "Lê as fichas abertas." },
    detail: { en: "The live app is next.", pt: "A aplicação ao vivo é a seguir." },
  },
  {
    id: "cursor",
    ms: 8000,
    layout: "poster",
    figure: "cursor",
    eyebrow: { en: "Cursor", pt: "Cursor" },
    title: { en: "Built in Cursor.", pt: "Feito no Cursor." },
    detail: { en: "Cards, the review, and this stage.", pt: "Fichas, a revisão e este palco." },
  },
  {
    id: "grok",
    ms: 8000,
    layout: "poster",
    figure: "grok",
    eyebrow: { en: "Grokbot", pt: "Grokbot" },
    title: { en: "Asked through the xAI API.", pt: "Perguntado pela API da xAI." },
    detail: { en: "The key is never shown.", pt: "A chave nunca aparece." },
  },
  {
    id: "close",
    ms: 8000,
    layout: "mark",
    image: "/astraea-mark.jpg",
    figure: "close",
    eyebrow: { en: "Next", pt: "A seguir" },
    title: { en: "The specialist\ntakes the dispute.", pt: "O especialista\nfica com a disputa." },
    detail: { en: "The next review of this camera.", pt: "A próxima revisão desta câmara." },
    aside: { en: "Thank you.", pt: "Obrigado." },
  },
];

export const ui = {
  hint: { en: "Space", pt: "Espaço" },
  playing: { en: "Playing", pt: "A correr" },
  language: { en: "Language", pt: "Língua" },
  ground: { en: "Ground", pt: "Fundo" },
  type: { en: "Type", pt: "Tipo" },
  accent: { en: "Accent", pt: "Acento" },
} as const;

export const brandLine = line;
