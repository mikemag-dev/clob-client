const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development', // Set the mode to development
  entry: ['@babel/polyfill', './src/index.ts'], // Entry point for the application
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'bundle',
      type: 'var'
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader', // Use ts-loader for TypeScript files
      },
    ],
  },
};