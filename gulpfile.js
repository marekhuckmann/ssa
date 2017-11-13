var gulp = require('gulp');

var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
//var htmlmin = require('gulp-htmlmin');
var ftp = require('vinyl-ftp');

browserSync = require("browser-sync"),

//js
gulp.task('js', function(){
    gulp.src(['./dev/js/lib/*.js', './dev/js/jquery.dlmenu.js', './dev/js/jquery.swipebox.min.js', './dev/js/script.js', './dev/js/bootstrap.bundle.js' ])
        .pipe(concat('script.js'))
        .pipe(gulp.dest('./js'))
        .pipe(uglify())
        .pipe(rename('script.min.js'))
        .pipe(gulp.dest('./js'));
});

//css
gulp.task('css', function (){
    gulp.src(['./dev/sass/style.scss'])
        .pipe(sass())
		.pipe(rename('stylesheet.min.css'))
        .pipe(prefix(
            "last 1 version", "> 1%", "ie 8", "ie 7"
            ))
        .pipe(minifycss())
        .pipe(gulp.dest('./css/'));
});

//html

gulp.task( 'deploy css', function () {
    var conn = ftp.create( {
        host:    'webiso.pl',
        user:    'projekty',
        password: 'TndIn8Nfqc',
        parallel: 10
    } );
    var globs = [ './css/stylesheet.min.css' ];
    return gulp.src( globs, { base: '.', buffer: false } )
        .pipe( conn.newer( 'domains/rysunek.webi.so/public_html/css' ) )
        .pipe( conn.dest( 'domains/rysunek.webi.so/public_html/' ) );
} );
gulp.task( 'deploy js', function () {
    var conn = ftp.create( {
        host:    'webiso.pl',
        user:    'projekty',
        password: 'TndIn8Nfqc',
        parallel: 10
    } );
    var globs = [ './js/script.js', './js/script.min.js'];
    return gulp.src( globs, { base: '.', buffer: false } )
        .pipe( conn.newer( 'domains/rysunek.webi.so/public_html/js' ) )
        .pipe( conn.dest( 'domains/rysunek.webi.so/public_html/' ) );
} );

gulp.task('default', function(){

    browserSync.init({
        server: "./"
    });
    gulp.watch(["./index.html", "./js/*.js", "./css/*.css"], browserSync.reload);

    gulp.watch("./dev/sass/*.scss", function(event){
        gulp.run('css');
    });
    
    gulp.watch("./dev/js/*.js", function(event){
        gulp.run('js');
    });
    
});


//gulp.task( 'deploy css', function () {
//    var conn = ftp.create( {
//        host:    'webiso.pl',
//        user:    'projekty',
//        password: 'TndIn8Nfqc',
//        parallel: 10
//    } );
//    var globs = [ './css/stylesheet.min.css' ];
//
//    return gulp.src( globs, { base: '.', buffer: false } )
//        .pipe( conn.newer( 'domains/augum.webi.so/public_html/css' ) )
//        .pipe( conn.dest( 'domains/augum.webi.so/public_html/' ) );
//} );
//
//gulp.task( 'deploy js', function () {
//    var conn = ftp.create( {
//        host:    'webiso.pl',
//        user:    'projekty',
//        password: 'TndIn8Nfqc',
//        parallel: 10
//    } );
//    var globs = [ './js/script.js', './js/script.min.js'];
//    return gulp.src( globs, { base: '.', buffer: false } )
//        .pipe( conn.newer( 'domains/augum.webi.so/public_html/js' ) )
//        .pipe( conn.dest( 'domains/augum.webi.so/public_html/' ) );
//} );

/**
 *
 *  Jak odaplisz gulpa to:
 *  a) Edytuj pliki js w folderze dev .js w tasku możesz dopisać dodatkowe pliki (decydując o kolejności) wygeneruje ci w js script i script.min
 *
 *
 */
