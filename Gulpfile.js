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
    console.log('File ' + event.path + ' was ' + event.type + '.');
  });
});

gulp.task('minify', ['babel'], function() {
  return gulp.src('out/debug/**/*.js')
    .pipe(uglify({
      compress: {
        drop_console: true
      }
    }))
    .pipe(gulp.dest('out/dist'));
});

// GIT tasks

var version;
gulp.task('confirm-version', function() {
  var argv = require('yargs').argv;
  var prompt = require('gulp-prompt');

  if (!argv.major && !argv.minor && !argv.patch) {
    throw new Error('Usage: gulp dist --major|minor|patch');
  } else {
    var current = require('./package.json').version;
    var components = current.split('.').map(function(item) {
      return parseInt(item);
    });

    components[0] = argv.major ?
    components[0] + 1 :
      components[0];

    components[1] = argv.minor ?
    components[1] + 1 :
      argv.major ?
        0 :
        components[1];

    components[2] = argv.patch ?
    components[2] + 1 :
      argv.major || argv.minor ?
        0 :
        components[2];

    version = components.join('.');
    console.log(version);

    return gulp.src('out/**/*.js')
      .pipe(prompt.confirm('Publish version ' + version + '?'));
  }
});

gulp.task('write-version', function(cb) {
  var fs = require('fs');

  var pkg = require(__dirname + '/package.json');
  pkg.version = version;

  fs.writeFile(
    __dirname + '/package.json',
    JSON.stringify(pkg, null, '  '),
    cb
  );
});

gulp.task('git-add', function() {
  var git = require('gulp-git');

  return gulp.src(['package.json', 'out/**/*.js'])
    .pipe(git.add({args: '-f'}));
});

gulp.task('git-add-packagejson', function() {
  var git = require('gulp-git');

  return gulp.src(['package.json'])
    .pipe(git.add());
});

gulp.task('git-checkout-head', function(cb) {
  require('gulp-git').checkout('head', cb);
});

gulp.task('git-checkout-master', function(cb) {
  require('gulp-git').checkout('master', cb);
});

gulp.task('git-commit', function() {
  var git = require('gulp-git');

  return gulp.src(['_none'])
    .pipe(git.commit('Version ' + version + ' for distribution'));
});

gulp.task('git-commit-packagejson', function() {
  var git = require('gulp-git');

  return gulp.src(['_none'])
    .pipe(git.commit('Updated for release v' + version));
});

gulp.task('git-tag', function(cb) {
  require('gulp-git').tag(
    'v' + version,
    'Add tag v' + version,
    cb
  );
});

gulp.task('git-push', function(cb) {
  require('gulp-git').push('origin', 'master', {args: ' --tags'}, cb);
});

gulp.task('git-push-packagejson', function(cb) {
  require('gulp-git').push('origin', 'master', {}, cb);
});

gulp.task('dist', ['minify'], function() {
  return require('run-sequence')(
    'confirm-version',
    'write-version',
    'git-add',
    'git-checkout-head',
    'git-commit',
    'git-tag',
    'git-checkout-master',
    'git-push', // Now, the new version is online
    'write-version',
    'git-add-packagejson',
    'git-commit-packagejson',
    'git-push-packagejson'
  );
});
