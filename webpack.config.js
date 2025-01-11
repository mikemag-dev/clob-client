const path = require('path');

module.exports = {
  mode: 'development', // Set the mode to development
  entry: ['./src/index.ts'], // Entry point for the application
  devtool: 'source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'bundle',
      type: 'var'
    }
  },
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: {
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "buffer": require.resolve("buffer/"),
        "vm": require.resolve("vm-browserify"),
    },
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