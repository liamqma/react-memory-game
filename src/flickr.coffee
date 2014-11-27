fs = require 'fs'

module.exports.getImages = (request, response) ->
	images = fs.readdirSync('./public/flickr')
	images = images.splice(0, 6) if images.length > 6
	response.send images