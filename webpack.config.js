const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env, options) => {
    const isProduction = options.mode === 'production';

    const config = {
        mode: isProduction ? 'production' : 'development',
        devtool: isProduction ? 'none' : 'source-map',
        watch: !isProduction,
        entry: ['./src/js/index.js', './src/sass/style.scss'],
        output: {
            path: path.join(__dirname, '/dist'),
            filename: 'script.js',
        },
        devServer: {
            contentBase: './dist',
            port: 8888,
            hot: true
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }, {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' 
                    ]
                }, {
                    test: /\.(png|svg|jpe?g|gif)$/,
                    use: [
                        {
                            loader: 'file-loader',
                        }
                    ]
                }, {
                    test: /\.html$/,
                    loader: 'html-loader',
                }, {
                    test: /\.(eot|svg|ttf|woff|woff2)$/,
                    use: [
                        {
                            loader: 'file-loader',
                        }
                    ]
                },
            ]
        },

        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: 'index.html'
            }),
            new MiniCssExtractPlugin({
                filename: 'style.css'
            }),
            new CopyPlugin({
                patterns: [
                    {
                        from: 'src/favicon.ico',
                        to: ''
                    }
                    
                ],
            }),
        ]
    }

    return config;
}