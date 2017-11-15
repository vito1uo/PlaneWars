
var gulp = require("gulp");
var htmlmin = require("gulp-htmlmin");
var uglify = require("gulp-uglify");
var babel = require('gulp-babel');

gulp.task("jsTask1",function(){	
	gulp.src("src/js/bullet.js")
		.pipe(babel({"presets": ["es2015"]}))		
		.pipe(uglify())
		.pipe( gulp.dest( "dest/js" ) )
})

gulp.task("jsTask2",function(){	
	gulp.src("src/js/enemy.js")
		.pipe(babel({"presets": ["es2015"]}))
		.pipe(uglify())
		.pipe( gulp.dest( "dest/js" ) )
})

gulp.task("jsTask3",function(){	
	gulp.src("src/js/gameEngine.js")
		.pipe(babel({"presets": ["es2015"]}))
		.pipe(uglify())
		.pipe( gulp.dest( "dest/js" ) )
})

gulp.task("jsTask4",function(){	
	gulp.src("src/js/myPlane.js")
		.pipe(babel({"presets": ["es2015"]}))
		.pipe(uglify())
		.pipe( gulp.dest( "dest/js" ) )
})

gulp.task("default",["jsTask1"]);

