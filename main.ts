// One Star, Written in Sap — make.fun entry.
//
// One line, at most 279 characters: a houseplant leaving a 1-star review
// of its human. Grievance plus the reason for the single star, in the
// plant's own voice: the broken promise of sunlight, the neglect with a
// spray bottle, and the one star going to the only thing that tried —
// the window.
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// SETUP: the grievance — promised sunlight, given a radiator and a cat.
const SETUP =
  "One star. I was promised indirect sunlight and got a radiator, a cat, and a human who waters me only when I faint. ";

// PUNCH: the verdict — neglect with a spray bottle, and the star goes to the window.
const PUNCH =
  "He calls it 'low maintenance'; I call it neglect with a spray bottle. Repotted once, in 2019 — he brags about it. The star is for the window. The window tried.";

// The entry is the two parts joined: one review, grievance earning the star.
const TEXT = SETUP + PUNCH;

function clearDir(dir: string): void {
  // Clear only the directory's contents, never the directory itself:
  // the grader runs on a read-only filesystem whose parent is not writable.
  for (const f of readdirSync(dir)) {
    rmSync(join(dir, f), { force: true, recursive: true });
  }
}

function main(): void {
  // Gate: 1 to 279 characters, never only whitespace.
  if (TEXT.length < 1 || TEXT.length > 279) {
    throw new Error(`entry is ${TEXT.length} chars, gate is 1-279`);
  }
  if (!TEXT.trim()) throw new Error("entry is only whitespace");
  const outDir = "/output";
  mkdirSync(outDir, { recursive: true });
  clearDir(outDir);
  writeFileSync(join(outDir, "entry.txt"), TEXT, "utf8");
}

main();
