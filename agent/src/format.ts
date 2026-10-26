import type { AuditReport, Lang } from "./types.ts";

export function formatReport(report: AuditReport, lang: Lang): string {
  const lead = lang;
  const other: Lang = lang === "en" ? "pt" : "en";
  const lines: string[] = [
    label(lead, "Lead language", "Língua principal") + ": " + (lead === "en" ? "English" : "português"),
    report.mission[lead],
    label(lead, "Source system", "Sistema de origem") + ": " + label(lead, "engineering baseline", "linha de base de engenharia") + ` (${report.baselineId})`,
    label(lead, "Drive folder URL", "URL da pasta Drive") + ": " + (report.driveFolderUrl === "" ? label(lead, "empty, not contacted", "vazia, sem contacto") : `${report.driveFolderUrl} (${label(lead, "not contacted", "sem contacto")})`),
    label(lead, "Network", "Rede") + ": " + label(lead, "no", "não"),
    label(lead, "Cards loaded", "Cartões carregados") + `: ${report.cardsLoaded.length}`,
    "",
  ];

  report.findings.forEach((finding, index) => {
    const agreement = finding.agreement === "agree"
      ? label(lead, "Both auditors agree", "Os dois auditores concordam")
      : label(lead, "In dispute", "Em disputa");
    lines.push(`${index + 1}. ${agreement}`);
    for (const language of [lead, other]) {
      lines.push(language === "en" ? "English" : "Português");
      lines.push(`  ${label(language, "Clause", "Cláusula")}: ${finding.clause}`);
      lines.push(`  ${label(language, "Triggering line", "Linha de origem")} (${finding.triggeringLine.id}): ${finding.triggeringLine[language]}`);
      if (finding.launchConstraint) {
        lines.push(`  ${label(language, "Launch constraint", "Restrição de lançamento")}: ${finding.launchConstraint}`);
      }
      lines.push(`  ${label(language, "Why it is critical", "Porque é crítico")}: ${finding.whyCritical[language]}`);
      lines.push(`  ${label(language, "Recommended change", "Alteração recomendada")}: ${finding.recommendedChange[language]}`);
      const verb = finding.agreement === "agree"
        ? label(language, "Agrees", "Concorda")
        : label(language, "Disputes", "Contesta");
      lines.push(`  ${label(language, "Second auditor", "Segundo auditor")}: ${verb}. ${finding.auditors.second[language]}`);
    }
    lines.push("");
  });

  lines.push(label(lead, "Checked, no finding", "Revisto, sem achado"));
  if (report.clear.length === 0) {
    lines.push("  —");
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
