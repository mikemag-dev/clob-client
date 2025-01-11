const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development', // Set the mode to development
  target: ['node', 'es6'], // Set the target to 'web' for browser environment
  entry: ['./src/index.ts'], // Entry point for the application
  devtool: 'source-map', // Generate source maps for debugging
  output: {
    filename: 'bundle.js', // Output filename
    path: path.resolve(__dirname, 'dist'), // Output directory
    library: {
      name: 'bundle', // Name of the global variable for the library
      type: 'var' // Type of the library (var means it will be available as a global variable)
    },
    chunkFormat: 'array-push' // Specify the chunk format
  },
  resolve: {
    extensions: ['.ts', '.js'], // Add .ts to the resolvable extensions
    fallback: {
      "crypto": require.resolve("crypto-browserify"), // Polyfill for crypto module
      "stream": require.resolve("stream-browserify"), // Polyfill for stream module
      "buffer": require.resolve("buffer/"), // Polyfill for buffer module
      "vm": require.resolve("vm-browserify"), // Polyfill for vm module
      "process": require.resolve("process/browser") // Polyfill for process module
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // Apply this rule to .ts files
        exclude: /node_modules/, // Exclude node_modules directory
        use: 'ts-loader', // Use ts-loader for TypeScript files
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'], // Provide Buffer globally
      process: 'process/browser', // Provide process globally
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development') // Define process.env.NODE_ENV
    }),
  ],
};