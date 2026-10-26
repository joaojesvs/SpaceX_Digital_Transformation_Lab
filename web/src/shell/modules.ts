import type { Locale, ModuleId } from "../platform/locale";

export const modules: { id: ModuleId; en: string; pt: string }[] = [
  { id: "missions", en: "Missions", pt: "Missões" },
  { id: "compliance", en: "Compliance", pt: "Conformidade" },
  { id: "phase", en: "Phase", pt: "Fase" },
  { id: "budget", en: "Budget", pt: "Orçamento" },
  { id: "schedule", en: "Schedule", pt: "Cronograma" },
  { id: "tests", en: "Tests", pt: "Ensaios" },
  { id: "correspondence", en: "Correspondence", pt: "Correspondência" },
  { id: "team", en: "Team", pt: "Equipa" },
  { id: "blueprints", en: "Blueprints", pt: "Desenhos" },
];

export function moduleLabel(id: ModuleId, locale: Locale): string {
  const module = modules.find((item) => item.id === id);
  return module ? module[locale] : id;
}
