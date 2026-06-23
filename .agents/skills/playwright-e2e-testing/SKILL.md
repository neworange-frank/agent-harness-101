---
name: playwright-e2e-testing
description: Generate or review Playwright end-to-end tests using a consistent feature-folder layout, the Page Object pattern, and a kept-in-sync test coverage matrix. Use when writing, updating, or reviewing Playwright spec files, page objects, or coverage docs.
---

# Playwright E2E Test Generation

## Project structure
Each feature has its own folder. The accessibility spec lives in the same folder as the regular spec. Use Playwright's standard Page Object Model with semantic locators (`getByRole`, `getByTestId`, `getByLabel`) — avoid CSS selectors.

```
{feature-name}/
├── {feature-name}.spec.ts          # Integration: mocked backend
├── {feature-name}.journey.spec.ts  # Optional: real backend, full flow
├── {feature-name}.a11y.spec.ts     # Accessibility
├── test-coverage-matrix.md        # Coverage matrix
└── pages/{feature-name}.page.ts   # Page Object Model
```

## Integration specs
- Cover one page; mock the backend with `page.route()`.
- Instantiate the page object in `test.beforeEach`, then `await page.waitForLoadState("domcontentloaded")` after navigation.
- Order tests top-to-bottom by element position; for forms, follow the rendered field order. Navigation/interaction tests come after presence tests for that section.

## Journey specs (optional)
Only for critical real-backend flows. One `test()` per user story; mark each step `test.step("TC-E2E-xx: ...")`. Never mock.

## Duplicate detection
After any change, scan all specs:
- Same element + same assertion = duplicate, even across files.
- Different URLs testing the same component are NOT duplicates.
- A presence test (asserts `href`) plus a click-and-assert-URL test are NOT duplicates; if a "navigation" test only checks visibility, expand it to a real click.

## Test coverage matrix
Every feature folder contains `test-coverage-matrix.md`, kept in sync with specs. Required sections:
1. **Acceptance Criteria** — AC1, AC2, ... **only ACs from the supplied user story**, and **every AC from the user story must appear** (no silent gaps). Never invent an AC because the live page does something interesting (counter, side-effect, email, extra validation). Keep the story's numbering exactly; do not introduce an AC7 if the story stops at AC6. Bold any unimplemented or unclear AC.
2. **Test Scenarios** — TS1, TS2, ... in plain language.
3. **Coverage Matrix** — table mapping each `TC-xx` (or `TC-E2E-xx` for tests that create real data or call external services) to spec file, covered ACs, and TS.
4. **AC Coverage Summary** — per-AC status (Yes / Skipped / Yes (fixme)) and count. Every AC must have at least one mapped test — if the AC is hard to test today, scaffold a `test.fixme(true, "<reason>")` so it stays visible. Never silently omit an AC.
5. **Notes** — reasons for skipped/fixme ACs and known limitations, an **Observed-but-not-in-user-story** subsection for live-page behaviour with no matching AC (no AC index — flagged for product/dev), an **Out-of-scope** subsection for items the user story explicitly puts out-of-scope (with the reason quoted from the story), and an **Open questions** subsection for unresolved questions in the user story.

## Constraints
- Read the target URL from a `BASE_URL` env var with a local fallback; never hardcode URLs in specs.
- No READMEs, seed data, or test plans in the test directory.
- Don't write tests for elements that don't exist on the page — verify the page first.
- Don't invent ACs. Behaviour outside the user story goes under `Notes > Observed-but-not-in-user-story`, never as a new `ACxx`.
- Don't silently drop ACs. Every AC from the user story must appear in the matrix with at least one mapped test (active / fixme / skip). Out-of-scope items go in `Notes > Out-of-scope` with the reason quoted from the story.
