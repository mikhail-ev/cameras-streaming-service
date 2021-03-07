const WebSocket = require('ws');
const {DEFAULT_FRAME} = require("../utils");

function websocketServer(streamsMap) {
    return {
        listen(port) {
            const wss = new WebSocket.Server({ port });

            wss.on('connection', function connection(ws) {
                let subscription

                ws.on('message', function incoming(stream) {
                    if (subscription) {
                        subscription.unsubscribe()
                        subscription = null
                    }
                    console.log('listening stream %s', stream)
                    if (streamsMap[stream]) {
                        console.log('subscribed')
                        subscription = streamsMap[stream].subscribe((value) => {
                            ws.send(value)
                        })
                    } else {
                        console.log('placeholder')
                        ws.send(DEFAULT_FRAME)
                    }
                });

                ws.on('close', () => {
                    if (subscription) {
                        subscription.unsubscribe()
                        subscription = null
                    }
                })
            });
        }
    }
}

module.exports = { websocketServer }

