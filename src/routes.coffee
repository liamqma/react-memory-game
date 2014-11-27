module.exports = (app) ->
	app.get '/api/images', (request, response) ->
			response.send {1: 7}