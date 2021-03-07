const incomingStreamServer = require('./incoming-stream-server')
const outgoingStreamServer = require('./outgoing-stream-server')
const staticAssetsServer = require('./static-assets-server')
const websocketServer = require('./websocket-server')

module.exports = {
    ...incomingStreamServer,
    ...outgoingStreamServer,
    ...staticAssetsServer,
    ...websocketServer
}
