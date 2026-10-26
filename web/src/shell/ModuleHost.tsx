import { lazy, Suspense, type ComponentType } from "react";
import type { Locale, ModuleId } from "../platform/locale";
import { modules } from "./modules";

type ModuleProps = { locale: Locale };
type ModuleFile = Record<string, ComponentType<ModuleProps>>;

const loaders = import.meta.glob<ModuleFile>(
  "../modules/{compliance,phase,budget,schedule,tests,correspondence,team}/*Module.tsx",
);

const cache = new Map<string, ComponentType<ModuleProps>>();

function Placeholder({ id, locale }: { id: ModuleId; locale: Locale }) {
  const slot = modules.find((item) => item.id === id);
  return (
    <section className="placeholder">
      <h2>{slot ? slot[locale] : id}</h2>
    </section>
  );
}

function hosted(id: ModuleId, file: string, exportName: string): ComponentType<ModuleProps> {
  const cached = cache.get(file);
  if (cached) return cached;
  const load = loaders[file];
  if (!load) {
    function Missing({ locale }: ModuleProps) {
      return <Placeholder id={id} locale={locale} />;
    }
    cache.set(file, Missing);
    return Missing;
  }
  const Loaded = lazy(async () => {
    const mod = await load();
    const Component = mod[exportName];
    if (!Component) {
      return { default: function MissingExport({ locale }: ModuleProps) { return <Placeholder id={id} locale={locale} />; } };
    }
    function Hosted(props: ModuleProps) {
      return <Component {...props} />;
    }
    return { default: Hosted };
  });
  cache.set(file, Loaded);
  return Loaded;
}

export function ModuleHost({ id, locale }: { id: ModuleId; locale: Locale }) {
  const slot = modules.find((item) => item.id === id);
  if (!slot?.file) return <Placeholder id={id} locale={locale} />;
  const Component = hosted(slot.id, slot.file, slot.exportName);
  return (
    <Suspense fallback={<Placeholder id={id} locale={locale} />}>
      <Component locale={locale} />
    </Suspense>
  );
}
