let gulp = require('gulp');
let sass = require('gulp-sass');
let uglifycss = require('gulp-uglifycss');
let browserSync = require('browser-sync').create();

//Compile scss to css
gulp.task('sass', () => {
  return gulp.src('app/styles/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/styles/css'))
    .pipe(browserSync.reload({
      stream:true
    }))
});

//Get style.min.css
gulp.task('mincss', () => {
  return gulp.src('app/styles/css/style.css')
  .pipe(uglifycss({
    "maxLineLen": 80,
    "ugliComments": true,
  }))
  .pipe(gulp.dest('app/styles/css/min'));
});

//static server + watch scss files
gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  });
  gulp.watch("app/*.html").on('change', browserSync.reload);
});

//Gulp watch
gulp.task('watch',['browserSync','sass'] ,() => {
  gulp.watch('app/styles/**/*.scss', ['sass']);
  gulp.watch('app/styles/css/*.css', ['mincss']);
});
