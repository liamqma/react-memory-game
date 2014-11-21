var finalhandler = require('finalhandler')
var http = require('http')
var serveStatic = require('serve-static')

// Serve up public/ftp folder
var serve = serveStatic('public', {'index': ['index.html']})

// Create server
var server = http.createServer(function(req, res){
    var done = finalhandler(req, res)
    serve(req, res, done)
})

// Listen
var port = process.env.PORT || 3000;
server.listen(port);