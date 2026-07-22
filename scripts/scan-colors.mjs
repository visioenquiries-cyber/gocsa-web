#!/usr/bin/env node
/**
 * Brand-safety gate: the public app must contain NO literal colour values. Every colour
 * comes through the approved @gocsa/tokens package (Brand Kit V1). Fails CI on any hex or
 * rgb()/hsl() literal in apps/web/src. Token `var(--color-*)` references are allowed.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOTS = ["apps/web/src"];
const HEX = /#[0-9a-fA-F]{3,8}\b/;
const FUNC = /\b(rgb|rgba|hsl|hsla)\s*\(/;

const findings = [];

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) {
      walk(p);
    } else if (/\.(tsx?|css)$/.test(p)) {
      const lines = readFileSync(p, "utf8").split("\n");
      lines.forEach((line, i) => {
        if (HEX.test(line) || FUNC.test(line)) {
          findings.push(`${p}:${i + 1}: ${line.trim()}`);
        }
      });
    }
  }
}

for (const root of ROOTS) walk(root);

if (findings.length > 0) {
  console.error(
    "✗ Unapproved literal colour values found in the public app (use @gocsa/tokens):\n" +
      findings.join("\n"),
  );
  process.exit(1);
}
console.log("✔ No literal colour values in the public app — all colour comes from tokens.");
