# gulp-riot-tag

**Gulp** plugin for **Riot**

- **[Webpack](https://www.npmjs.com/package/riot-tag-new-loader)**

# Install

```
npm i -D gulp-riot-tag
```

## Usage

### gulpfile.js

```js
function tags() {
  return gulp.src('src/**/*.tag')
    .pipe(riot({
      parsers: {
        css: {
          myparser: function(tag, css) {
            return css.replace(/@tag/, tag)
          }
        }
      }
    }))
    .pipe(concat('build.js'))
    .pipe(gulp.dest('dist'))
}
```

### Todo.tag

```tag
<todo>
  <p>hi</p>
  <style type="text/myparser">
    @tag {color: red;}
  </style>
</todo>
```

will be compiled to:

```tag
<todo>
  <p>hi</p>
  <style type="text/myparser">
    todo {color: red;}
  </style>
</todo>
```

## Example for Autoprefixer and Babel

```
npm i -D gulp gulp-babel @babel/core @babel/preset-env gulp-riot-tag gulp-concat postcss autoprefixer
```

### gulpfile.js

```js
const gulp = require('gulp')
const riot = require('gulp-riot-tag')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const postcss = require('postcss')
const autoprefixer = require('autoprefixer')

function tags() {
  return gulp.src('src/**/*.tag')
    .pipe(riot({
      parsers: {
        css: {
          myparser: function(tag, css) {
            return postcss([ autoprefixer({ browsers: ['last 15 versions'] }) ]).process(css).css
          }
        }
      }
    }))
    .pipe(concat('build.js'))
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(gulp.dest('dist'))
}

const dev = gulp.series(tags)
gulp.task('default', dev)
```

- **[Compiler](https://riot.js.org/guide/compiler/)**
- **[API](https://riot.js.org/api/compiler/)**

## License

ISC License

## Author

Legostaev Vadim (*legostaev.vadim@mail.ru*)
