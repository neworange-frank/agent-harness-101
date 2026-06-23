---
name: vitest-component-testing
description: Generates or reviews Vitest/jsdom component tests for frontend components. Use when adding, updating, or reviewing tests for rendered output, user interactions, accessibility states, validation, callbacks, loading states, or empty states in a project that already uses Vitest with jsdom. Avoid for visual styling, responsive layout, browser-only behavior, or end-to-end flows.
---

# Vitest Component Testing

Use the project's existing Vitest/jsdom setup to test component behavior through rendered output and user actions.

## Workflow

1. Inspect nearby tests and test setup. Reuse the same renderer, helpers, mocks, provider wrappers, file naming, and assertion style.
2. Confirm Vitest/jsdom is the right layer. Use it for rendered content, interactions, validation, accessible states, callbacks, loading states, and empty states.
3. If the request is about spacing, colors, responsive layout, hover styles, animations, visual parity, browser-only behavior, routing, or cross-page flows, say Vitest/jsdom is the wrong layer. Suggest an existing browser, visual, or end-to-end test setup if the project has one.
4. Write or review the test around behavior the component exposes. Keep setup minimal and assert the result that matters.
5. Run the smallest relevant test command available for the changed file. If that is not discoverable, report that clearly.

## Query and Interaction Rules

- Find elements by role and accessible name, label text, visible text, or placeholder text.
- Use test IDs only when role, label, text, and placeholder queries do not fit the element.
- Drive interactions through the project's interaction helper APIs.
- Await asynchronous interactions and UI updates.
- After an interaction, assert the behavior change: content appears or disappears, validation is shown, state changes, focus moves, or a provided callback receives the expected value.

## Accessibility

- Verify the semantic contract the component owns: form controls expose the right label or accessible name, and composite widgets such as dialogs, menus, tabs, accordions, and disclosures expose the expected role and state.
- Check states such as disabled, expanded, selected, checked, pressed, current, invalid, and required when the component is responsible for them.
- Test focus only when the component changes focus itself.
- For validation, assert both the visible error and its accessible exposure when the project has matchers/helpers for that.

## Avoid

- Internal state, private functions, implementation-only props, and exact DOM structure.
- CSS selectors, generated class names, utility classes, and design-token classes.
- Assertions for spacing, colors, layout, responsive rendering, hover styles, transitions, or animations.
- Snapshots as the default assertion. Use explicit assertions unless a narrow snapshot is clearly better.
- Mocks that skip the behavior the test is supposed to prove.

## Review Checklist

- The test matches existing project conventions.
- The test proves behavior visible through rendered output, user interaction, accessibility state, or callback output.
- Queries use roles, labels, names, visible text, or placeholders before test IDs.
- Interactions use project-standard helpers and are awaited when needed.
- Assertions avoid classes, private state, snapshots, and DOM structure.
- Visual styling and browser-flow concerns are left to a more appropriate existing test layer.
