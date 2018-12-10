/**
 * version 1.1.0
 */
var gulp = require('gulp'),
    gulpIf = require('gulp-if'),
    rename = require('gulp-rename'),
    merge = require('merge-stream'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    del = require('del'),
    config = require('./utils/config'),
    resourceRoutes = require('./utils/resourceRoutes'),
    browserSync = require('browser-sync'),
    browserInstance;

sass.compiler = require('node-sass');

gulp.task('copy:dist', function () {
    return merge.apply(null, resourceRoutes.copy.map(function (item) {
        return gulp.src(item.from)
            .pipe(gulpIf(item.isFile, rename(item.name)))
            .pipe(gulp.dest(item.to));
    }));
});
gulp.task('compile-pug:dist', function () {
    return compilePug(config.dist.html, {});
});

gulp.task('compile-sass:dist', function () {
    return compileSass(config.src.sass, config.dist.style);
});

gulp.task('compile-sass:temp', function () {
    return compileSass(config.src.sass, config.temp.style);
});

gulp.task('clien:dist', function () {
    return del(config.distDir);
});

gulp.task('compile-pug:temp', function () {
    return compilePug(config.temp.html, {
        pretty: true
    });
});

gulp.task('clien:temp', function () {
    return del(config.tempDir);
});

gulp.task('browser:run:temp', function (done) {
    browserInstance = browserSync.create();

    browserInstance.init({
        server: {
            baseDir: config.tempDir
        },
        serveStatic: resourceRoutes.serveStatic
    });

    done();
});

gulp.task('browser:reload', function (done) {
    browserInstance.reload();

    done();
});

gulp.task('build', gulp.series('clien:dist', 'compile-pug:dist', 'compile-sass:dist', 'copy:dist'));

gulp.task('dev:comppile', gulp.parallel('compile-pug:temp', 'compile-sass:temp'));

gulp.task('dev', gulp.series('clien:temp', 'dev:comppile', 'browser:run:temp', function watch() {
    gulp.watch(config.watch.sass, gulp.series('compile-sass:temp', 'browser:reload'));
    return gulp.watch(config.watch.pug, gulp.series('compile-pug:temp', 'browser:reload'));
}));

function compilePug(dest, option) {
    option = option || {};

    option.data = require(config.data)

    return gulp.src(config.src.pug)
        .pipe(pug(option))
        .pipe(gulp.dest(dest));
}

function compileSass(from, to) {
    return gulp.src(from)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(to));
}