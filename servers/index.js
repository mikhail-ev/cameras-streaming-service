const incomingStreamServer = require('./incoming-stream-server')
const outgoingStreamServer = require('./outgoing-stream-server')
const staticAssetsServer = require('./static-assets-server')

module.exports = {
    ...incomingStreamServer,
    ...outgoingStreamServer,
    ...staticAssetsServer
}
