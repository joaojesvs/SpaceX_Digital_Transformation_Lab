import type { Intent } from "./answers";

export type Note = {
  id: string;
  kind: "log" | "question";
  text: string;
  intent?: Intent;
  at: string;
};
