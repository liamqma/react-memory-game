finalhandler = require("finalhandler")
http = require("http")
serveStatic = require("serve-static")

# Serve up public/ftp folder
serve = serveStatic("build/public",
    index: ["index.html"]
)

# Create server
server = http.createServer((req, res) ->
    done = finalhandler(req, res)
    serve req, res, done
    return
)

# Listen
port = process.env.PORT or 3000
server.listen port