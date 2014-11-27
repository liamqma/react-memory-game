_ = require 'underscore'
fs = require 'fs'

module.exports.getImages = (request, response) ->
	images = fs.readdirSync('./build/public/flickr')
	images = (_.shuffle(images)).splice(0, 6) if images.length > 6
	response.send images