var gulp = require('gulp');
var runSequence = require('run-sequence');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var connect = require('connect');
var clean = require('gulp-clean');
var cssnano = require('gulp-cssnano');

// Clean
gulp.task('clean', function () {
    return gulp.src('dist/*', {read: false})
        .pipe(clean());
});

// HTML
gulp.task('html', function() {
  return gulp.src('app/*.html')
  .pipe(gulp.dest('dist'))
});
// JSON
gulp.task('json', function() {
  return gulp.src('app/*.json')
  .pipe(gulp.dest('dist'))
});

// CSS
gulp.task('css', function() {
  return gulp.src('app/css/*.css')
  .pipe(cssnano())
  .pipe(gulp.dest('dist/css'))
});
// JS
gulp.task('js', function() {
  return gulp.src('app/js/**/*')
  .pipe(gulp.dest('dist/js'))
});
// Images
gulp.task('images', function(){
    return gulp.src('app/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});
//Fonts
gulp.task('fonts', function() {
  return gulp.src('app/css/fonts/**/*')
  .pipe(gulp.dest('dist/css/fonts'))
})

// Static Server + watching scss/html files
gulp.task('serve', [], function() {

    browserSync.init({
        server: "./dist",
        port: 9393,
        ghostMode: false
    });

    //gulp.watch("app/*.html").on('change', browserSync.reload);
   
});

gulp.task('watch', function(){
  /*  gulp.watch('app/css/*.css').on('change', browserSync.reload);
    gulp.watch('app/js/*.js').on('change', browserSync.reload);*/
   // gulp.watch('app/*').on('change', browserSync.reload);
     gulp.watch('dist/*').on('change', browserSync.reload);
});

gulp.task('build', function (callback) {
  runSequence('clean', 
    ['json','html', 'css', 'js','images', 'fonts'],
    'serve',
    'watch',
    callback
  )
});
gulp.task('default', function (callback) {
  runSequence('clean', 
    ['json','html', 'css', 'js','images', 'fonts'],
    'serve',
    'watch',
    callback
  )
});
