export type PersonSplit = {
  person: number;
  amountCents: number;
};

export type SplitBillResult = {
  baseTotalCents: number;
  tipCents: number;
  totalWithTipCents: number;
  people: number;
  perPersonCents: number;
  remainderCents: number;
  distributedAmounts: PersonSplit[];
};

function assertPeople(people: number): void {
  if (!Number.isInteger(people) || people < 1) {
    throw new Error("people must be at least 1");
  }
}

function assertCents(totalCents: number, fieldName: string): void {
  if (!Number.isInteger(totalCents) || totalCents < 0) {
    throw new Error(`${fieldName} must be a non-negative integer`);
  }
}

function assertTipNumerator(tipNumerator: number): void {
  if (!Number.isInteger(tipNumerator) || tipNumerator < 0) {
    throw new Error("tip numerator must be a non-negative integer");
  }
}

export function splitEvenly(totalCents: number, people: number): number {
  assertCents(totalCents, "total cents");
  assertPeople(people);

  return Math.floor(totalCents / people);
}

export function calculateTip(totalCents: number, tipNumerator: number, tipDenominator = 100): number {
  assertCents(totalCents, "total cents");
  assertTipNumerator(tipNumerator);

  if (!Number.isInteger(tipDenominator) || tipDenominator < 1) {
    throw new Error("tip denominator must be at least 1");
  }

  return Math.floor((totalCents * tipNumerator) / tipDenominator);
}

export function distributeRemainder(totalCents: number, people: number): PersonSplit[] {
  const perPersonCents = splitEvenly(totalCents, people);
  const remainderCents = totalCents - perPersonCents * people;

  return Array.from({ length: people }, (_, index) => ({
    person: index + 1,
    amountCents: perPersonCents + (index < remainderCents ? 1 : 0),
  }));
}

export function splitBill(totalCents: number, people: number, tipNumerator = 0): SplitBillResult {
  const tipCents = calculateTip(totalCents, tipNumerator);
  const totalWithTipCents = totalCents + tipCents;
  const perPersonCents = splitEvenly(totalWithTipCents, people);
  const remainderCents = totalWithTipCents - perPersonCents * people;

  return {
    baseTotalCents: totalCents,
    tipCents,
    totalWithTipCents,
    people,
    perPersonCents,
    remainderCents,
    distributedAmounts: distributeRemainder(totalWithTipCents, people),
  };
}
