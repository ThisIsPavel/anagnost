const path = require("path");
const fs = require("fs");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const entryExists = (filePath) => {
  try {
    return fs.existsSync(path.resolve(__dirname, filePath));
  } catch {
    return false;
  }
};

const getEntryPoints = () => {
  const entries = {
    content: "./src/content-script/index.js",
    popup: "./src/popup/index.js",
  };

  // Добавляем background только если файл существует
  if (entryExists("./src/background/index.js")) {
    entries.background = "./src/background/index.js";
  }

  return entries;
};

module.exports = {
  mode: "production",
  entry: getEntryPoints(),
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  modules: false,
                  targets: "> 0.25%, not dead",
                },
              ],
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "src/manifest.json", to: "." },
        { from: "src/assets", to: "assets" },
        { from: "src/popup/style.css", to: "." },
      ],
    }),
    new HtmlPlugin({
      template: "./src/popup/index.html",
      filename: "popup.html",
      chunks: ["popup"],
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
  optimization: {
    usedExports: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: {
            passes: 2,
            unused: true,
            dead_code: true,
          },
          mangle: {
            toplevel: true,
          },
        },
      }),
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
};
