
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var webpack = require('webpack');
let gulpFlowtype = require('gulp-flowtype');
var gulpWebpack = require('webpack-stream');
var Server = require('karma').Server;
var argv = require('yargs').argv;
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var yargs = require('yargs');
var qs = require('querystring');

gulp.task('test', ['lint', 'typecheck', 'karma']);
gulp.task('build', ['test', 'webpack', 'webpack-min']);

var MODULE_NAME = 'postRobot';



function buildWebpackConfig({  filename, modulename, minify = false, globals = {} }) {

    globals = {
        __TEST__:             false,
        __IE_POPUP_SUPPORT__: false,
        ...globals
    };

    const PREPROCESSOR_OPTS = {
        'ifdef-triple-slash': 'false',
        ...globals
    };

    return {
        stats: {
            hash: yargs.argv['debug'] ? true : false,
            timings: yargs.argv['debug'] ? true : false,
            chunks: yargs.argv['debug'] ? true : false,
            chunkModules: yargs.argv['debug'] ? true : false,
            modules: yargs.argv['debug'] ? true : false,
            cached: yargs.argv['debug'] ? true : false,
            cachedAssets: yargs.argv['debug'] ? true : false,
            reasons: yargs.argv['debug'] ? true : false,
            source: yargs.argv['debug'] ? true : false,
            errorDetails: yargs.argv['debug'] ? true : false,
            performance: yargs.argv['debug'] ? true : false,
            warnings: yargs.argv['debug'] ? true : false
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: `ifdef-loader?${ qs.encode(PREPROCESSOR_OPTS) }`
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader'
                }
            ]
        },
        resolve: {
            modules: [
                'node_modules',
                'src',
                'client'
            ]
        },
        output: {
            filename: filename,
            libraryTarget: 'umd',
            umdNamedDefine: true,
            library: modulename
        },
        plugins: [
            new webpack.DefinePlugin(globals),
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map'
            }),
            new UglifyJSPlugin({
                test: /\.js$/,
                beautify: !minify,
                minimize: minify,
                compress: { warnings: false },
                mangle: minify,
                sourceMap: true
            })
        ],
        bail: true
    };
}

gulp.task('webpack', [ 'webpack-max', 'webpack-min', 'webpack-max-ie', 'webpack-min-ie' ]);

gulp.task('webpack-max', function() {
    return gulp.src('src/index.js')
        .pipe(gulpWebpack(buildWebpackConfig({
            filename: `post-robot.js`,
            modulename: MODULE_NAME
        }), webpack))
        .pipe(gulp.dest('dist'));
});

gulp.task('webpack-min', function() {
    return gulp.src('src/index.js')
        .pipe(gulpWebpack(buildWebpackConfig({
            filename: `post-robot.min.js`,
            modulename: MODULE_NAME,
            minify: true
        }), webpack))
        .pipe(gulp.dest('dist'));
});

gulp.task('webpack-max-ie', function() {
    return gulp.src('src/index.js')
        .pipe(gulpWebpack(buildWebpackConfig({
            filename: `post-robot.ie.js`,
            modulename: MODULE_NAME,
            globals: {
                __IE_POPUP_SUPPORT__: true
            }
        }), webpack))
        .pipe(gulp.dest('dist'));
});

gulp.task('webpack-min-ie', function() {
    return gulp.src('src/index.js')
        .pipe(gulpWebpack(buildWebpackConfig({
            filename: `post-robot.ie.min.js`,
            modulename: MODULE_NAME,
            minify: true,
            globals: {
                __IE_POPUP_SUPPORT__: true
            }
        }), webpack))
        .pipe(gulp.dest('dist'));
});

gulp.task('typecheck', [ 'lint' ], function() {
    return gulp.src([ 'src/**/*.js', 'test/**/*.js' ])
        .pipe(gulpFlowtype({
            abort: true
        }))
});


gulp.task('lint', function() {
    return gulp.src('src/**').pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('karma', function (done) {

    var server = new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: !Boolean(argv['keep-browser-open']),
        client: {
            captureConsole: Boolean(argv['capture-console'])
        }
    });

    server.on('browser_error', function (browser, err) {
        console.log('Karma Run Failed: ' + err.message);
        throw err;
    });

    server.on('run_complete', function (browsers, results) {
        if (results.failed) {
            return done(new Error('Karma: Tests Failed'));
        }
        done();
    });

    return server.start();
});
