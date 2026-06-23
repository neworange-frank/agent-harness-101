"use client";

import { useMemo, useState } from "react";
import { splitBill, splitWithCustomAmounts } from "@/lib/split";

const INITIAL_TOTAL_CENTS = 4200;
const INITIAL_PEOPLE = 3;
const INITIAL_TIP_NUMERATOR = 20;

function formatUSD(cents: number): string {
  return (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function parseInteger(value: string, fallback: number): number {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
}

export function SplitterClient() {
  const [totalInput, setTotalInput] = useState(String(INITIAL_TOTAL_CENTS));
  const [peopleInput, setPeopleInput] = useState(String(INITIAL_PEOPLE));
  const [tipInput, setTipInput] = useState(String(INITIAL_TIP_NUMERATOR));
  const [customInputs, setCustomInputs] = useState<string[]>(["1200", "1200", "1200"]);

  const totalCents = Math.max(0, parseInteger(totalInput, INITIAL_TOTAL_CENTS));
  const people = Math.max(1, parseInteger(peopleInput, INITIAL_PEOPLE));
  const tipNumerator = Math.max(0, parseInteger(tipInput, INITIAL_TIP_NUMERATOR));

  const normalizedCustomInputs = useMemo(() => {
    return Array.from({ length: people }, (_, index) => customInputs[index] ?? "0");
  }, [customInputs, people]);

  const splitResult = useMemo(() => splitBill(totalCents, people, tipNumerator), [totalCents, people, tipNumerator]);

  const customResult = useMemo(() => {
    const customAmounts = normalizedCustomInputs.map((value) => Math.max(0, parseInteger(value, 0)));
    return splitWithCustomAmounts(splitResult.totalWithTipCents, customAmounts);
  }, [normalizedCustomInputs, splitResult.totalWithTipCents]);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,244,214,0.9),_rgba(255,255,255,0)_35%),linear-gradient(180deg,#fffdf7_0%,#f5efe4_100%)] px-6 py-10 text-stone-900 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-start">
        <section className="flex-1 rounded-[2rem] border border-stone-200/80 bg-white/80 p-8 shadow-[0_24px_80px_rgba(120,96,52,0.12)] backdrop-blur">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-amber-700">Bill splitter</p>
          <h1 className="max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Tune the split and watch every cent land somewhere intentional.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-600">
            Enter total cents, people, and tip percentage. Then pre-assign custom per-person amounts and let the remainder distribute fairly.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <label className="rounded-2xl bg-stone-950 px-5 py-4 text-stone-50">
              <span className="text-sm uppercase tracking-[0.2em] text-amber-300">Bill cents</span>
              <input
                className="mt-3 w-full rounded-xl border border-stone-700 bg-stone-900 px-3 py-2 text-2xl font-semibold outline-none ring-0"
                inputMode="numeric"
                value={totalInput}
                onChange={(event) => setTotalInput(event.target.value)}
              />
            </label>
            <label className="rounded-2xl bg-amber-100 px-5 py-4 text-amber-950">
              <span className="text-sm uppercase tracking-[0.2em] text-amber-700">Tip percent</span>
              <input
                className="mt-3 w-full rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-2xl font-semibold outline-none ring-0"
                inputMode="numeric"
                value={tipInput}
                onChange={(event) => setTipInput(event.target.value)}
              />
            </label>
            <label className="rounded-2xl bg-stone-200 px-5 py-4 text-stone-900">
              <span className="text-sm uppercase tracking-[0.2em] text-stone-600">People</span>
              <input
                className="mt-3 w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-2xl font-semibold outline-none ring-0"
                inputMode="numeric"
                value={peopleInput}
                onChange={(event) => setPeopleInput(event.target.value)}
              />
            </label>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <article className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Tip</p>
              <p className="mt-2 text-2xl font-semibold">{formatUSD(splitResult.tipCents)}</p>
            </article>
            <article className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Total with tip</p>
              <p className="mt-2 text-2xl font-semibold">{formatUSD(splitResult.totalWithTipCents)}</p>
            </article>
            <article className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Even share</p>
              <p className="mt-2 text-2xl font-semibold">{formatUSD(splitResult.perPersonCents)}</p>
            </article>
          </div>
        </section>

        <section className="w-full rounded-[2rem] border border-stone-200/80 bg-white/85 p-6 shadow-[0_24px_80px_rgba(120,96,52,0.08)] backdrop-blur lg:max-w-2xl">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-stone-500">Custom split</p>
              <h2 className="mt-2 text-2xl font-semibold">Per-person allocations</h2>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800">fair remainder</span>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {normalizedCustomInputs.map((value, index) => (
              <label key={index} className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3">
                <span className="text-sm uppercase tracking-[0.2em] text-stone-500">Person {index + 1} custom cents</span>
                <input
                  className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-lg font-semibold outline-none ring-0"
                  inputMode="numeric"
                  value={value}
                  onChange={(event) => {
                    const next = [...normalizedCustomInputs];
                    next[index] = event.target.value;
                    setCustomInputs(next);
                  }}
                />
              </label>
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <article className="rounded-2xl bg-stone-100 p-4">
              <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Assigned</p>
              <p className="mt-2 text-xl font-semibold">{formatUSD(customResult.assignedCents)}</p>
            </article>
            <article className="rounded-2xl bg-stone-100 p-4">
              <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Unassigned</p>
              <p className="mt-2 text-xl font-semibold">{formatUSD(customResult.unassignedCents)}</p>
            </article>
            <article className="rounded-2xl bg-stone-100 p-4">
              <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Remainder</p>
              <p className="mt-2 text-xl font-semibold">{formatUSD(splitResult.remainderCents)}</p>
            </article>
          </div>

          <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Suggested final amounts</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {customResult.suggestedDistribution.map((entry) => (
                <div key={entry.person} className="rounded-xl bg-stone-100 px-4 py-3">
                  <p className="text-sm text-stone-500">Person {entry.person}</p>
                  <p className="mt-1 text-lg font-semibold">{formatUSD(entry.amountCents)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
