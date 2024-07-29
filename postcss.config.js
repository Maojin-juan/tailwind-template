import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";

export default {
  plugins: [tailwindcss("./tailwind.config.js"), autoprefixer, cssnano],
};

//預設靈活度較差的 PostCSS 設定檔
// export default {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//   },
// }
