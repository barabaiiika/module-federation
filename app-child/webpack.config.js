const path = require('path');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;

module.exports = {
  entry: './src/index.jsx',
  output: {
    publicPath: 'auto',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-modules',
              '@babel/preset-react',
            ],
          },
        }
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'child',
      filename: 'remote-service.js',
      exposes: {
        './App': './src/index',
      },
    }),
  ],
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
};