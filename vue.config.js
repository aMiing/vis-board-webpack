const path = require("path");
module.exports = {
  pages: {
    // 多页面preview刷新页面的时候回有点问题
    // preview: "src/preview.js",
    index: "src/main.js",
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
