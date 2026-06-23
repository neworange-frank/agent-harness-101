import { splitBill } from "@/lib/split";

const TOTAL_CENTS = 4200;
const PEOPLE = 3;
const TIP_NUMERATOR = 1;
const TIP_DENOMINATOR = 3;

const example = splitBill(TOTAL_CENTS, PEOPLE, 0);
const oneThirdTipCents = Math.floor((TOTAL_CENTS * TIP_NUMERATOR) / TIP_DENOMINATOR);
const tippedTotalCents = TOTAL_CENTS + oneThirdTipCents;
const tippedExample = splitBill(tippedTotalCents, PEOPLE, 0);

const formatUSD = (cents: number) =>
  (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,244,214,0.9),_rgba(255,255,255,0)_35%),linear-gradient(180deg,#fffdf7_0%,#f5efe4_100%)] px-6 py-10 text-stone-900 sm:px-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 lg:flex-row lg:items-start">
        <section className="flex-1 rounded-[2rem] border border-stone-200/80 bg-white/80 p-8 shadow-[0_24px_80px_rgba(120,96,52,0.12)] backdrop-blur">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-amber-700">
            Bill splitter
          </p>
          <h1 className="max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Split a check, keep every cent accounted for.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-600">
            The core splitter now covers even splits, a one-third tip example,
            per-person totals, and fair remainder distribution using integer-cent math.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <article className="rounded-2xl bg-stone-950 px-5 py-4 text-stone-50">
              <p className="text-sm uppercase tracking-[0.2em] text-amber-300">Bill</p>
              <p className="mt-2 text-3xl font-semibold">{formatUSD(TOTAL_CENTS)}</p>
            </article>
            <article className="rounded-2xl bg-amber-100 px-5 py-4 text-amber-950">
              <p className="text-sm uppercase tracking-[0.2em] text-amber-700">One-third tip</p>
              <p className="mt-2 text-3xl font-semibold">{formatUSD(oneThirdTipCents)}</p>
            </article>
            <article className="rounded-2xl bg-stone-200 px-5 py-4 text-stone-900">
              <p className="text-sm uppercase tracking-[0.2em] text-stone-600">People</p>
              <p className="mt-2 text-3xl font-semibold">{PEOPLE}</p>
            </article>
          </div>
        </section>

        <section className="w-full rounded-[2rem] border border-stone-200/80 bg-white/85 p-6 shadow-[0_24px_80px_rgba(120,96,52,0.08)] backdrop-blur lg:max-w-xl">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-stone-500">Current spec</p>
              <h2 className="mt-2 text-2xl font-semibold">Worked examples</h2>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800">
              cents only
            </span>
          </div>

          <div className="mt-6 space-y-5">
            <article className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Even split</p>
                  <p className="mt-1 text-xl font-semibold">{formatUSD(example.perPersonCents)} each</p>
                </div>
                <p className="text-sm text-stone-500">{formatUSD(example.baseTotalCents)} total</p>
              </div>
            </article>

            <article className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-amber-700">With tip</p>
                  <p className="mt-1 text-xl font-semibold">{formatUSD(tippedTotalCents)} final total</p>
                </div>
                <p className="text-sm text-amber-700">{formatUSD(oneThirdTipCents)} added</p>
              </div>
            </article>

            <article className="rounded-2xl border border-stone-200 bg-white p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Per person</p>
                  <p className="mt-1 text-xl font-semibold">{formatUSD(tippedExample.perPersonCents)} base share</p>
                </div>
                <p className="text-sm text-stone-500">
                  remainder {formatUSD(tippedExample.remainderCents)}
                </p>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {tippedExample.distributedAmounts.map((entry) => (
                  <div key={entry.person} className="rounded-xl bg-stone-100 px-4 py-3">
                    <p className="text-sm text-stone-500">Person {entry.person}</p>
                    <p className="mt-1 text-lg font-semibold">{formatUSD(entry.amountCents)}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}
