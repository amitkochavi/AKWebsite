// Amit's age, computed from his birth date so it is always current and never
// needs manual updating. Body content can include the token {{age}}, which is
// replaced with this value at render time.
export const BIRTH_YEAR = 1997;
export const BIRTH_MONTH = 12; // December
export const BIRTH_DAY = 10;

export function currentAge(now: Date = new Date()): number {
  let age = now.getUTCFullYear() - BIRTH_YEAR;
  const month = now.getUTCMonth() + 1;
  const day = now.getUTCDate();
  // Subtract a year if this year's birthday has not occurred yet.
  if (month < BIRTH_MONTH || (month === BIRTH_MONTH && day < BIRTH_DAY)) {
    age -= 1;
  }
  return age;
}

/** Replace the {{age}} token in body content with the current age. */
export function applyContentTokens(html: string): string {
  if (!html.includes("{{age}}")) return html;
  return html.replace(/\{\{\s*age\s*\}\}/g, String(currentAge()));
}
