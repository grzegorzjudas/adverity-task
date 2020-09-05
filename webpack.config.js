/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const { NamedModulesPlugin, HotModuleReplacementPlugin } = require('webpack');

printEnvironment(getEnvironment(), true);

module.exports = {
    entry: path.resolve(__dirname, 'src/index.tsx'),
    mode: getEnvironment(),
    devtool: switchEnvs('cheap-module-source-map'),
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: 'index.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist/static/'),
        contentBasePublicPath: '/static',
        publicPath: '/',
        historyApiFallback: true,
        hot: true,
        hotOnly: true,
        inline: true,
        port: 8081,
        clientLogLevel: 'warning'
    },
    resolve: {
        extensions: [ '.js', '.ts', '.tsx' ]
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx|js)$/,
                exclude: [ /node_modules/, /\.spec.ts$/ ],
                use: [
                    { loader: 'ts-loader' }
                ]
            },
            {
                test: /.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader', options: { url: false } }
                ]
            },
            {
                test: /\.(svg|png|jpg)$/,
                use: [
                    { loader: 'url-loader' }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'head'
        }),
        new ScriptExtHtmlWebpackPlugin({
            defer: 'index.js'
        }),
        new NamedModulesPlugin(),
        new HotModuleReplacementPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/**/*.css', to: 'static/styles/style.css' },
                { from: './src/assets', to: 'static/' }
            ]
        })
    ]
};

function printEnvironment (environment, colors) {
    console.log([
        colors ? '\x1b[34m' : '',
        '===================================',
        `Building for: ${environment}`,
        '===================================',
        colors ? '\x1b[0m' : ''
    ].join('\n'));
}

function getEnvironment () {
    const options = [ 'development', 'production', 'none' ];
    const env = process.env.NODE_ENV;

    return options.includes(env) ? env : 'production';
}

function switchEnvs (dev, prod) {
    if (getEnvironment() === 'development') return dev;

    return prod;
}
