var gulp = require('gulp');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var merge = require('deeply');
var uglify = require('gulp-uglify');

// Babel helpers

var babelOptions = {
  presets: ['es2015']
};

var babelTasks = [];
function babelTask(name, options, path) {
  path = path === undefined ? name : path;
  var taskName = 'babel-' + name;
  babelTasks.push(taskName);

  gulp.task(taskName, function() {
    return gulp.src('src/**/*.js')
      .pipe(sourcemaps.init())
      .pipe(babel(merge(babelOptions, options)))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./out/debug/' + path));
  });
}

// Register babel tasks

babelTask('amd', {
  plugins: [
    'transform-es2015-modules-amd'
  ]
});

babelTask('umd', {
  plugins: [
    'transform-es2015-modules-umd'
  ]
}, '');

gulp.task('babel', babelTasks);

gulp.task('default', ['babel'], function() {
  var watcher = gulp.watch('src/**/*.js', ['babel']);

  watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

gulp.task('dist', ['babel'], function() {
  return gulp.src('out/debug/**/*.js')
    .pipe(uglify({
      compress: {
        global_defs: {
          DEBUG: false
        }
      }
    }))
    .pipe(gulp.dest('out/dist'));
});
