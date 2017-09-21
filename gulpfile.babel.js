var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var concat = require('gulp-concat');
var jasmine = require('gulp-jasmine');
var jshint = require('gulp-jshint');
var fail = require('gulp-fail');
var gulpIf = require('gulp-if');
var shell = require('gulp-shell');
var stylish = require('jshint-stylish');
var del = require('del');
var runSequence = require('run-sequence');
var Server = require('karma').Server;

const $ = gulpLoadPlugins();

gulp.task('chromeManifest', () => {
  return gulp.src('app/manifest.json')
  .pipe(gulp.dest('build'));
});

gulp.task('frontend', () => {
  return gulp.src('app/frontend/**/*')
  .pipe($.if('*.html', $.htmlmin({removeComments: true, collapseWhitespace: true})))
  .pipe(gulp.dest('build/frontend'));
});

gulp.task('backend', () => {
  return gulp.src(['app/backend/app.js']) // Put all modules in this array
    .pipe(concat('app.js'))
    .pipe(gulp.dest('build/backend/'));
});

gulp.task('concatJquery', () => {
  return gulp.src(['app/jquery-3.2.1.min.js']) // Put all modules in this array
    .pipe(concat('jquery-3.2.1.min.js'))
    .pipe(gulp.dest('build/'));
});

gulp.task('lint', () => {
  return gulp.src(['app/frontend/**/*.js', 'app/backend/**/*.js', 'spec/**/*.js'])
    .pipe(jshint({
      "curly": true,
      "esversion": 6,
      "notypeof": true,
      "quotmark": true,
      "jasmine": true
    }))
    .pipe(jshint.reporter(stylish))
    .pipe(gulpIf(function(file) {
               return (file.jshint && !file.jshint.success);
             }, fail("Linting finished with errors!", true)));
});

gulp.task('pre-clean', del.bind(null, ['.tmp', 'app/.tmp', 'build']));

gulp.task('post-clean', del.bind(null, ['app/.tmp']));

gulp.task('unit-test', function(done) {
    Server.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, function(status) {
		  if (status !== 0) {
		    console.log('Karma exited with error code ' + status);
		    done();
		    return process.exit(status);
		  }
		  done();
		});
});

gulp.task('build', (cb) => {
  runSequence(
    'frontend', 'backend', 'chromeManifest', 'concatJquery',
    'unit-test', 'lint', cb
  );
});

gulp.task('default', ['pre-clean'], cb => {
  runSequence('build', 'post-clean', cb);
});
