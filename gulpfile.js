var opn = require('opn')
  , argv = require('yargs').argv

var gulp = require('gulp')
  , connect = require('gulp-connect')


gulp.task('default', ['serve'])
gulp.task('serve', ['connect'])

gulp.task('connect', function(done) {
  connect.server({
    root: 'public',
    livereload: true
  });

  opn('http://localhost:8080', done);
});

