# Agent Harness 101 — Workshop Template

A zero-setup starter for the workshop. You'll build a **bill splitter** on top of
this skeleton. It runs entirely locally: no accounts, no API keys, no `.env`.

Stack: Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Vitest.

## Prerequisites

- Node 20+
- A GitHub account
- The [`gh` CLI](https://cli.github.com/)
- [Claude Code](https://claude.com/claude-code) installed

## Quickstart

1. **Click "Use this template"** on GitHub → creates your own repo. Keep it
   **public** so GitHub Actions minutes are free (private repos have a limited
   free allowance).
2. **Authenticate `gh`:**
   ```bash
   gh auth login   # choose browser/OAuth; run `gh auth setup-git` if prompted
   ```
   This authenticates both the GitHub API and `git push`. _(Fallback: a
   fine-grained Personal Access Token also works.)_
3. **Clone, install, run:**
   ```bash
   git clone <your-repo-url>
   cd <repo>
   npm install
   npm run dev    # → http://localhost:3000
   npm test       # the shipped split test passes
   ```
4. **Launch the agent:**
   ```bash
   claude
   ```

## The check gate

One command runs everything that gates a merge:

```bash
npm run check    # typecheck + lint + test
```

CI runs this **exact same command**, so what passes on your machine is what
turns the PR green.

## How CI works

Open a pull request → GitHub Actions runs `npm run check` (typecheck, lint,
test) → status checks appear on the PR → merge when green. Inspect from the
terminal with:

```bash
gh pr checks      # status of checks on the current PR
gh run view       # details of a workflow run
```

## What you'll build today

Starting from the one shipped function, `splitEvenly` (in `src/lib/split.ts`):

- A UI to enter a bill total and number of people
- Tip percentages
- Per-person custom amounts
- Fair distribution of the rounding remainder (the leftover cents)

> **Extend at home:** wire up a CMS (e.g. [Sanity](https://www.sanity.io/)) and
> deploy (e.g. [Vercel](https://vercel.com/)) — both out of scope for today.
