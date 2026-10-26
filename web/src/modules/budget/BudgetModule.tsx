type Locale = "en" | "pt";

const TOTAL = 2_400_000;
const SPENT = 1_100_000;
const LEFT = 1_300_000;

const SPLIT = [
  { id: "camera", en: "Camera", pt: "Câmara", amount: 980_000 },
  { id: "platform", en: "Platform", pt: "Plataforma", amount: 720_000 },
  { id: "ait", en: "AIT", pt: "AIT", amount: 460_000 },
  { id: "ops", en: "Operations", pt: "Operações", amount: 240_000 },
] as const;

const allocated = SPLIT.reduce((sum, item) => sum + item.amount, 0);
if (allocated !== TOTAL || SPENT + LEFT !== TOTAL) {
  throw new Error("Lumen-1 demonstration budget does not balance");
}

const copy = {
  title: { en: "Budget", pt: "Orçamento" },
  demo: { en: "Demo", pt: "Demonstração" },
  total: { en: "Total", pt: "Total" },
  spent: { en: "Spent", pt: "Gasto" },
  left: { en: "Left", pt: "Restante" },
} as const;

function formatEuro(locale: Locale, amount: number): string {
  return new Intl.NumberFormat(locale === "pt" ? "pt-PT" : "en-GB", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function BudgetModule({ locale }: { locale: Locale }) {
  const rows = [
    { id: "total", label: copy.total[locale], amount: TOTAL },
    { id: "spent", label: copy.spent[locale], amount: SPENT },
    { id: "left", label: copy.left[locale], amount: LEFT },
    ...SPLIT.map((item) => ({ id: item.id, label: item[locale], amount: item.amount })),
  ];

  return (
    <section className="budget-module scan-page" lang={locale} aria-labelledby="budget-title">
      <h1 id="budget-title" className="budget-title">
        {copy.title[locale]}
      </h1>
      <ul className="scan-list">
        {rows.map((row) => (
          <li key={row.id} className="scan-row pair">
            <span className="scan-id">{row.label}</span>
            <span className="scan-title">{formatEuro(locale, row.amount)}</span>
            <span className="scan-status">{copy.demo[locale]}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
