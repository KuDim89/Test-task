'use strict';

const gulp         = require('gulp'),
      sass         = require('gulp-sass'),
      browserSync  = require('browser-sync'),
      concat       = require('gulp-concat'),
      uglify       = require('gulp-uglifyjs'),
      cssnano      = require('gulp-cssnano'),
      rename       = require('gulp-rename'),
      imagemin     = require('gulp-imagemin'),
      pngquant     = require('imagemin-pngquant'),
      cache        = require('gulp-cache'),
      autoprefixer = require('gulp-autoprefixer'),
      gcmq         = require('gulp-group-css-media-queries'),
      del          = require('del');



gulp.task('sass', function () {
    return gulp.src('src/sass/**/*.scss')
        .pipe(sass({outputStyle: 'expanded'})
            .on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie 7'],
            cascade: true
        }))
        .pipe(gcmq())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.reload({stream: true}))
});


gulp.task('css-libs', function () {
    return gulp.src('src/css/plugins/**/*.css')
        .pipe(concat('libs.css'))
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('src/css'))
});


gulp.task('js-libs', function () {
    return gulp.src('src/js/libs/**/*.js')
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('src/js'));
});


gulp.task('image-min', function () {
    return gulp.src([
        //'!src/img/**/*.svg',
        'src/img/**/*'
    ])
        .pipe(cache(imagemin({
            interlaced:  true,
            progressive: true,
            svgoPlugins:  [{removeViewBox: false}],
            use:         [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'));
});


gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: 'dist/'
        },
        notify: false
    });
});


gulp.task('clean', function () {
    return del.sync('dist')
});


gulp.task('clear', function () {
    cache.clearAll()
});


gulp.task('watch', ['browser-sync', 'css-libs', 'sass', 'js-libs'], function () {
    gulp.watch('src/сss/plugins/**/*.', ['css-libs']);
    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch('src/js/**/*.js', browserSync.reload);
    gulp.watch('src/*.html', browserSync.reload);
});


gulp.task('build', ['clean', 'image-min', 'sass', 'css-libs', 'js-libs'],function () {



    var buildCss = gulp.src([
        'src/css/libs.min.css',
        'src/css/style.css'
    ])
        .pipe(concat('style.min.css'))
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css'));




    var buildFonts = gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));



    var buildScript = gulp.src([
        'src/js/libs.min.js',
        'src/js/main.js'
    ])
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));


    var buildHtml = gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
});


gulp.task('default', ['watch']);
