const livereload = require("gulp-livereload");
const gulp = require("gulp");
// gulp plugin to minify HTML.
const htmlmin = require("gulp-htmlmin");
const { parallel } = require('gulp');
// gulp plugin to minify CSS, using clean-css
const cleanCSS = require('gulp-clean-css');
//  to cancat files
var concat = require('gulp-concat');//
// Enabling you to compile your Pug templates into HTML
const pug = require('gulp-pug');




function pugtoHTML() {
  return gulp
    .src(["src/*.html"])
    // .pipe( pug({ }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"))
    .pipe(livereload());
}



function movecss() {
  return gulp
    .src("src/css/*.css")
    .pipe(cleanCSS({compatibility: 'ie8'}))
    // .pipe(concat('header.css'))
    .pipe(gulp.dest("build/css"))
    .pipe(livereload());
}


const imagemin = require('gulp-imagemin');
 
function aaaa() {
  return gulp
  .src('src/imges/*')
   .pipe(imagemin([
    imagemin.gifsicle({interlaced: true}),
    imagemin.mozjpeg({quality: 75, progressive: true}),
    imagemin.optipng({optimizationLevel: 5}),
    imagemin.svgo({
        plugins: [
            {removeViewBox: true},
            {cleanupIDs: false}
        ]
    })
]))
   .pipe(gulp.dest("build/imges"))
    .pipe(livereload());
}

exports.default = function () {
  require("./server.js");
  livereload.listen();

  gulp.watch( "src/*"  ,  parallel(pugtoHTML,movecss,aaaa) );
};

