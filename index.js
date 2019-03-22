const riot = require('riot-compiler')
const through2 = require('through2').obj
const _ = require('lodash')

module.exports = function(options) {

  _.merge(riot, options)
  
  return through2(function(file, enc, callback) {

    file.contents = Buffer.from(riot.compile(file.contents.toString(), null, file.path))

    callback(null, file)
    
  })
}
