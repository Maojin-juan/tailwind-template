import { defineConfig } from "vite";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import liveReload from "vite-plugin-live-reload";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { glob } from "glob";

function moveOutputPlugin() {
  return {
    name: "move-output",
    enforce: "post",
    apply: "build",
    async generateBundle(options, bundle) {
      for (const fileName in bundle) {
        if (fileName.startsWith("src/pages/")) {
          const newFileName = fileName.slice("src/pages/".length);
          bundle[fileName].fileName = newFileName;
        }
      }
    },
  };
}

export default defineConfig({
  base: "/tailwind-template/",
  plugins: [
    liveReload([
      "./src/layout/**/*.ejs",
      "./src/pages/**/*.ejs",
      "./src/pages/**/*.html",
    ]),
    ViteEjsPlugin(),
    moveOutputPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    // 啟動 server 時預設開啟的頁面
    open: "src/pages/index.html",
  },
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        glob
          .sync("src/pages/**/*.html")
          .map((file) => [
            path.relative(
              "src",
              file.slice(0, file.length - path.extname(file).length),
            ),
            fileURLToPath(new URL(file, import.meta.url)),
          ]),
      ),
    },
    outDir: "dist",
  },
});
