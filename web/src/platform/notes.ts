import type { Intent } from "./answers";

export type Note = {
  id: string;
  kind: "log" | "question";
  text: string;
  intent?: Intent;
  attachmentName?: string;
  reply?: string;
  at: string;
};
