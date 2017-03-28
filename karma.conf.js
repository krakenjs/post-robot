var argv = require('yargs').argv;
var path = require('path');
var webpack = require('webpack');

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: __dirname,

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: [
            'mocha',
            'sinon-chai'
        ],


        // list of files / patterns to load in the browser
        files: [
            { pattern: 'test/test.js', included: true, served: true },
            { pattern: 'test/child.js', included: false, served: true },
            { pattern: 'test/*.htm', included: false, served: true },
        ],

        plugins: [
            require('karma-webpack'),
            require('karma-mocha'),
            require('karma-phantomjs-launcher'),
            require('karma-chrome-launcher'),
            require('karma-sinon-chai'),
            require('karma-coverage'),
            require('karma-spec-reporter'),
            require('karma-sourcemap-loader')
        ],

        webpackMiddleware: {
            noInfo: argv['debug'] ? false: true,
            stats: argv['debug'] ? true : false
        },

        webpack: {
            devtool: 'inline-source-map',

            resolve: {
                modules: [
                    __dirname,
                    'node_modules'
                ]
            },

            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /(dist)/,
                        loader: 'babel-loader',
                        query: {
                            presets: ['es2015'],
                            plugins: [
                                'transform-object-rest-spread',
                                'syntax-object-rest-spread',
                                'transform-es3-property-literals',
                                'transform-es3-member-expression-literals',
                                ['transform-es2015-for-of', {loose: true}],
                                [ '__coverage__', { only: `${__dirname}/src` } ]
                            ]
                        }
                    }
                ]
            },
            bail: false,

            plugins: [
                new webpack.DefinePlugin({
                    __TEST__: true,
                    __IE_POPUP_SUPPORT__: true
                })
            ]
        },


        // list of files to exclude
        exclude: [
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'test/**/*.js': ['webpack'],
            'src/**/*.js': ['coverage',  'sourcemap'],
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: [
            'spec',
            'coverage'
        ],

        coverageReporter: {

            reporters: [
                {
                    type: 'text'
                },
                {
                    type : 'html',
                    dir : 'coverage/',
                    subdir: '.'
                }
            ]
        },


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: argv['debug'] ? config.LOG_DEBUG : config.LOG_WARN,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: [argv.browser || 'PhantomJS'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    });
};
