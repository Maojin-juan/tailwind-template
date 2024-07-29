import { defineConfig, loadEnv } from "vite";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import liveReload from "vite-plugin-live-reload";

import path from "node:path";
import { fileURLToPath } from "node:url";
import { globSync } from "glob";

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

export default defineConfig(({ mode }) => {
  //載入環境變數
  //mode：指定當前的模式（例如 'development'、'production' 等）。
  //process.cwd()：返回 Node.js 程序的當前工作目錄，通常是專案的根目錄。
  const env = loadEnv(mode, process.cwd());

  //設定基礎路徑，開發模式下為 "/"，生產模式下為 env.viteBase 或 "/"
  const base = mode === "development" ? "/" : env.viteBase || "/";

  return {
    base,
    build: {
      rollupOptions: {
        input: Object.fromEntries(
          globSync("src/pages/**/*.html").map((file) => [
            path.relative(
              "src/pages",
              file.slice(0, -path.extname(file).length),
            ),
            fileURLToPath(new URL(file, import.meta.url)),
          ]),
        ),
      },
      outDir: "dist",
    },
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
    server: {
      port: 5487,
      open: "/src/pages/index.html",

      // fs.allow 是一個允許訪問的目錄列表。這些目錄是通過 path.resolve 方法解析出來的絕對路徑。
      fs: {
        allow: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "src/pages"),
        ],
      },
    },
    plugins: [
      liveReload([
        "./src/layout/**/*.ejs",
        "./src/pages/**/*.ejs",
        "./src/pages/**/*.html",
      ]),
      ViteEjsPlugin({
        base: mode === "development" ? "/src/pages/" : base,
      }),
      moveOutputPlugin(),
    ],
  };
});
