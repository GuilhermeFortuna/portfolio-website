import type { Page } from "playwright";

interface NamedPattern {
  name: string;
  pattern: RegExp;
}

// Conservative patterns for common credential/PII shapes that should never
// appear in a published case-study screenshot. Intentionally does not try to
// catch everything — this is a last-resort net before every shutter, not a
// substitute for using synthetic/mock data in the first place.
const PATTERNS: NamedPattern[] = [
  { name: "api-key-like", pattern: /\b(sk|pk|api[_-]?key)[_-][a-zA-Z0-9]{16,}\b/i },
  { name: "bearer-token", pattern: /\bBearer\s+[a-zA-Z0-9._-]{16,}\b/ },
  { name: "aws-access-key", pattern: /\bAKIA[0-9A-Z]{16}\b/ },
  { name: "password-field-label", pattern: /\bpassword\s*[:=]\s*\S+/i },
  { name: "connection-string", pattern: /\b\w+:\/\/[^\s]+:[^\s]+@[^\s]+/ },
  { name: "env-file-value", pattern: /\.env[a-zA-Z.]*\s*[:=]/i },
];

export interface SafetyScanResult {
  matched: boolean;
  patternName?: string;
}

/**
 * Scans the page's visible text content for credential/PII-shaped patterns
 * immediately before a shutter. On a match, the caller should abort that one
 * capture — never log the matched text itself, only the pattern name.
 */
export async function runSafetyScan(page: Page): Promise<SafetyScanResult> {
  const text = await page.evaluate(() => document.body.innerText);
  for (const { name, pattern } of PATTERNS) {
    if (pattern.test(text)) {
      return { matched: true, patternName: name };
    }
  }
  return { matched: false };
}
