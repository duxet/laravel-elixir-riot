var gulp = require('gulp')
var riot = require('gulp-riot')
var Elixir = require('laravel-elixir')

var $ = Elixir.Plugins;
var config = Elixir.config;

Elixir.extend('riot', function (src, output, options) {
    config.js.riot = {
        folder: 'riot'
    };

    new Elixir.Task('riot', function() {
        var paths = prepGulpPaths(src, output);

        this.log(paths.src, paths.output);

        return (
            gulp
            .src(paths.src.path)
            .pipe(riot()
                .on('error', function(e) {
                    new Elixir.Notification('Riot Compilation Failed!');

                    this.emit('end');
                }))
            .pipe($.concat(paths.output.name))
            .pipe(gulp.dest(paths.output.baseDir))
            .pipe(new Elixir.Notification('Riot Compiled!'))
        );
    })
    .watch(config.get('assets.js.riot.folder') + '/**/*.tag');
});

/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|array} src
 * @param  {string|null}  output
 * @return {object}
 */
var prepGulpPaths = function(src, output) {
    return new Elixir.GulpPaths()
        .src(src, config.get('assets.js.riot.folder'))
        .output(output || config.get('public.js.outputFolder'), 'riot.js');
};
