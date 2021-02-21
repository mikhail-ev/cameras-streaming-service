const servers = require('./servers')

function start() {
    const streamsMap = {}
    servers.incomingStreamServer(streamsMap).listen(8080)
    servers.outgoingStreamServer(streamsMap).listen(8081)
    servers.staticAssetsServer().listen(3000)
}

start();
