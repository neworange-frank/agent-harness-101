// split.ts — the pure-logic core of the bill splitter.
// Work in integer cents to avoid floating-point rounding pitfalls.
//
// This is the one proven feature shipped with the template. During the
// workshop you'll extend it: tip percentages, per-person amounts, and
// distributing the rounding remainder fairly.

/**
 * Split a bill evenly across people.
 *
 * @param totalCents - the total bill in integer cents (e.g. $42.00 -> 4200)
 * @param people - the number of people sharing the bill (must be >= 1)
 * @returns the per-person amount in cents, rounded down to the nearest cent
 * @throws {Error} if `people` is less than 1
 *
 * Note: this rounds down, so `people * splitEvenly(...)` can be less than
 * `totalCents` by up to `people - 1` cents. Distributing that remainder is
 * one of the workshop exercises.
 */
export function splitEvenly(totalCents: number, people: number): number {
  if (people < 1) {
    throw new Error("people must be at least 1");
  }
  return Math.floor(totalCents / people);
}
