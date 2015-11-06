var plumber = require('gulp-plumber');
var gulp = require('gulp');
var concat = require('gulp-concat');
var coffee = require('gulp-coffee');
var watch = require('gulp-watch');
var ngAnnotate = require('gulp-ng-annotate');

var files = [
    'src/analytics.coffee',
    'src/analytics.provider.coffee',
    'src/analytics-track/analytics-track.coffee',
    'src/analytics-track/analytics-track.directive.coffee'
]

gulp.task('default', function () {
    gulp.src(files)
        .pipe( coffee( { bare: true } ) )
        .pipe( ngAnnotate() )
        .pipe( concat('angular-analytics-wrapper.js') )
        .pipe( gulp.dest('dist') );
    return null;
});

gulp.task('watch', ['default'], function () {
    gulp.watch(files, ['default']);
    gulp.watch(['./bower.json', './package.json'], ['default']);
});