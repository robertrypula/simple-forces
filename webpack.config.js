const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const packageJson = require('./package.json');
const version = packageJson.version;
const packageName = packageJson.name;
const libraryName = packageName.toLowerCase().split('-').map(chunk => chunk.charAt(0).toUpperCase() + chunk.slice(1)).join('');

function getConfig(env) {
  return {
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    target: 'web',
    output: {
      filename: '[name].js',
      library: libraryName,
      libraryTarget: 'umd',
      path: path.resolve(__dirname, 'dist'),
      globalObject: 'this'
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'dev-browser.html',
        hash: true,
        minify: false,
        template: './src/dev-browser.html',
        excludeAssets: [/^dev\-node.*.js/]      // https://github.com/jantimon/html-webpack-plugin#filtering-chunks
      }),
      new HtmlWebpackExcludeAssetsPlugin(),       // https://stackoverflow.com/a/50830422
      new webpack.DefinePlugin({
        DEVELOPMENT: JSON.stringify(env.DEVELOPMENT === true),
        PRODUCTION: JSON.stringify(env.PRODUCTION === true)
      })
    ]
  };
}

function fillDev(config) {
  config.mode = 'development';
  config.entry = {
    [`${packageName}-v${version}`]: './src/lib/index.ts',
    [`dev-node`]: './src/dev-node.ts'
  };

  config.devtool = 'inline-source-map';

  config.devServer = {
    contentBase: path.resolve(__dirname),   // TODO probably not needed
    publicPath: '/dist/',
    compress: true,
    port: 8000,
    hot: false,
    openPage: 'dist/dev-browser.html',
    overlay: {
      warnings: true,
      errors: true
    }
  };
}

function fillProd(config) {
  config.mode = 'production';
  config.entry = {
    [`${packageName}-v${version}`]: './src/lib/index.ts'
  };

  config.devtool = 'source-map';

  config.plugins.push(
    new CopyWebpackPlugin(
      [
        {
          from: path.resolve(__dirname) + '/src/dev-node-vanilla.js',
          to: path.resolve(__dirname) + '/dist/dev-node-vanilla.js',
          toType: 'file'
        }
      ]
    )
  );
}

module.exports = (env) => {
  const config = getConfig(env);

  if (env.DEVELOPMENT === true) {
    fillDev(config);
  } else if (env.PRODUCTION === true) {
    fillProd(config);
  } else {
    throw 'Please set the environment!';
  }

  return config;
};
