import { describe, it, expect } from "vitest";
import { splitEvenly } from "./split";

describe("splitEvenly", () => {
  it("splits a clean amount evenly", () => {
    // $42.00 across 3 people -> $14.00 each
    expect(splitEvenly(4200, 3)).toBe(1400);
  });

  it("rounds down on a non-divisible amount", () => {
    // $10.00 across 3 people -> $3.33 each (1 cent remainder left over)
    expect(splitEvenly(1000, 3)).toBe(333);
  });

  it("throws when people is less than 1", () => {
    expect(() => splitEvenly(1000, 0)).toThrow();
  });
});
