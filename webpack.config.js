const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const WebpackIconfontPluginNodejs = require("webpack-iconfont-plugin-nodejs");

module.exports = {
  // Mode will be set via CLI arguments (dev/prod)
  entry: {
    // Primary bundle including JS and SCSS
    "house-of-gio": [
      "./assets/_src/js/house-of-gio.script.js",
      "./assets/_src/css/house-of-gio.style.scss",
    ],
  },
  output: {
    path: path.resolve(__dirname, "assets"),
    filename: "js/[name].min.js",
    publicPath: "/assets/",
    clean: false, // Don't clean existing assets unless necessary
  },
  module: {
    rules: [
      // JavaScript: Babel loader for transpiling
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      // Styles: SCSS -> CSS -> PostCSS (Tailwind) -> Extract
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["postcss-preset-env"], ["autoprefixer"]],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                silenceDeprecations: ["import"],
                quietDeps: true,
              },
            },
          },
        ],
      },
      // Images
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[name][ext]",
        },
      },
      // Fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext]",
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({ extractComments: false }), // Minify JS
      // CSS minification happens by default in production with css-minimizer-webpack-plugin if added,
      // but webpack 5 handles basic minification. For best results we'd add CssMinimizerPlugin.
    ],
  },
  plugins: [
    // Extract CSS to its own file
    new MiniCssExtractPlugin({
      filename: "css/[name].style.min.css",
    }),
    // Provide jQuery globally
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    }),
    // Generate icon fonts
    new WebpackIconfontPluginNodejs({
      fontName: "icon",
      cssPrefix: "icon",
      svgs: path.join(__dirname, "assets/_src/icons/*.svg"),
      fontsOutput: path.join(__dirname, "assets/_src/fonts"),
      cssOutput: path.join(__dirname, "assets/_src/css/icons.scss"),
      fontHeight: 1001,
      normalize: true,
      formats: ["ttf", "eot", "woff", "woff2", "svg"],
    }),
    // Force exit when build is done (to fix hanging issue caused by plugins)
    {
      apply: (compiler) => {
        compiler.hooks.done.tap("DonePlugin", (stats) => {
          if (compiler.options.mode === "production") {
            console.log("Build finished. Force exiting...");
            setTimeout(() => process.exit(0), 100);
          }
        });
      },
    },
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, "./"),
    },
    compress: true,
    port: 3000,
    hot: true,
    open: true,
    watchFiles: ["assets/_src/**/*.js", "assets/_src/**/*.scss", "*.html"],
    // proxy: [
    //   {
    //     context: ["/"],
    //     target: "http://localhost:3000",
    //     changeOrigin: true,
    //   },
    // ],
  },
  resolve: {
    extensions: [".js", ".scss"],
    alias: {
      jquery: "jquery/dist/jquery.min.js",
    },
  },
};
