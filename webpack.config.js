const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';
  const plugins = [
    new HtmlWebpackPlugin(
      Object.assign(
        {
          inject: 'body',
          template: path.resolve(__dirname, 'public/index.html')
        },
        isProd
          ? {
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
              }
            }
          : undefined
      )
    )
  ];

  if ('analyze' in argv) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  const config = {
    mode: isProd ? 'production' : 'development',
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js'
    },
    devtool: !isProd && 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: 'ts-loader',
            options: {
              transpileOnly: argv.mode === 'development'
            }
          },
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpe?g|gif|svg|webp)$/i,
          // More information here https://webpack.js.org/guides/asset-modules/
          type: 'asset/inline'
        },
        {
          test: /\.(eot|ttf|woff|woff2|mp4)$/i,
          type: 'asset/resource'
        }
      ]
    },
    optimization: {
      minimize: isProd,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: false,
            mangle: {
              // work around Safari 10/11 bugs in loop scoping and await
              safari10: true
            },
            output: {
              ecma: 5,
              comments: false,
              // Turned on because emoji and regex is not minified properly using default
              // https://github.com/facebook/create-react-app/issues/2488
              ascii_only: true
            }
          }
        })
      ]
    },
    plugins: plugins,
    resolve: {
      symlinks: false,
      extensions: ['.ts', '.tsx', '.js']
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'public')
      },
      allowedHosts: 'all',
      port: 3000,
      client: {
        overlay: {
          errors: true,
          warnings: false
        }
      }
    }
  };

  return config;
};
