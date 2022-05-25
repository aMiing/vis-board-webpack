const path = require("path");
module.exports = {
  outputDir: "dist",
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
