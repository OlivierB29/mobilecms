const gulp = require('gulp');
const zip = require('gulp-zip');
const del = require('del');

let projectName = 'mobilecms';
let projectVersion = '0.1.6';

gulp.task('default', defaultTask);

function defaultTask(done) {

    console.log('gulp cleandist #clean unused assets from dist');
    console.log('gulp release #create release file');
  done();
}


gulp.task('release', releaseTask);

function releaseTask(done) {
  var archiveFile = 'release/'+projectName + '-' + projectVersion + '.zip';
  console.log('Creating : ' + archiveFile);

  gulp.src('dist/*')
        .pipe(zip(archiveFile))
        .pipe(gulp.dest('dist'));
  done();
}


gulp.task('cleandist', cleandistTask);

function cleandistTask(done) {
    let assets = [
   'dist/'+projectName+'/media',
   'dist/'+projectName+'/public',
   'dist/'+projectName+'/assets'];
  del(assets).then(paths => {
      console.log('Deleted files and folders:\n', paths.join('\n'));
  });
  done();
}
