var gulp = require('gulp');

var Server = require('karma').Server;

/**
* Sample API endpoint for adminapp API :
* http://localhost/adminapp/api/v1/
*/
var projectName = '';

/**
* Local web server directory
*/
var serverDeployDir = '/var/www/html';

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

/**
* basedir for current gulp runtime
*/

var basedir = '.';
/**
* deploy runtime, assets WITHOUT sample data from public
 */
gulp.task('deploy', function() {

  var referenceGulpProject = basedir + '/dist/**';
  var destPath = serverDeployDir + '/' + projectName;

  console.log('Deploying server : ' + referenceGulpProject + ' --> ' + destPath);

 gulp.src([ referenceGulpProject + '/**' , '!'+referenceGulpProject + '/public', '!'+referenceGulpProject + '/public/**']).pipe(gulp.dest(destPath));


});

/**
 * deploy runtime, assets WITH sample data from public
 */
gulp.task('deployall', function() {

  var srcPath = basedir + '/dist/**';
  var destPath = serverDeployDir + '/' + projectName;

  console.log('Deploying server : ' + srcPath + ' --> ' + destPath);

  gulp.src(srcPath).pipe(gulp.dest(destPath));

});


gulp.task('default', function() {

  console.log('gulp deploy #deploy runtime, assets WITHOUT sample data from public');
  console.log('gulp deployall #deploy runtime, assets WITH sample data from public');
  console.log('gulp test #Run test once and exit');




});
