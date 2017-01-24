"use strict";

const gulp      = require('gulp');
const ts        = require('gulp-typescript');
const uglify    = require('gulp-uglify');
const sass      = require('gulp-sass');
const srcmaps   = require('gulp-sourcemaps');

const tsProject = ts.createProject('tsconfig.json');

gulp.task('tsc', () => {
  gulp.src(
    [ './static/js/**/*.ts', './static/js/**/*.tsx' ],
    { base: './' }
  )
  .pipe( srcmaps.init() )
  .pipe( tsProject() )
  .pipe( uglify() )
  .pipe( srcmaps.write() )
  .pipe( gulp.dest('./static/js') );
});

gulp.task('sass', () => {
  return gulp.src('./static/css/**/*.scss')
  .pipe(srcmaps.init())
  .pipe(sass({
    includePaths: ['./node_modules/bulma']
  }).on('error', sass.logError))
  .pipe(srcmaps.write())
  .pipe(gulp.dest('./static/css'))
});

gulp.task('watch', () => {
  gulp.watch('./static/js/**/*.ts', ['tsc']);
  gulp.watch('./static/js/**/*.tsx', ['tsc']);
  gulp.watch('./static/css/**/*.scss', ['sass']);
});
