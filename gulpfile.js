const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const rename = require("gulp-rename");
const postcss = require("gulp-postcss");
const csso = require("postcss-csso");
const autoprefixer = require("autoprefixer");
const del = require("del");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const imagemin = require("gulp-imagemin");
const htmlmin = require("gulp-htmlmin");
const rollup = require("gulp-better-rollup");
const uglify = require("gulp-uglify-es").default;
const sync = require("browser-sync").create();

// Clean
const clean = () => {
  return del("build");
};

exports.clean = clean;

// Copy
const copy = (done) => {
  return gulp.src([
      "source/fonts/*.{woff2,woff}",
      "source/favicon/*.*",
      "source/img/*.{jpg,png,svg}"
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build"))
  done()
}

exports.copy = copy;

// Images
const images = () => {
  return gulp.src("source/img/*.{jpg,png,svg}")
    .pipe(imagemin([
      imagemin.optipng({
        optimizationLevel: 3
      }),
      imagemin.mozjpeg({
        progressive: true
      }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"))
}

exports.images = images;

// Webp
const imagesToWebp = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
    .pipe(webp({
      quality: 80
    }))
    .pipe(gulp.dest("build/img"))
}

exports.imagesToWebp = imagesToWebp;

// Sprite
const sprite = () => {
  return gulp.src("source/img/sprite/*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"))
}

exports.sprite = sprite;

// Styles
const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename("styles.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// Scripts
const scripts = () => {
  return gulp.src("source/js/app.js")
    .pipe(sourcemap.init())
    .pipe(rollup({
      input: 'source/js/app.js'
    }, 'umd'))
    .pipe(rename("scripts.min.js"))
    .pipe(uglify())
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest("build/js"))
    .pipe(sync.stream());
}

exports.scripts = scripts;

// Html
const html = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest("build"))
    .pipe(sync.stream());
}

exports.html = html;

// Server
const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher
const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/js/**/*.js", gulp.series("scripts"));
  gulp.watch("source/*.html", gulp.series("html"));
}

// Build
const build = gulp.series(
  clean,
  gulp.parallel(
    styles,
    scripts,
    html,
    copy,
    sprite,
    images,
    imagesToWebp
  )
);

exports.build = build;

// Default
exports.default = gulp.series(
  clean,
  gulp.parallel(
    styles,
    scripts,
    html,
    copy,
    sprite,
    imagesToWebp
  ),
  gulp.series(
    server,
    watcher
  )
);
