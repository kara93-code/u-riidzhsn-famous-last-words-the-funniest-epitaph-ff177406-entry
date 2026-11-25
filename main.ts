// Famous Last Words: The Funniest Epitaph.
// One line of dying speech, carved in stone: the patient finally wins
// the argument, from beyond the grave.
import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LIMIT = 150;

const EPITAPH = "I told you I was sick.";

function measure(line: string): number {
  return [...line].length;
}

function checkLine(line: string): string {
  const size = measure(line);
  if (size < 1 || size > LIMIT) {
    throw new Error(`epitaph must be 1-${LIMIT} characters, got ${size}`);
  }
  if (line.trim().length === 0) {
    throw new Error("epitaph must not be only whitespace");
  }
  if (line !== line.trim()) {
    throw new Error("epitaph must not start or end with whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("epitaph must be a single line");
  }
  return line;
}

function carve(line: string): void {
  const checked = checkLine(line);
  const folder = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(folder, { recursive: true });
  const target = join(folder, "entry.txt");
  writeFileSync(target, checked + "\n", "utf8");
  chmodSync(target, 0o644);
  const back = readFileSync(target, "utf8").replace(/\n$/, "");
  if (back !== checked) {
    throw new Error("entry.txt does not match the epitaph");
  }
  checkLine(back);
}

carve(EPITAPH);
