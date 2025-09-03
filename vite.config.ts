import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import backloop from "vite-plugin-backloop.dev";

export default defineConfig({
  plugins: [tailwindcss(), tsconfigPaths(), backloop("dr-app", 5565)],
  build: {
    outDir: "dist",
  },
  base: "/",
});
