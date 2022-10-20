import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";

export default defineConfig({
  test: {
    alias: {
      "@modules": resolve(__dirname, "src", "modules"),
      "@config": resolve(__dirname, "src", "config"),
      "@shared": resolve(__dirname, "src", "shared"),
      "@errors": resolve(__dirname, "src", "errors"),
      "@middlewares": resolve(__dirname, "src", "middlewares"),
      "@utils": resolve(__dirname, "src", "utils"),
    },
  },
});
