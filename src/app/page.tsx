import { splitEvenly } from "@/lib/split";

// One worked example, rendered from the real split logic, to prove the
// pipeline end-to-end. The rest of the UI is yours to build today.
const TOTAL_CENTS = 4200;
const PEOPLE = 3;
const perPerson = splitEvenly(TOTAL_CENTS, PEOPLE);

const formatUSD = (cents: number) =>
  (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 p-8 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">
        Bill Splitter — built during the workshop
      </h1>
      <p className="max-w-md text-zinc-600 dark:text-zinc-400">
        This is the starter template. The placeholder below comes from the one
        shipped function, <code>splitEvenly</code>. Build the rest of the app
        from here.
      </p>
      <p className="rounded-lg border border-zinc-200 px-5 py-3 text-lg dark:border-zinc-800">
        {formatUSD(TOTAL_CENTS)} split {PEOPLE} ways ={" "}
        <strong>{formatUSD(perPerson)}</strong> each
      </p>
    </main>
  );
}
