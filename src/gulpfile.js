var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var cssnano = require('gulp-cssnano');

//SASS compiler task
gulp.task('sass', function () {
    return gulp.src('sass/style.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(rename("style.min.css"))
      .pipe(cssnano())
      .pipe(gulp.dest('app/css'));
});

//SASS watch
gulp.task('sass:watch', function () {
    gulp.watch('sass/*.scss', ['sass']);
});