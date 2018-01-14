const gulp = require('gulp');
const pug = require('gulp-pug');

const sass = require('gulp-sass');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

const del = require('del');

const browserSync = require('browser-sync').create();

const gulpWebpack = require('gulp-webpack');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const plumber = require('gulp-plumber');

var svgSprite = require("gulp-svg-sprites");
const cheerio       = require('gulp-cheerio');

const paths = {
    root: './build',
    templates: {
        pages: 'src/templates/pages/*.pug',
        src: 'src/templates/**/*.pug'
    },
    styles: {
        src: 'src/styles/**/*.scss',
        dest: 'build/assets/styles/'
    },
    images: {
        src: 'src/images/*.*',
        dest: 'build/assets/images/',
        svg: 'src/images/svg/'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'build/assets/scripts/'
    },
    fonts: {
        src: 'src/fonts/**/*.*',
        dest: 'build/assets/fonts/'
    }
}

// Создание спрайта из иконок
function spriteBuild() {
    return gulp.src(paths.images.svg+'*.svg')
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');// удаляем инлайновое назначение цвета чтобы в css задать
            }
        }))
        .pipe(svgSprite({
            mode: "symbols",
            preview: false
        }))//к иконке теперь можно обращаться img/svg/symbols.svg#icon
        .pipe(gulp.dest(paths.images.dest))
};

// pug
function templates() {
    return gulp.src(paths.templates.pages)
        .pipe(plumber())
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest(paths.root))
        //.pipe(browserSync.stream())
        .on('end', browserSync.reload);
}

// scss
function styles() {
    return gulp.src('./src/styles/app.scss')
    .pipe(plumber())    
    .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(sourcemaps.write())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.reload({
            stream: true
        }));
}

// очистка
function clean() {
    return del(paths.root);
}

// webpack
function scripts() {
    return gulp.src('src/scripts/app.js')
        .pipe(gulpWebpack(webpackConfig, webpack))
        .pipe(gulp.dest(paths.scripts.dest));
}

// галповский вотчер
function watch() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.templates.src, templates);
    gulp.watch(paths.images.src, images);
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.images.svg+'*.svg', spriteBuild);
}



// просто переносим картинки
function images() {
    return gulp.src(paths.images.src)
        .pipe(gulp.dest(paths.images.dest));
}

// просто переносим шрифты
function fonts() {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest));
}

exports.templates = templates;
exports.styles = styles;
exports.clean = clean;
exports.images = images;

// локальный сервер + livereload (встроенный)
function server() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
}
// function server() {
//     browserSync.init({
//         server: paths.root
//     });
//     browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
// }


gulp.task('default', gulp.series(
    clean,
    gulp.parallel(styles, templates, images, scripts, fonts, spriteBuild),
    gulp.parallel(watch, server)
));