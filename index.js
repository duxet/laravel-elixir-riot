var gulp = require('gulp')
var riot = require('gulp-riot')
var elixir = require('laravel-elixir')
var utilities = require('laravel-elixir/ingredients/commands/Utilities')
var notification = require('laravel-elixir/ingredients/commands/Notification')

elixir.extend('riot', function (src, output) {
    var config = this

    var srcDir = config.assetsDir + 'riot'
    src = "./" + utilities.buildGulpSrc(src, srcDir)

    gulp.task('riot', function () {
        var onError = function(e) {
            new notification().error(e, 'Riot Compilation Failed!')
            this.emit('end')
        }

        return gulp.src(src)
            .pipe(riot()).on('error', onError)
            .pipe(gulp.dest(output || config.jsOutput))
            .pipe(new notification().message('Riot Compiled!'))
    })

    this.registerWatcher('riot', srcDir + '/**/*.tag')

    return this.queueTask('riot')
});
