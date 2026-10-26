import type { Locale, ModuleId } from "../platform/locale";

export const modules: { id: ModuleId; en: string; pt: string; file: string; exportName: string }[] = [
  { id: "missions", en: "Missions", pt: "Missões", file: "", exportName: "" },
  { id: "compliance", en: "Compliance", pt: "Conformidade", file: "../modules/compliance/ComplianceModule.tsx", exportName: "ComplianceModule" },
  { id: "phase", en: "Phase", pt: "Fase", file: "../modules/phase/PhaseModule.tsx", exportName: "PhaseModule" },
  { id: "budget", en: "Budget", pt: "Orçamento", file: "../modules/budget/BudgetModule.tsx", exportName: "BudgetModule" },
  { id: "schedule", en: "Schedule", pt: "Cronograma", file: "../modules/schedule/ScheduleModule.tsx", exportName: "ScheduleModule" },
  { id: "tests", en: "Tests", pt: "Ensaios", file: "../modules/tests/TestsModule.tsx", exportName: "TestsModule" },
  { id: "correspondence", en: "Correspondence", pt: "Correspondência", file: "../modules/correspondence/CorrespondenceModule.tsx", exportName: "CorrespondenceModule" },
  { id: "team", en: "Team", pt: "Equipa", file: "../modules/team/TeamModule.tsx", exportName: "TeamModule" },
];

export function moduleLabel(id: ModuleId, locale: Locale): string {
  const module = modules.find((item) => item.id === id);
  return module ? module[locale] : id;
}
