// Définition dependancy for execute tasks
var
  gulp = require('gulp'),
  imagemin = require('gulp-imagemin'),
  newer = require('gulp-newer'),
  size = require('gulp-size'),
  del = require('del'),
  gulpDestClean = require('gulp-dest-clean');

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
  };


// Task definitions
gulp.task('clean', function(){
  del( [dest + '*'] );
});

gulp.task('images', function(){
  gulp.src(imageOptions.in) // Prendre les fichiers dans imageOptions.in
    .pipe(gulpDestClean(imageOptions.out))
    .pipe(newer(imageOptions.out)) // Pour vérifier si il y a du nouveau dans le dossier
    .pipe(size({title: 'Images size before compression: ', showFiles: true}))
    .pipe(imagemin())
    .pipe(size({title: 'Images size after compression: ', showFiles: true}))
    .pipe(gulp.dest(imageOptions.out)); // .pipe pour enchainer les actions, donner le chemin de destination

});

// Tâche par défaut exécutée lorsqu'on tape juste gulp dans le terminal
gulp.task('default', ['images'], function(){
  gulp.watch(imageOptions.watch, ['images']);
});
