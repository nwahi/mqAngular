var gulp = require('gulp');
var fs = require('fs');
var del = require('del');
var $ = require('gulp-load-plugins')({ lazy: true });
var config = require('./gulp.config')();
var merge = require('merge-stream');
var insert = require('gulp-insert');
var inject = require('gulp-inject-string');
var replace = require('gulp-replace');

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

gulp.task('clean_assets', function (done) {
    log('Cleaning files from assets folder...');
    var files = [config.projectRoot + 'assets/*.js', config.projectRoot + 'assets/*.js.map', config.projectRoot + 'assets/*.css', config.projectRoot + 'assets/*.css.map', config.projectRoot + 'assets/*.html'];
    return clean(files);
});

gulp.task('adding_build_files', ['clean_assets'], function () {
    log('Adding build files....');
    return gulp.src(config.projectRoot + 'dist/**')
        .pipe(gulp.dest(config.projectRoot + 'assets'));
});

gulp.task('inject', ['adding_build_files'], function () {

    // write new files to index.html
    log('injecting scripts into index.html');
    gulp.src(config.projectRoot + 'assets/index.html')
        .pipe(replace('<script type="text/javascript" src="inline.bundle.js"></script>',''))
        .pipe(replace('<script type="text/javascript" src="polyfills.bundle.js"></script>',''))
        .pipe(replace('<script type="text/javascript" src="styles.bundle.js"></script>',''))
        .pipe(replace('<script type="text/javascript" src="vendor.bundle.js"></script>',''))
        .pipe(replace('<script type="text/javascript" src="main.bundle.js"></script>',''))
        .pipe(inject.after('</app-root>', '<script>\n'))
        .pipe(inject.before('</body>', '</script>\n'))
        .pipe($.inject(gulp.src([config.projectRoot + 'assets/inline.*.js']), {
            starttag: '<!-- inject:inline:js -->',
            transform: function(filepath, file) {
            return file.contents.toString();
            }
        }))
        .pipe($.inject(gulp.src([config.projectRoot + 'assets/polyfills.*.js']), {
            starttag: '<!-- inject:polyfills:js -->',
            transform: function(filepath, file) {
            return file.contents.toString();
            }
        }))
        .pipe($.inject(gulp.src([config.projectRoot + 'assets/styles.*.js']), {
            starttag: '<!-- inject:styles:js -->',
            transform: function(filepath, file) {
            return file.contents.toString();
            }
        }))
        .pipe($.inject(gulp.src([config.projectRoot + 'assets/vendor.*.js']), {
            starttag: '<!-- inject:vendor:js -->',
            transform: function(filepath, file) {
            return file.contents.toString();
            }
        }))
        .pipe($.inject(gulp.src([config.projectRoot + 'assets/main.*.js']), {
            starttag: '<!-- inject:main:js -->',
            transform: function(filepath, file) {
            return file.contents.toString();
            }
        }))
   
        .pipe(gulp.dest(config.projectRoot + 'assets/'));
});

gulp.task('delete_extrafiles', ['inject'], function (done) {
    log('Delete unwanted files from assets directory');
    var files = [config.projectRoot + 'assets/*.js', config.projectRoot + 'assets/*.map', config.projectRoot + 'assets/*.css', config.projectRoot + 'assets/*.css.map', config.projectRoot + 'assets/*.ico'];
    return clean(files);
});

gulp.task('build', ['delete_extrafiles'], function () {
    log('Build Completed.');
});

function clean(path) {
    log('Cleaning: ' + path);
    return del(path, { force: true });
}

function log(msg) {
    if (typeof (msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.yellow(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.green(msg));
    }
}



