import type { AuditReport, Lang } from "./types.ts";

export function formatReport(report: AuditReport, lang: Lang): string {
  const lead = lang;
  const other: Lang = lang === "en" ? "pt" : "en";
  const lines: string[] = [
    label(lead, "Lead language", "Língua principal") + ": " + (lead === "en" ? "English" : "português"),
    report.mission[lead],
    label(lead, "Source system", "Sistema de origem") + ": " + label(lead, "engineering baseline", "linha de base de engenharia") + ` (${report.baselineId})`,
    label(lead, "Drive file id", "Id do ficheiro Drive") + ": " + (report.driveFolderUrl === "" ? label(lead, "empty, not contacted", "vazio, sem contacto") : `${report.driveFolderUrl} (${label(lead, "not contacted", "sem contacto")})`),
    label(lead, "Network", "Rede") + ": " + label(lead, "no", "não"),
    label(lead, "Cards loaded", "Cartões carregados") + `: ${report.cardsLoaded.length}`,
    "",
  ];

  report.findings.forEach((finding) => {
    lines.push(`${finding.id} — ${finding.status}, ${finding.cardStatus}`);
    for (const language of [lead, other]) {
      lines.push(language === "en" ? "English" : "Português");
      lines.push(`  ${label(language, "Clause", "Cláusula")}: ${finding.clause}`);
      if (finding.supportingClauses) {
        lines.push(`  ${label(language, "Supporting clauses", "Cláusulas de apoio")}: ${finding.supportingClauses}`);
      }
      lines.push(`  ${label(language, "Triggering line", "Linha de origem")} (${finding.triggeringLine.id}): ${finding.triggeringLine[language]}`);
      if (finding.launchConstraint) {
        lines.push(`  ${label(language, "Launch constraint", "Restrição de lançamento")}: ${finding.launchConstraint}`);
      }
      lines.push(`  ${label(language, "Why it is critical", "Porque é crítico")}: ${finding.whyCritical[language]}`);
      lines.push(`  ${label(language, "Recommended change", "Alteração recomendada")}: ${finding.recommendedChange[language]}`);
      if (finding.agreement === "agree") {
        lines.push(`  ${label(language, "Auditors", "Auditores")}: ${label(language, "both agree", "os dois concordam")}. ${finding.auditors.second[language]}`);
      } else {
        lines.push(`  ${label(language, "Auditor B", "Auditor B")}: ${finding.auditors.second[language]}`);
      }
    }
    lines.push("");
  });

  if (report.clear.length > 0) {
    lines.push(label(lead, "Checked, no finding", "Revisto, sem achado"));
  }
  for (const item of report.clear) {
    const ids = item.checkedLineIds.join(", ");
    lines.push(`  ${item.clause}`);
    lines.push(`  ${label(lead, "Lines", "Linhas")}: ${ids}`);
  }
  if (report.cardsSkipped.length > 0) {
    lines.push("");
    lines.push(label(lead, "Skipped cards", "Cartões ignorados"));
    for (const skip of report.cardsSkipped) {
      lines.push(`  ${skip.file}: ${skip.reason} (${skip.detail})`);
    }
  }
  return lines.join("\n");
}

function label(lang: Lang, en: string, pt: string): string {
  return lang === "en" ? en : pt;
}
