/**
 * Tools and libraries
 */
var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');
var git = require('gulp-git');



/**
 * Project path
 */
var basedir = '.';
var sharedDestinationDir = basedir + '/src/client/src/app/shared';

/**
 * Shared library
 */
var shared = basedir + '/../mobile-cms-shared-ts';
var sharedLibraryUrl =  'https://github.com/OlivierB29/mobile-cms-shared-ts';

/*
 * Import project.
 * Problem in a runSequence : seems asynchronous.
 */
gulp.task('clone', function() {

    //Clone outside the current project
    git.clone(sharedLibraryUrl, {
        args: shared
    }, function(err) {
        // handle err
          console.log("Error during clone:"+ err);
    });
});



gulp.task('shared', function() {

      console.log('library  '+ shared);

        var dest = sharedDestinationDir;
          gulp.src([shared + '/**']).pipe(gulp.dest(dest));
          console.log('Shared client library copied to : ' + dest);

});


gulp.task('default', function() {

    console.log('Client : please run separate tasks \n gulp clone \n gulp shared');



});