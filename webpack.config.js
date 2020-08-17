const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ChunkRenamePlugin = require("webpack-chunk-rename-plugin");

function resolve(dir) {
  return path.join(
    __dirname,
    '/resources/js',
    dir
  );
}

const rawArgv = process.argv.slice(2);
const args = rawArgv.join(' ');
const report = rawArgv.includes('--report');
let plugins = [new ChunkRenamePlugin({ initialChunksWithEntry: true, '/js/app': 'js/app.js', '/js/vendor': 'js/vendor.js'})];
if (report) {
  plugins.push(new BundleAnalyzerPlugin({
    openAnalyzer: true,
  }));
}
module.exports = {
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': path.join(__dirname, '/resources/js'),
    },
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('icons')],
        options: {
          symbolId: 'icon-[name]',
        },
      },
    ],
  },
  plugins: plugins,
  output: {
    filename: '[name].js',
    chunkFilename: 'js/[name].[chunkhash:6].js',
  },
};
