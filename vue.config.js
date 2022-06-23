const path = require("path");
module.exports = {
  pages: {
    index: "src/main.js",
    preview: "src/preview.js",
  },
  configureWebpack: {
    // devServer: {
    //   open: true,
    // 代理
    // proxy: {
    // '/netease-api': {
    //   target: 'http://localhost:3000',
    //   pathRewrite: {
    //     '/netease-api': ''
    //   },
    //   changeOrigin: true,
    //   secure: false
    // }
    // },
    // },
    resolve: {
      // 别名
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  },
};
