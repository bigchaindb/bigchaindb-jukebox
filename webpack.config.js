/* eslint-disable strict, no-console, object-shorthand */
/* eslint-disable import/no-extraneous-dependencies, import/newline-after-import */
'use strict';

const path = require('path');

const webpack = require('webpack');
const combineLoaders = require('webpack-combine-loaders');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PRODUCTION = process.env.NODE_ENV === 'production';

const PATHS = {
    PAYS: path.resolve(__dirname, 'ledger/app.js'),

    BUILD: path.resolve(__dirname, 'build'),
    BUNDLE: path.resolve(__dirname, 'bundle'),
    NODE_MODULES: path.resolve(__dirname, 'node_modules'),
};

const ENTRY = {
    // Use one entry per app
    pays: PATHS.PAYS
};

const ENTRY_NAMES = {
    pays: 'Jukebox',
};


/** EXTERNAL DEFINITIONS INJECTED INTO APP **/
const DEFINITIONS = {
    'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    },
};

/** PLUGINS **/
const PLUGINS = [
    new webpack.DefinePlugin(DEFINITIONS),
    new webpack.NoErrorsPlugin(),
];

const PROD_PLUGINS = [
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        output: {
            comments: false
        },
        sourceMap: true,
    }),
    new webpack.LoaderOptionsPlugin({
        debug: false,
        minimize: true
    }),
];

const EXTRACT_CSS_PLUGIN = new ExtractTextPlugin(
    PRODUCTION ? '[name]/styles.min.css' : '[name]/styles.css', {
        allChunks: true
    }
);


if (PRODUCTION) {
    PLUGINS.push(EXTRACT_CSS_PLUGIN);
}

if (PRODUCTION) {
    PLUGINS.push(...PROD_PLUGINS);
}

/** LOADERS **/
const JS_LOADER = combineLoaders([
    {
        loader: 'babel',
        query: {
            cacheDirectory: true,
        },
    },
]);


const CSS_LOADER = combineLoaders([
    {
        loader: 'css',
        query: {
            sourceMap: true
        }
    },
    { loader: 'postcss' },
    {
        loader: 'sass',
        query: {
            precision: '8', // See https://github.com/twbs/bootstrap-sass#sass-number-precision
            outputStyle: 'expanded',
            sourceMap: true
        }
    },
]);

const LOADERS = [
    {
        test: /\.jsx?$/,
        exclude: [PATHS.NODE_MODULES],
        loader: JS_LOADER,
    },
    {
        test: /\.json$/,
        loader: 'json'
    },
    {
        test: /\.s[ac]ss$/,
        exclude: [PATHS.NODE_MODULES],
        loader: PRODUCTION ? ExtractTextPlugin.extract('style', CSS_LOADER)
                                      : `style!${CSS_LOADER}`,
    },
    {
        test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
        loader: 'url-loader?limit=100000'
    },
];


/** EXPORTED WEBPACK CONFIG **/
module.exports = {
    entry: ENTRY,

    output: {
        filename: PRODUCTION ? 'bundle.min.js' : 'bundle.js',
        path: PRODUCTION ? PATHS.DIST : PATHS.BUILD,
    },


    debug: !PRODUCTION,

    devtool: PRODUCTION ? '#source-map' : '#inline-source-map',

    resolve: {
        extensions: ['', '.js', '.jsx'],
        modules: ['node_modules'], // Don't use absolute path here to allow recursive matching
    },

    plugins: PLUGINS,

    module: {
        loaders: LOADERS,
    },
};
