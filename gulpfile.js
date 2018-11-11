const gulp = require('gulp');
const del = require('del');

gulp.task('default', defaultTask);

function defaultTask(done) {
    console.log('gulp cleandist #clean unused assets from dist');
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
