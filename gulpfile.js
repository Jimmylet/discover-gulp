// Définition dependancy for execute tasks
var
  gulp = require('gulp'),
  imagemin = require('gulp-imagemin'),
  newer = require('gulp-newer'),
  size = require('gulp-size'),
  del = require('del'),
  gulpDestClean = require('gulp-dest-clean'),
  sass = require('gulp-sass'),
  imacss = require('gulp-imacss');

// Definition generals variables for our gupfiles
var
  source = 'source/',
  dest = 'build/';

// Definition variables for taslk (options tasks)
var
  imageOptions = {
    in: source + 'images/*.*',
    out: dest + 'images/',
    watch: source + 'images/*.*'
  },
  imageUriOptions = {
    in: source + 'images/inline/*.*',
    out: source + 'scss/images/',
    filename: '_datauri.scss',
    namespace: 'uri'
  },
  css = {
    in: source + 'scss/main.scss',
    out: dest + 'css/',
    sassOpts: {
      outputStyle: 'nested',
      precision: 3,
      errLogToConsole: true
    }
  };


// Task definitions
gulp.task('clean', function(){
  del( [dest + '*'] );
});

gulp.task('images', function(){
  return gulp.src(imageOptions.in) // Prendre les fichiers dans imageOptions.in
    .pipe(gulpDestClean(imageOptions.out))
    .pipe(newer(imageOptions.out)) // Pour vérifier si il y a du nouveau dans le dossier
    .pipe(size({title: 'Images size before compression: ', showFiles: true}))
    .pipe(imagemin())
    .pipe(size({title: 'Images size after compression: ', showFiles: true}))
    .pipe(gulp.dest(imageOptions.out)); // .pipe pour enchainer les actions, donner le chemin de destination

});

gulp.task('imageuri', function() {
  return gulp.src(imageUriOptions.in)
    .pipe(imagemin())
    .pipe(imacss(imageUriOptions.filename, imageUriOptions.namespace))
    .pipe(gulp.dest(imageUriOptions.out));
});

gulp.task('sass', function(){
  return gulp.src(css.in)
    .pipe(sass(css.sassOpts))
    .pipe(gulp.dest(css.out));
});

// Tâche par défaut exécutée lorsqu'on tape juste gulp dans le terminal
gulp.task('default', ['images'], function(){
  gulp.watch(imageOptions.watch, ['images']);
});
