import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { resolve, dirname } from "path";
import { fileUrltoPath } from "url";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "#components": resolve(
        dirname(fileUrltoPath(import.meta.url)),
        "components",
      ),
      "#constants": resolve(
        dirname(fileUrltoPath(import.meta.url)),
        "constants",
      ),
      "#store": resolve(dirname(fileUrltoPath(import.meta.url)), "store"),
      "#hoc": resolve(dirname(fileUrltoPath(import.meta.url)), "hoc"),
      "#windows": resolve(dirname(fileUrltoPath(import.meta.url)), "windows"),
    },
  },
});
