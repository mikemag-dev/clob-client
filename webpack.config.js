const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: path.resolve(__dirname, 'src/index.ts'),
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
        fallback: {
            crypto: require.resolve('crypto-browserify'),
            buffer: require.resolve('buffer'),
            stream: require.resolve('stream-browserify'),
            vm: require.resolve('vm-browserify')
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer']
        }),
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
            // Add any other environment variables you need here
          },
        })
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        library: {
          name: 'bundle', // Name of the global variable for the library
          type: 'var' // Type of the library (var means it will be available as a global variable)
        },
    }
};
//       'process.env.NODE_ENV': JSON.stringify('development') // Define process.env.NODE_ENV
//     }),
//   ],
// };