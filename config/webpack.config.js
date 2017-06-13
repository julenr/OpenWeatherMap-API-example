const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');
const Clean = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const pkg = require('../package.json');

const TARGET = process.env.npm_lifecycle_event;
// NPM Parameters --notypes --sourcemap
const NPM_PARAMS = {
  sourcemap: process.env.npm_config_sourcemap
};

const PATHS = {
  appSource: path.join(process.cwd(), 'source'),
  app: path.join(process.cwd(), 'source/index.js'),
  build: path.join(process.cwd(), 'build')
};

let webPackModuleExport;

const common = {
  resolve: {
    modules: [PATHS.appSource, 'node_modules'],
    extensions: ['.js', '.jsx', '.json']
  },
  output: {
    path: PATHS.build,
    publicPath: '/',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        enforce: 'pre',
        include: [
          PATHS.appSource
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: ['url-loader?limit=40000&name=assets/images/[name].[ext]'],
        include: PATHS.appSource
      }
    ]
  }
};

if (TARGET === 'start' || !TARGET) {
  webPackModuleExport = merge(common, {
    entry: {
      app: PATHS.app
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new HtmlwebpackPlugin({
        template: './config/wptemplates/develop.webpack.ejs',
        chunksSortMode: function (chunk1, chunk2) {
          const orders = ['app'];
          const order1 = orders.indexOf(chunk1.names[0]);
          const order2 = orders.indexOf(chunk2.names[0]);
          return order1 > order2 ? 1 : order1 < order2 ? -1 : 0;
        },
        minify: {}
      }),
      new webpack.LoaderOptionsPlugin({
        options: {
          context: __dirname
        }
      }),
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(true)
      })
    ],
    devServer: {
      compress: true,
      hot: true,
      hotOnly: true,
      inline: true,
      https: true,
      port: process.env.PORT || 4000,
      host: 'localhost',
      publicPath: '/',
      disableHostCheck: true,
      historyApiFallback: true,
      quiet: false,
      overlay: false,
      open: false
    }
  });
}

if (TARGET === 'build') {
  // Gather Vendor Modules for Vendor Chunk
  const vendorPkgs = Object.keys(pkg.dependencies);
  webPackModuleExport = merge(common, {
    entry: {
      iezi: PATHS.app,
      ikanon: vendorPkgs
    },
    output: {
      path: PATHS.build,
      filename: '[name].[chunkhash].js'
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName: '[hash:base64:4]',
                  importLoaders: 1,
                  minimize: true
                }
              },
              'postcss-loader'
            ]
          }),
          include: PATHS.appSource
        }
      ]
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
        options: {
          context: __dirname
        }
      }),
      new Clean([PATHS.build], {
        root: process.cwd(),
        verbose: false,
        dry: false
      }),
      new HtmlwebpackPlugin({
        template: './config/wptemplates/production.webpack.ejs',
        chunksSortMode: function (chunk1, chunk2) {
          const orders = ['ikanon', 'iezi'];
          const order1 = orders.indexOf(chunk1.names[0]);
          const order2 = orders.indexOf(chunk2.names[0]);
          return order1 > order2 ? 1 : order1 < order2 ? -1 : 0;
        },
        inlineSource: 'manifest',
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        }
      }),
      new HtmlWebpackInlineSourcePlugin(),
      new ExtractTextPlugin('styles.[chunkhash].css'),
      new StyleExtHtmlWebpackPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        names: ['ikanon', 'manifest']
      }),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: true,
        output: {
          comments: false
        },
        compress: {
          screw_ie8: true,
          warnings: false,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
          // negate_iife: false,
          unsafe_comps: true,
          properties: true,
          keep_fargs: false,
          pure_getters: true,
          collapse_vars: true,
          unsafe: true,
          drop_debugger: true,
          booleans: true,
          loops: true,
          hoist_funs: true,
          cascade: true,
          drop_console: true
        }
      }),
      new webpack.optimize.AggressiveMergingPlugin(),
      new CompressionPlugin({
        asset: '[file]',
        algorithm: 'gzip',
        test: /\.(js)$/,
        threshold: 2048,
        minRatio: 0.8
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        },
        __DEV__: JSON.stringify(false)
      }),
      new SWPrecacheWebpackPlugin({
        cacheId: 'trade-me',
        filename: 'sw.js',
        maximumFileSizeToCacheInBytes: 4194304,
        minify: true,
        runtimeCaching: [
          {
            handler: 'cacheFirst',
            urlPattern: /[.]mp3$/
          }
        ]
      })
    ]
  });
}

module.exports = webPackModuleExport;
