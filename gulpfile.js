
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var webpack = require('webpack');
var gulpWebpack = require('webpack-stream');
var Server = require('karma').Server;
var argv = require('yargs').argv;
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

gulp.task('test', ['lint', 'karma']);
gulp.task('build', ['lint', 'karma', 'webpack', 'webpack-min']);

var MODULE_NAME = 'postRobot';

function buildWebpackConfig({  filename, modulename, minify = false, globals = {} }) {

    return {
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015'],
                        plugins: [
                            'transform-object-rest-spread',
                            'syntax-object-rest-spread',
                            'transform-es3-property-literals',
                            'transform-es3-member-expression-literals',
                            ['transform-es2015-for-of', {loose: true}]
                        ]
                    }
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
            new webpack.DefinePlugin(Object.assign({
                __TEST__: false,
                __IE_POPUP_SUPPORT__: false
            }, globals)),
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


gulp.task('lint', function() {
    return gulp.src('src/**').pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('karma', ['lint'], function (done) {

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

    server.start();
});
