import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

const fromProjectRoot = (path) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  root: fromProjectRoot("./client"),
  // Source images remain outside the code directory and are copied into dist/public/assets on build.
  publicDir: fromProjectRoot("../webdev-static-assets/salama-bbq-ordering"),
  build: {
    outDir: fromProjectRoot("./dist/public"),
    emptyOutDir: true,
  },
  server: {
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1",
    ],
  },
});
