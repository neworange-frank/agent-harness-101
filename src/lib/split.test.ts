import { describe, expect, it } from "vitest";
import {
  calculateTip,
  distributeRemainder,
  splitBill,
  splitEvenly,
  splitWithCustomAmounts,
} from "./split";

describe("splitEvenly", () => {
  it("splits a clean amount evenly", () => {
    expect(splitEvenly(4200, 3)).toBe(1400);
  });

  it("rounds down on a non-divisible amount", () => {
    expect(splitEvenly(1000, 3)).toBe(333);
  });

  it("throws when people is less than 1", () => {
    expect(() => splitEvenly(1000, 0)).toThrow("people must be at least 1");
  });
});

describe("calculateTip", () => {
  it("calculates percentage tip in cents", () => {
    expect(calculateTip(4500, 20)).toBe(900);
  });

  it("supports one-third tip with integer math", () => {
    expect(calculateTip(3000, 1, 3)).toBe(1000);
  });

  it("rounds down fractional cents", () => {
    expect(calculateTip(1000, 1, 3)).toBe(333);
  });
});

describe("distributeRemainder", () => {
  it("distributes leftover cents to the first people", () => {
    expect(distributeRemainder(1000, 3)).toEqual([
      { person: 1, amountCents: 334 },
      { person: 2, amountCents: 333 },
      { person: 3, amountCents: 333 },
    ]);
  });

  it("returns equal amounts when there is no remainder", () => {
    expect(distributeRemainder(4200, 3)).toEqual([
      { person: 1, amountCents: 1400 },
      { person: 2, amountCents: 1400 },
      { person: 3, amountCents: 1400 },
    ]);
  });
});

describe("splitBill", () => {
  it("returns per-person amounts, tip, and remainder details", () => {
    expect(splitBill(1000, 3, 20)).toEqual({
      baseTotalCents: 1000,
      tipCents: 200,
      totalWithTipCents: 1200,
      people: 3,
      perPersonCents: 400,
      remainderCents: 0,
      distributedAmounts: [
        { person: 1, amountCents: 400 },
        { person: 2, amountCents: 400 },
        { person: 3, amountCents: 400 },
      ],
    });
  });

  it("handles one-third tip and distributes the remainder", () => {
    expect(splitBill(1000, 3, 33)).toEqual({
      baseTotalCents: 1000,
      tipCents: 330,
      totalWithTipCents: 1330,
      people: 3,
      perPersonCents: 443,
      remainderCents: 1,
      distributedAmounts: [
        { person: 1, amountCents: 444 },
        { person: 2, amountCents: 443 },
        { person: 3, amountCents: 443 },
      ],
    });
  });
});

describe("splitWithCustomAmounts", () => {
  it("fills the remainder on top of custom amounts", () => {
    expect(splitWithCustomAmounts(4200, [1200, 1200, 1200])).toEqual({
      totalCents: 4200,
      assignedCents: 3600,
      unassignedCents: 600,
      customAmounts: [
        { person: 1, amountCents: 1200 },
        { person: 2, amountCents: 1200 },
        { person: 3, amountCents: 1200 },
      ],
      suggestedDistribution: [
        { person: 1, amountCents: 1400 },
        { person: 2, amountCents: 1400 },
        { person: 3, amountCents: 1400 },
      ],
    });
  });

  it("distributes leftover cents fairly when the remainder is uneven", () => {
    expect(splitWithCustomAmounts(1000, [200, 300, 300])).toEqual({
      totalCents: 1000,
      assignedCents: 800,
      unassignedCents: 200,
      customAmounts: [
        { person: 1, amountCents: 200 },
        { person: 2, amountCents: 300 },
        { person: 3, amountCents: 300 },
      ],
      suggestedDistribution: [
        { person: 1, amountCents: 267 },
        { person: 2, amountCents: 367 },
        { person: 3, amountCents: 366 },
      ],
    });
  });

  it("throws when custom amounts exceed the total", () => {
    expect(() => splitWithCustomAmounts(1000, [500, 400, 200])).toThrow(
      "custom amounts cannot exceed the total cents",
    );
  });
});
