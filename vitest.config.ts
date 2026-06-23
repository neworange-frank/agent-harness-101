import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Pure-logic unit tests live next to the code they cover.
    include: ["src/**/*.test.ts"],
  },
});
