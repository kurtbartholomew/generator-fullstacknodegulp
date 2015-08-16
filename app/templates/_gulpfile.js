(function(){
  'use strict';
}());

var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  maps = require('gulp-sourcemaps'),
  del = require('del'),
  iff = require('gulp-if'),
  useref = require('gulp-useref'),
  csso = require('gulp-csso'),
  jshint = require('gulp-jshint'),
  stylish = require('jshint-stylish'),
  wiredep = require('wiredep'),
  browserSync = require('browser-sync').create();

var options = {
  src: 'client/src',
  dist: 'client/dist'
};

gulp.task('wiredep', function(){
  gulp.src(options.src+'/*.html')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest(options.src));
});

gulp.task('clean', function(){
  del([options.dist,
       options.dist+'/assets/css/application.css*',
       options.dist+'/assets/js/app*.js*'
  ]);
});

gulp.task('lint', function(){
  return gulp.src([
    options.src+'/assets/*.js',
    options.src+'/app/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('compileSass', function(){
  return gulp.src(options.src + '/scss/application.scss')
  .pipe(maps.init())
  .pipe(sass())
  .pipe(maps.write('./'))
  .pipe(gulp.dest(options.src + '/css'))
  .pipe(browserSync.reload({stream:true}));
});

gulp.task('html', function(){
  var assets = useref.assets();
  gulp.src(options.src + '/index.html')
      .pipe(assets)
      .pipe(iff('*.css',csso()))
      .pipe(iff('*.js',uglify()))
      .pipe(assets.restore())
      .pipe(useref())
      .pipe(gulp.dest(options.dist));
});

gulp.task('serve',function(){
  browserSync.init({
    notify:false,
    baseDir: options.src
  });

  gulp.watch([
    options.src+'/*.html',
    options.src+'/app/**/*.tmpl',
    options.src+'/assets/css/**/*.*css',
    options.src+'/assets/fonts/**/*.*',
    options.src+'/assets/images/**/*.*']).on('change',browserSync.reload);


  gulp.watch([
    options.src+'/assets/js/**/*.*js',
    options.src+'/assets/app/**/*.*js'], ['lint']);
  gulp.watch('bower.json', ['wiredep', 'fonts']);
  //gulp.watch(options.src + '/scss/**/*.scss',['compileSass']);
  //
});

gulp.task('build', ['lint','html'], function(){
  return gulp.src([options.src+'/images/**',options.src + '/fonts/**'],{ base:options.src})
         .pipe(gulp.dest(options.dist));
});

gulp.task('default', ['clean'], function(){
  gulp.start('build');
});