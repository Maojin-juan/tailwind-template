import tailwindcss from "eslint-plugin-tailwindcss";

export default [
  {
    // 指定要應用這些 ESLint 規則的文件範圍
    files: ["src/**/*.{js}"],
    plugins: {
      // 使用 Tailwind CSS 插件
      tailwindcss,
    },
    rules: {
      // 警告：確保 Tailwind CSS 類名按照指定的順序排列
      "tailwindcss/classnames-order": "warn",
      // 關閉：允許使用自定義的類名
      "tailwindcss/no-custom-classname": "off",
    },
    settings: {
      tailwindcss: {
        // 指定 Tailwind CSS 配置文件的路徑
        config: "tailwind.config.js",
      },
    },
  },
];
