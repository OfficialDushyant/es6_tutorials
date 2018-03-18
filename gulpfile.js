const gulp = require('gulp');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const uglifycss = require('gulp-uglifycss');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');

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
  gulp.watch("app/**/*.html").on('change', browserSync.reload);
  gulp.watch("app/**/*.js").on('change', browserSync.reload);
  gulp.watch("app/**/*.scss").on('change', browserSync.reload);
});

//Babel transpiler
gulp.task('composeJS', () =>
    gulp.src('app/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            plugins: ['@babel/transform-runtime'],
            presets: ['@babel/env']
        }))
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist'))
);

//Gulp watch
gulp.task('watch',['browserSync'] ,() => {
  gulp.watch('app/**/*.js', ['composeJS'])
  gulp.watch('app/styles/**/*.scss', ['sass']);
  gulp.watch('app/styles/css/*.css', ['mincss']);
});
