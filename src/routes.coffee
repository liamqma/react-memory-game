flickr = require './flickr'

module.exports = (app) ->
	app.get '/api/images', flickr.getImages
