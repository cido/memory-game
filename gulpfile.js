/*
    gulp is a handy task runner for JavaScript projects. It operates on
    "streams" of files, which are then manipulated individually with
    various steps, called gulp tasks.
*/

// Required node modules in this file
var browserSync = require("browser-sync"),
    browserify = require("browserify"),
    buffer = require("vinyl-buffer"),
    gulp = require("gulp"),
    notify = require("gulp-notify"),
    reactify = require("reactify"),
    source = require("vinyl-source-stream"),
    sass = require("gulp-sass"),
    sourcemaps = require("gulp-sourcemaps");

// Constants used in this file
var SRC = "./src/",
    DEST = "./build/",
    JS_FILES = SRC + "scripts/**/*.{js,jsx}",
    STATIC_FILES = SRC + "{.,images}/*.{html,png,jpeg,jpg}",
    STYLESHEET_FILES = SRC + "styles/*.scss";

/*
   browser-sync starts a file server for us, as well as reloads all changed
   files to the browser automatically
*/
gulp.task("startServer", function() {
    browserSync({ server: { baseDir: DEST } });
});

function reloadBrowser() {
    return browserSync.reload({ stream: true });
}

/*
   In static error cases (which are not so easily detectable in the browser
   development tools), we'll send an operating system notification. This
   way we don't have to watch the terminal window all time.
*/
function onError() {
    var args = Array.prototype.slice.call(arguments);
    notify.onError({
        title: "Compile Error",
        message: "<%= error %>"
    }).apply(this, args);
    this.emit("end"); // Keep gulp from hanging on this task
}

/*
   browserify concatenates all JavaScript files into one "built" version,
   called main.js
*/
gulp.task("browserify", function() {
    return browserify({ entries: [SRC + "scripts/main.jsx"], extensions: [".jsx"], debug: true })
        .transform(reactify)
        .bundle()
        .on("error", onError)
        .pipe(source("main.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(DEST + "scripts/"))
        .pipe(reloadBrowser());
});

/*
   gulp-sass transforms SASS stylesheet files into vanilla CSS files
*/
gulp.task("sass", function() {
    return gulp.src(STYLESHEET_FILES)
        .pipe(sourcemaps.init())
        .pipe(sass({ sourceComments: "map", imagePath: "/images" }))
        .on("error", onError)
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(DEST + "styles/"))
        .pipe(reloadBrowser());
});

/*
   This "static" gulp task copies our non-SASS and non-JS files into the
   built directory as well. In practise this means our index.html file,
   as well as all possible picture files.
*/
gulp.task("static", function() {
    return gulp.src(STATIC_FILES)
        .pipe(gulp.dest(DEST))
        .pipe(reloadBrowser());
});

// Helper for running all "compile" steps at once
gulp.task("compile", ["sass", "static", "browserify"]);

// Watch all files continuously for changes
gulp.task("watch", ["startServer"], function(callback) {
    gulp.watch(STATIC_FILES,     ["static"]);
    gulp.watch(STYLESHEET_FILES, ["sass"]);
    gulp.watch(JS_FILES,         ["browserify"]);
});

// As default, compile all assets once and then watch for further changes
gulp.task("default", ["compile", "watch"]);
