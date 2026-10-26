declare module "node:fs" {
  export function readFileSync(path: string, encoding: "utf8"): string;
  export function readdirSync(path: string): string[];
  export function statSync(path: string): { isFile(): boolean };
}

declare module "node:path" {
  export function join(...parts: string[]): string;
  export function resolve(...parts: string[]): string;
  export function dirname(p: string): string;
}

declare module "node:url" {
  export function fileURLToPath(url: string | URL): string;
}

declare const process: {
  argv: string[];
  cwd(): string;
  exit(code?: number): never;
  stdout: { write(chunk: string): void };
  stderr: { write(chunk: string): void };
};
