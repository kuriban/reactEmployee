const path = require('path');
const cleanPlugin = require('clean-webpack-plugin');
const copyPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const NpmInstallPlugin = require('npm-install-webpack-plugin');

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || '2017';
const root = `${__dirname}/src`;
const dist = `${__dirname}/dist`;
const paths = {
  static: {
      images: `${root}/images/**/*`,
      styles: `${root}/styles/**/*`,
      fonts: `${root}/fonts/**/*`
  }
};

const prep = {
  clean: new cleanPlugin([
    dist
  ]),
  copy: new copyPlugin([
    {
        from: paths.static.images,
        to: 'images/',
        flatten: true
    },
    {
        from: paths.static.styles,
        to: 'styles/',
        flatten: true
    },
      {
          from: paths.static.fonts,
          to: 'fonts/',
          flatten: true
      }
  ])
};

const AUTOPREFIXER_BROWSERS = [
    'Android 2.3',
    'Android >= 4',
    'Chrome >= 35',
    'Firefox >= 31',
    'Explorer >= 9',
    'iOS >= 7',
    'Opera >= 12',
    'Safari >= 7.1'
];

module.exports = {
    devtool: 'source-map',
    entry: {
        javascript: './index.js',
        html: './index.html'
    },
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist'
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.json']
    },
    module: {
        loaders: [
            {
                test: /\.html$/,
                loader: 'file?name=[name].[ext]'
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'resolve-url-loader', 'sass-loader'],
                exclude: [/node_modules/],
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'resolve-url-loader'],
                }),
            },
            {
                test: /\.jpg/,
                exclude: /(node_modules|bower_components)/,
                loader: 'url-loader?limit=10000&mimetype=image/jpg'
            },
            {
                test: /\.png/,
                exclude: /(node_modules|bower_components)/,
                loader: 'url-loader?limit=10000&mimetype=image/png'
            },
            {
                test: /\.json$/,
                loader: 'file?name=[name].[ext]'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'file'
            },
            {
                test: /\.(woff|woff2)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'url?prefix=font/&limit=5000'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'url?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            }
        ]
    },
    plugins: [
        prep.clean,
        prep.copy,
        new NpmInstallPlugin()
    ],
    postcss: [
        autoprefixer({
            browsers: AUTOPREFIXER_BROWSERS
        })
    ],
    devServer: {
        contentBase: './dist',
        port: PORT,
        host: HOST
    }
};
