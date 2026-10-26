import type { ModuleId, ViewId } from "../platform/locale";

type IconName = ViewId | "chat" | "star";

const paths: Record<IconName, string> = {
  star: "M12 2.4l1.55 4.9 5.15.18-4.1 3.22 1.42 4.96L12 12.9l-4.02 2.76 1.42-4.96-4.1-3.22 5.15-.18L12 2.4z",
  missions: "M4 5h7v6H4V5zm9 0h7v6h-7V5zM4 13h7v6H4v-6zm9 0h7v6h-7v-6z",
  compliance: "M12 3.2 5.2 6.1v4.7c0 4 2.7 7 6.8 8.6 4.1-1.6 6.8-4.6 6.8-8.6V6.1L12 3.2z",
  phase: "M3 12h18M8.2 12a1.7 1.7 0 1 1-3.4 0 1.7 1.7 0 0 1 3.4 0zM13.7 12a1.7 1.7 0 1 1-3.4 0 1.7 1.7 0 0 1 3.4 0zM19.2 12a1.7 1.7 0 1 1-3.4 0 1.7 1.7 0 0 1 3.4 0z",
  budget: "M6 17V9M12 17V6M18 17v-5",
  schedule: "M4 7h16M4 12h10M4 17h13",
  tests: "M7 4h8l3 3v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm8 .5V7h2.5M8 12h8M8 16h5",
  correspondence: "M4 7h16v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7zm0 0 8 6 8-6",
  team: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3.5 19c.4-2.5 2.4-4 5.5-4s5.1 1.5 5.5 4M16.5 11a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8zM20.5 19c-.3-1.7-1.5-3-3.4-3.5",
  desk: "M3 5h18v11H3V5zm5 14h8M12 16v3",
  chat: "M5 6h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H9l-4 3v-3H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z",
};

export function Icon({ name }: { name: IconName | ModuleId }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
      <path
        d={paths[name]}
        fill={name === "star" ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
