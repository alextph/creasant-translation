var gulp = require('gulp');
var express = require('express');
var webpack = require('webpack-stream');
var livereload = require('gulp-livereload');
var runSequence = require('run-sequence');
var path = require('path');
var log4js = require('log4js');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var zip = require('gulp-zip');
var injectLivereload = require('connect-livereload');
var _ = require('lodash');
var pkg = require('./package.json')
var fs = require('fs-extra');
var ApiManager = require('./ApiManager');

// standard log method using log4js
var logger = log4js.getLogger();
logger.level = 'debug';

var logError = function (error) {
  logger.error(error)
  this.emit('end');
}

//
var configFile = path.join(__dirname, "config.json")
var connConfig = {
  host: "",
  user: "",
  password: "",
  database: ''
}

if (fs.existsSync(configFile)){
  connConfig = _.extend(connConfig, fs.readJsonSync(configFile));
} else {
  logger.warn(`config file ${configFile} not exists, a default config file is generated`);
  fs.writeJsonSync(configFile, connConfig, {spaces:2});
}

// use webpack to pack js code
gulp.task('webpack', ()=> {
  let config = {
    output:{filename:'bundle.js'},
  }
  return gulp.src('src/_js/app.js')
    .pipe(webpack(config))
    .on('error', logError)
    .pipe(gulp.dest('src/scripts'))
    .pipe(livereload());
})

// reload css
gulp.task('reloadCss', ()=> {
  return gulp.src('src/styles/main.css')
    .pipe(livereload());
})

// zip dist for deployment
gulp.task('zip', ()=> {
  return gulp.src('dist/**/*')
    .pipe(zip(`${pkg.name}-${pkg.version}.zip`))
    .pipe(gulp.dest('.'))
})

// clean dist, styles and scripts folder
gulp.task('clean', ()=> {
  return gulp.src(['src/scripts', 'src/styles', './dist'], {read: false}).pipe(clean());
})

// copy assets to dist
gulp.task('copy', ()=> {
  return gulp.src([
    'src/assets/**/*',
    'src/**/*.html',
    'src/**/*.css',
    'src/scripts/**/*',
    'src/styles/**/*'
  ], {base:'./src'})
  .pipe(gulp.dest('./dist'))
})

// to release a build
gulp.task('release', ()=>{
  return runSequence('clean', ['webpack', 'sass'], 'copy', 'zip');
})

// start development server
gulp.task('server', ()=> {
  let app = express();
  app.use(injectLivereload({port: pkg.config.port + 30000}))
  app.use(new ApiManager(connConfig).app);
  app.use(express.static(path.join(__dirname, "src")));
  let server = app.listen(pkg.config.port, ()=> {
    logger.info(`${pkg.name} started at http://localhost:${server.address().port}`)
  });
});

// start production server
gulp.task('prod-server', ()=> {
  let app = express();
  app.use(express.static(path.join(__dirname, "dist")));
  let server = app.listen(pkg.config.port, ()=> {
    logger.info(`${pkg.name} started at http://localhost:${server.address().port}`)
  });
});

// watch html, css and js changes
gulp.task('watch', ()=> {
    livereload.listen({port: pkg.config.port + 30000}); // Starts livereload
    gulp.watch(['src/**/*.js', 'src/**/*.html', '!src/scripts/**/*'], ['webpack'])
    gulp.watch(['src/**/*.css', 'src/**/*.scss', '!src/styles/**/*'], ['sass'])
    gulp.watch(['src/styles/main.css'], ['reloadCss'])
});

// compile sass to css
gulp.task('sass', ()=> {
  return gulp.src('./src/_scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/styles'));
});

// start development
gulp.task('start', (done)=> {
  return runSequence('clean', ['webpack', 'sass'], 'server', 'watch', done);
});

// hook default to start
gulp.task('default', ['start']);