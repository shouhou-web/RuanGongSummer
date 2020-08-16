const path = require("path");
const CKEditorWebpackPlugin = require("@ckeditor/ckeditor5-dev-webpack-plugin");
const { styles } = require("@ckeditor/ckeditor5-dev-utils");

module.exports = {
  transpileDependencies: [/ckeditor5-[^/\\]+[/\\]src[/\\].+\.js$/],
  configureWebpack: {
    plugins: [
      // CKEditor needs its own plugin to be built using webpack.
      new CKEditorWebpackPlugin({
        // See https://ckeditor.com/docs/ckeditor5/latest/features/ui-language.html
        language: "en",

        // Append translations to the file matching the `app` name.
        translationsOutputFile: /app/
      })
    ],
    resolve: {
      alias: {
        assets: "@/assets",
        common: "@/common",
        components: "@/components",
        network: "@/network",
        views: "@/views"
      }
    }
  },
  publicPath: "/",
  outputDir: "dist",
  pwa: {
    iconPaths: {
      favicon32: "favicon.ico",
      favicon16: "favicon.ico",
      appleTouchIcon: "favicon.ico",
      maskIcon: "favicon.ico",
      msTileImage: "favicon.ico"
    }
  },
  runtimeCompiler: true,
  chainWebpack: config => {
    // (1.) To handle editor icons, get the default rule for *.svg files first:
    const svgRule = config.module.rule("svg");

    // Then you can either:
    //
    // * clear all loaders for existing 'svg' rule:
    //
    //		svgRule.uses.clear();
    //
    // * or exclude ckeditor directory from node_modules:
    svgRule.exclude.add(path.join(__dirname, "node_modules", "@ckeditor"));

    // Add an entry for *.svg files belonging to CKEditor. You can either:
    //
    // * modify the existing 'svg' rule:
    //
    //		svgRule.use( 'raw-loader' ).loader( 'raw-loader' );
    //
    // * or add a new one:
    config.module
      .rule("cke-svg")
      .test(/ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/)
      .use("raw-loader")
      .loader("raw-loader");

    // (2.) Transpile the .css files imported by the editor using PostCSS.
    // Make sure only the CSS belonging to ckeditor5-* packages is processed this way.
    config.module
      .rule("cke-css")
      .test(/ckeditor5-[^/\\]+[/\\].+\.css$/)
      .use("postcss-loader")
      .loader("postcss-loader")
      .tap(() => {
        return styles.getPostCssConfig({
          themeImporter: {
            themePath: require.resolve("@ckeditor/ckeditor5-theme-lark")
          },
          minify: true
        });
      });
  }
  // devServer: {
  //     open: true,
  //     host: 'localhost',
  //     port: '8081',
  //     proxy: {
  //         '/api': {
  //             target: 'http://39.99.154.244:8080', // 要请求的地址
  //             ws: true,
  //             changeOrigin: true,
  //             pathRewrite: {
  //                 '^/api': ''
  //             }
  //         }
  //     }
  // }
};
