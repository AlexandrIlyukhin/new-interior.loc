const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');
const less = require('gulp-less');
const path = require('path');
const gcmq = require('gulp-group-css-media-queries');
const smartgrid = require('smart-grid');
const uglify = require('gulp-uglify');
const webpackdb = require('webpack');
const webpack = require('webpack-stream');
const compiler = require('webpack');
const plumber = require('gulp-plumber');
const newer = require('gulp-newer');
const cached = require('gulp-cached');
const svgmin = require('gulp-svgmin');
const remember = require('gulp-remember');
const svgSymbols = require('gulp-svg-symbols');

//const importsloader = require('imports-loader');

let isDev = process.argv.includes('--dev');
let isProd = !isDev;
let isSync = process.argv.includes('--sync');

let config = {
    src: './src/',
    build: './build',
    html: {
        src: '**/*.html',
        dest: '/'
    },
    favicon: {
        src: '**/*.ico',
        dest: '/'
    },
    img: {
        src: 'assets/img/**/*.{jpg,png,gif}',
        dest: '/assets/img'
    },
    svg: {
        src: 'assets/img/svg/**/*.svg',
        dest: '/assets/img/svg'
    },
    icons: {
        src: 'assets/img/svg/icons/*.svg',
        watch: 'assets/img/svg/icons/**/*.svg',
        dest: '/assets/img/svg'
    },
    js: {
        src: 'assets/js/index.js',
        watch: 'assets/js/**/*.js',
        dest: '/assets/js'
    },
    css: {
        src: 'assets/css/+(styles|styles-ie).less',
        watch: 'assets/css/**/*.less',
        dest: '/assets/css'
    },
    mail: {
        src: 'assets/mail/action.php',
        watch: 'assets/mail/**/*.php',
        dest: '/assets/mail'
    },
    fonts: {
        src: 'assets/fonts/**/*',
        dest: '/assets/fonts'
    },

    gr: {
        src: 'assets/css'
    }
};



let webConfig = {

    plugins: [
        new webpackdb.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
    ],

    output: {
        filename: 'all.js'
    },
    module:{

        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/'

            }
        ]
    },




    mode: isDev ? 'development' : 'production',
    devtool: isDev ? 'eval-source-map' : 'none'
};

/*
let cssRoot = config.src + config.css.src;

config.css.files = [
	'./node_modules/normalize.css/normalize.css',
	cssRoot + 'base.css',
	cssRoot + 'humans.css'
];
*/

function html() {
    return gulp.src(config.src + config.html.src)
        .pipe(plumber())
        .pipe(gulp.dest(config.build + config.html.dest))
        .pipe(gulpIf(isSync, browserSync.stream()));
}

function favicon() {
    return gulp.src(config.src + config.favicon.src)
        .pipe(plumber())
        .pipe(gulp.dest(config.build + config.favicon.dest));
}

function scripts() {
    return gulp.src(config.src + config.js.src)
        .pipe(plumber())
        .pipe(webpack(webConfig))
        .pipe(gulp.dest(config.build + config.js.dest))
        .pipe(gulpIf(isSync, browserSync.stream()));

}

function mail() {
    return gulp.src(config.src + config.mail.src)
        .pipe(plumber())
        .pipe(gulp.dest(config.build + config.mail.dest))
}

function img() {
    return gulp.src(config.src + config.img.src)
        .pipe(newer(config.build + config.img.dest))
        .pipe(gulpIf(isProd, imagemin([
            imageminPngquant({
                quality: [0.7, 0.9]
            })
        ])))
        .pipe(gulpIf(isDev, gulp.symlink(config.build + config.img.dest), gulp.dest(config.build + config.img.dest)));
        //.pipe(gulp.dest(config.build + config.img.dest));
}

function svg() {
    return gulp.src(config.src + config.svg.src)
        .pipe(newer(config.build + config.svg.dest))
        .pipe(gulpIf(isDev, gulp.symlink(config.build + config.svg.dest), gulp.dest(config.build + config.svg.dest)));

}

function icons() {
    return gulp.src(config.src + config.icons.src)
        //.pipe(cached('icons'))
        .pipe(svgmin({
            plugins: [
                {removeEditorsNSData: true},
                {removeTitle: true}
            ]
        }))
        //.pipe(remember('icons'))
        .pipe(svgSymbols({
            templates: [
                'default-svg'
            ]
        }))
        .pipe(svgmin({
            plugins: [
                {cleanupIDs: false}
            ]
        }))
        .pipe(gulp.dest(config.build + config.icons.dest));

}

function fonts() {
    return gulp.src(config.src + config.fonts.src)
        .pipe(newer(config.build + config.fonts.dest))
        .pipe(gulpIf(isDev, gulp.symlink(config.build + config.fonts.dest), gulp.dest(config.build + config.fonts.dest)));

}

function css() {
    return gulp.src(config.src + config.css.src)
        .pipe(plumber())
        .pipe(gulpIf(isDev, sourcemaps.init()))
        .pipe(less())
        .pipe(gcmq())
        .pipe(autoprefixer())
        .pipe(gulpIf(isProd, cleanCSS({
            level: 2
        })))
        .pipe(gulpIf(isDev, sourcemaps.write()))
        .pipe(gulp.dest(config.build + config.css.dest))
        .pipe(gulpIf(isSync, browserSync.stream()));
}

function grid(done) {
    delete require.cache[path.resolve('./smartgrid.js')];
    let gridSettings = require('./smartgrid.js');

    smartgrid(config.src + config.gr.src, gridSettings);
    done();
}

function clear() {
    return del(config.build + '/*');
}

function watch() {
    if (isSync) {
        browserSync.init({
            server: {
                baseDir: config.build,
                index: 'index.html'
            },
             //tunnel: true
        });
    }

    gulp.watch(config.src + config.html.src, html);
    gulp.watch(config.src + config.css.watch, css);
    //gulp.watch(config.src + config.icons.watch, icons);
    gulp.watch(config.src + config.js.watch, scripts);
    gulp.watch('./smartgrid.js', grid);
}

let build = gulp.series(clear,
    gulp.parallel(html, img, css, scripts, fonts, svg, icons, favicon, mail)
);

gulp.task('build', build);
gulp.task('watch', gulp.series(build, watch));
gulp.task('grid', grid);



