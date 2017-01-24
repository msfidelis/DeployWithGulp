var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var htmlReplace = require('gulp-html-replace');
var uglify = require('gulp-uglify');
var usemin = require('gulp-usemin');
var cssmin = require('gulp-cssmin');
var browserSync = require('browser-sync');

/**
 * Copia os arquivos da pasta src para a pasta de distribuição
 */
gulp.task('copy', ['clean'], function() {
    return gulp.src('src/**/*')
        .pipe(gulp.dest('dist'));
});

/**
 * Limpa o projeto de distribuição
 */
gulp.task('clean', function() {
    return gulp.src('dist')
        .pipe(clean());
});

/**
 * Minifica as imagens
 */
gulp.task('build-img', function() {
  gulp.src('dist/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});

/**
 * Concatena todos os arquivos Javascript em um unico
 */
gulp.task('build-js', function() {
  gulp.src(['dist/js/jquery.js', 'dist/js/home.js', 'dist/js/produto.js'])
    .pipe(concat('all.js'))
    .pipe(uglify()) //Uglify
    .pipe(gulp.dest('dist/js'));
});

/**
 * Concatena todos os arquivos CSS em um unico
 */
gulp.task('build-css', function() {
  gulp.src('dist/css/**/*.css')
    .pipe(concat('all.css'))
    .pipe(gulp.dest('dist/css'));
});

/**
 * Replace das tags BUILD no HTML
 * @type {String}
 */
gulp.task('build-html', function() {
  gulp.src('dist/**/*.html')
    .pipe(htmlReplace({
      js: 'js/all.js',
      //css: 'css/all.css'
    }))
    .pipe(gulp.dest('dist'))
});

/**
 * Faz replace e Minifica todos os arquivos css e js
 * dos HTMLs marcados pela tag de build
 */
gulp.task('usemin', function() {
  gulp.src('dist/**/*.html')
    .pipe(usemin({
      'js' : [uglify],
      'css' : [cssmin]
    }))
    .pipe(gulp.dest('dist'));
});

/**
 * Build do Deploy
 */
gulp.task('default', ['copy'], function() {
  /**
   * Todas as tarefas vão ser carregadas assincronamente
   */
  gulp.start('build-img', 'usemin');
});


/**
 * Dev BrowseSync - Autoreload
 * @type {Object}
 */
gulp.task('server-dev', function() {
  browserSync.init({
    server : {
      baseDir : 'src'
    }
  });
  gulp.watch('src/**/*')
    .on('change', browserSync.reload);
});

/**
 * Prod BrowseSync - Autoreload
 * @type {Object}
 */
gulp.task('server-prod', function() {
  browserSync.init({
    ui: {
      port: 4001
    },
    server : {
      baseDir : 'dist'
    },
    port: 4000
  });

  gulp.watch('src/**/*')
    .on('change', browserSync.reload);
});
