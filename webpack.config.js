const path = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    devtool: 'source-map',
    resolve: {
        modules: [
            path.resolve('src'),
            'node_modules'
        ],
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'babel-loader'
            },
            {
              test: /\.s?css$/,
              loaders: ['style-loader', 'css-loader']
            },
            // {
            //   test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
            //   loader: 'file-loader?name=/fonts/[name].[ext]'
            // },
            {
                test: /\.(png|svg|jpg|gif|ico|woff|otf|pdf)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            favicon: 'src/assets/favicon.ico'
        }),
        new webpack.HotModuleReplacementPlugin(),
    ]
}