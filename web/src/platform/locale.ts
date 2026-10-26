export type Locale = "en" | "pt";

export type ModuleId =
  | "missions"
  | "compliance"
  | "phase"
  | "budget"
  | "schedule"
  | "tests"
  | "correspondence"
  | "team"
  | "blueprints";

export type ViewId = ModuleId | "desk";
