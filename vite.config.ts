import replace from "@rollup/plugin-replace";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import istanbul from "vite-plugin-istanbul";

export default defineConfig({
  base: "/maputnik/", // During local development, files on the Vite server will be 'served' relative to this
  server: {
    port: 5180,
  },
  publicDir: "../AccuWeather.Web.Backend/wwwroot/maputnik",
  build: {
    outDir: "../AccuWeather.Web.Backend/wwwroot/maputnik", // This is where build files will be pushed to (not during local development)
    emptyOutDir: true, // This ensures the directory is empty before
    manifest: "manifest.json", // This produces the manifest.json file lookup for the ViteManifestHelper.cs Asp service
    chunkSizeWarningLimit: 3000,
  },
  plugins: [
    replace({
      preventAssignment: true,
      include: /\/jsonlint-lines-primitives\/lib\/jsonlint.js/,
      delimiters: ["", ""],
      values: {
        "_token_stack:": "",
      },
    }),
    react(),
    istanbul({
      cypress: true,
      requireEnv: false,
      nycrcPath: "./.nycrc.json",
      forceBuildInstrument: true, //Instrument the source code for cypress runs
    }),
  ],
  define: {
    global: "window",
  },
});
