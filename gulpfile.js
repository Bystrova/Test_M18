const gulp = require('gulp');
const less = require('gulp-less');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const sourceMaps = require('gulp-sourcemaps');
const del = require('del');

// HTML
const html = () => {
	return gulp.src('source/*.html')
		.pipe(gulp.dest('build'))
}

exports.html = html;

//Styles
const styles = () => {
	return gulp.src('source/less/style.less')
		.pipe(plumber())
		.pipe(sourceMaps.init())
		.pipe(less())
		.pipe(autoprefixer())
		.pipe(sourceMaps.write('.'))
		.pipe(gulp.dest('build/css'))
		.pipe(browserSync.stream());
}

exports.styles = styles;

//Clean
const clean = () => {
	return del("build");
}

exports.clean = clean;

//Copy
const copyImages = () => {
	return gulp.src("source/img/**/*.{png,jpg,svg}")
		.pipe(gulp.dest("build/img"))
}

exports.copyImages = copyImages;

const copyScripts = () => {
	return gulp.src("source/scripts/*.js")
		.pipe(gulp.dest("build/scripts"))
}

exports.copyScripts = copyScripts;

const copyFonts = () => {
	return gulp.src("source/fonts/*.{woff2,woff}")
		.pipe(gulp.dest("build/fonts"))
}

exports.copyFonts = copyFonts;

//Server
const server = (done) => {
	browserSync.init({
		server: {
			baseDir: "build"
		}
	});
	done();
}

exports.server = server;

//Reload
const reload = (done) => {
	browserSync.reload();
	done();
}

//Watcher
const watcher = () => {
	gulp.watch("source/less/**/*.less", gulp.series("styles"));
	gulp.watch("source/img/**/*.{jpg,png,svg}", gulp.series(copyImages, reload));
	gulp.watch("source/scripts/script.js", gulp.series(copyScripts, reload));
	gulp.watch("source/*.html", gulp.series(html, reload));
}

exports.watcher = watcher;

//Build
const build = gulp.series(
	clean,
	copyFonts,
	copyImages,
	copyScripts,
	gulp.parallel(
		html,
		styles,
	),
);

exports.build = build;

//Start
exports.default = gulp.series(
	clean,
	copyFonts,
	copyImages,
	copyScripts,
	gulp.parallel(
		html,
		styles,
	),
	gulp.series(
		server, watcher
	));