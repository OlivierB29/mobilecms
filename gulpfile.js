const gulp = require('gulp');
const zip = require('gulp-zip');
const del = require('del');

/**
*
*/
var projectName = 'mobilecms';
var projectVersion = '0.1.5';

gulp.task('cleandist', function() {
  del(['dist/media', 'dist/public', 'dist/assets']).then(paths => {
      console.log('Deleted files and folders:\n', paths.join('\n'));
  });


});

gulp.task('release', function() {


  var archiveFile = 'release/'+projectName + '-' + projectVersion + '.zip';
  console.log('Creating : ' + archiveFile);

  gulp.src('dist/*')
        .pipe(zip(archiveFile))
        .pipe(gulp.dest('dist'))


});

gulp.task('default', function() {

  console.log('gulp cleandist #clean unused assets from dist');
  console.log('gulp release #create release file');

});
